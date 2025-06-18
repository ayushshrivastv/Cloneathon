"use client";

import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignInModal = ({ isOpen, onClose }: SignInModalProps) => {
  const { login } = useAuth();

  if (!isOpen) return null;

  const handleLogin = () => {
    login();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100]" onClick={onClose}>
      <div className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-xs text-center" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h2>
        <p className="text-gray-600 mb-6">Sign in to continue.</p>
        <Button 
          onClick={handleLogin} 
          className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center space-x-2"
        >
          <Image src="/images/google-logo.png" alt="Google Logo" width={20} height={20} />
          <span>Login With Google</span>
        </Button>
      </div>
    </div>
  );
};
