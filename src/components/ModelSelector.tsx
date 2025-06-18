"use client";

import React from 'react';
import { Check, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const models = [
  { id: 'sonar', name: 'Sonar', description: "Perplexity's fast model", isPro: true },
  { id: 'claude-4.0', name: 'Claude 4.0 Sonnet', description: "Anthropic's advanced model", isPro: true },
  { id: 'gpt-4.1', name: 'GPT-4.1', description: "OpenAI's advanced model", isPro: true },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro 06-05', description: "Google's latest model", isPro: false },
  { id: 'grok-3-beta', name: 'Grok 3 Beta', description: "xAI's latest model", isPro: true },
];

interface ModelSelectorProps {
  selectedModel: string;
  onModelSelect: (modelId: string) => void;
}

export const ModelSelector = React.forwardRef<HTMLDivElement, ModelSelectorProps & { style?: React.CSSProperties }>(({ selectedModel, onModelSelect, ...props }, ref) => {
  return (
    <div ref={ref} {...props} className="w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
      <ul className="p-2">
        {models.map((model) => (
          <li key={model.id}>
            <button
              onClick={() => !model.isPro && onModelSelect(model.id)}
              disabled={model.isPro}
              className={cn(
                'w-full text-left p-2 rounded-lg flex items-center justify-between',
                model.isPro ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100',
                selectedModel === model.id && 'bg-gray-100'
              )}
            >
              <div>
                <div className="flex items-center space-x-2">
                  <p className="font-medium text-sm text-gray-800">{model.name}</p>
                  {model.isPro && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md font-medium">
                      Pro
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{model.description}</p>
              </div>
              {selectedModel === model.id && <Check className="w-5 h-5 text-blue-600" />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

ModelSelector.displayName = 'ModelSelector';
