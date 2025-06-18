import { NextRequest, NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false, // Disable default body parser for file uploads
  },
};
import PDFParser from 'pdf2json';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MongoClient, ServerApiVersion } from 'mongodb';

// --- Environment Variables ---
const API_KEY = process.env.GEMINI_API_KEY || '';
const MONGO_URI = process.env.MONGO_URI || '';
const MODEL_NAME = 'gemini-1.5-pro-latest';

// --- Gemini AI Configuration ---
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

// --- Helper: Log conversation to MongoDB (fire and forget) ---
async function logConversation(userMessage: string, assistantResponse: string) {
  if (!MONGO_URI) return;
  const client = new MongoClient(MONGO_URI, { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true } });
  try {
    await client.connect();
    const db = client.db('climate_insights');
    const collection = db.collection('conversation_logs');
    await collection.insertOne({ timestamp: new Date(), userMessage, assistantResponse });
  } catch (error) {
    console.error('Failed to log conversation to MongoDB:', error);
  } finally {
    await client.close();
  }
}

// --- Main API Handler ---
export async function POST(req: NextRequest) {
  try {
    let message: string;
    let attachment: File | null = null;
    let isWebSearchEnabled = false;

    if (req.headers.get("content-type")?.includes("multipart/form-data")) {
      const formData = await req.formData();
      message = formData.get('message') as string;
      attachment = formData.get('attachment') as File | null;
      isWebSearchEnabled = formData.get('isWebSearchEnabled') === 'true';
    } else {
      const bodyBuffer = await req.arrayBuffer();
      const bodyString = new TextDecoder().decode(bodyBuffer);
      if (!bodyString) {
        return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
      }
      const body = JSON.parse(bodyString);
      message = body.message;
      isWebSearchEnabled = body.isWebSearchEnabled || false;
    }

    let fileContent = '';
    if (attachment) {
      const buffer = Buffer.from(await attachment.arrayBuffer());
      fileContent = await new Promise<string>((resolve, reject) => {
        const pdfParser = new PDFParser();
        pdfParser.on('pdfParser_dataError', (errData: { parserError: unknown }) => reject(new Error('Error parsing PDF')));
        pdfParser.on('pdfParser_dataReady', () => {
          resolve(pdfParser.getRawTextContent());
        });
        pdfParser.parseBuffer(buffer);
      });
    }

    const fullMessage = fileContent ? `PDF Content:\n${fileContent}\n\nUser Query: ${message}` : message;

    if (!API_KEY) {
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 });
    }

    const intentPrompt = `
      Analyze the user's query to determine the intent and extract entities. Respond with a JSON object.
      Intents can be: 'get_current_weather', 'get_air_quality', 'general_climate_question', or 'greeting'.
      The 'location' entity is required for 'get_current_weather' and 'get_air_quality'. For other intents, it can be null.

      Query: "${fullMessage}"

      Example for weather: { "intent": "get_current_weather", "location": "New York" }
      Example for greeting: { "intent": "greeting", "location": null }
    `;
    const intentResult = await model.generateContent(intentPrompt);
    const intentResponseText = intentResult.response.text().trim();
    const cleanedJson = intentResponseText.replace(/```json|```/g, '').trim();
    const { intent, location } = JSON.parse(cleanedJson);

    if (!intent) {
      return NextResponse.json({ reply: "I'm sorry, I couldn't understand your request. Could you please rephrase?" });
    }

    if (intent === 'greeting') {
      const responseText = "Hello there! How can I help you with climate information today?";
      logConversation(fullMessage, responseText).catch(console.error);
      return NextResponse.json({ reply: responseText });
    }

    let data, finalPrompt;

    if (intent === 'get_current_weather' || intent === 'get_air_quality') {
      if (!location) {
        return NextResponse.json({ reply: `To get the ${intent.includes('weather') ? 'weather' : 'air quality'}, please tell me a location.` });
      }
      const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`);
      const geoData = await geoResponse.json();
      if (!geoData.results || geoData.results.length === 0) {
        return NextResponse.json({ reply: `I couldn't find data for "${location}". Is it spelled correctly?` });
      }
      const { latitude, longitude, name, country } = geoData.results[0];

      if (intent === 'get_current_weather') {
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m`);
        data = await weatherResponse.json();
        finalPrompt = `You are a friendly climate assistant. Based on the following live weather data, provide a conversational summary for the user's query: "${fullMessage}". IMPORTANT: The response must be plain text only. Do not use any markdown formatting like *, **, #, or lists.\n\nData:\n${JSON.stringify(data, null, 2)}`;
      } else { // get_air_quality
        const airQualityResponse = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=pm2_5,carbon_monoxide,ozone,sulphur_dioxide`);
        data = await airQualityResponse.json();
        finalPrompt = `You are a friendly climate assistant. Based on the following live air quality data, provide a conversational summary for the user's query: "${fullMessage}". Explain the main pollutants. IMPORTANT: The response must be plain text only. Do not use any markdown formatting like *, **, #, or lists.\n\nData:\n${JSON.stringify(data, null, 2)}`;
      }
    } else { // general_climate_question or if a PDF was attached
      finalPrompt = `You are a friendly and knowledgeable climate assistant. Please provide a helpful and accurate answer to the user's question: "${fullMessage}". IMPORTANT: The response must be plain text only. Do not use any markdown formatting like *, **, #, or lists.`;
    }

    const finalResult = await model.generateContent(finalPrompt);
    const responseText = finalResult.response.text();

    logConversation(fullMessage, responseText).catch(console.error);
    return NextResponse.json({ reply: responseText });

  } catch (error) {
    console.error('Error in chat API:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return NextResponse.json({ error: `Sorry, I ran into a problem: ${errorMessage}` }, { status: 500 });
  }
}
