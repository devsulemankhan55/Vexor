import React from 'react';
import { Logo } from '../ui/Logo';

export const LoadingScreen: React.FC = () => (
  <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center gap-6">
    <div className="animate-pulse">
      <Logo /> 
    </div>
    <div className="w-48 h-0.5 bg-gray-100 overflow-hidden relative">
      <div className="absolute top-0 left-0 h-full w-1/3 bg-rose-600 animate-[loading_1.5s_infinite_ease-in-out]"></div>
    </div>
    <style>{`
      @keyframes loading {
        0% { transform: translateX(-100%); width: 20%; }
        50% { width: 40%; }
        100% { transform: translateX(400%); width: 20%; }
      }
    `}</style>
  </div>
);
