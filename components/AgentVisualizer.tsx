import React from 'react';

interface AgentVisualizerProps {
  isActive: boolean;
  isSpeaking: boolean;
  volume: number; // 0 to 1
  avatarUrl: string;
}

export const AgentVisualizer: React.FC<AgentVisualizerProps> = ({ isActive, isSpeaking, volume, avatarUrl }) => {
  return (
    <div className="relative flex items-center justify-center w-48 h-48 mx-auto mb-6">
      {/* Pulse Rings */}
      {isActive && (
        <>
          <div className="absolute inset-0 bg-buffalo-blue rounded-full opacity-20 animate-pulse-ring" style={{ animationDelay: '0s' }}></div>
          <div className="absolute inset-0 bg-buffalo-blue rounded-full opacity-20 animate-pulse-ring" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute inset-0 bg-buffalo-blue rounded-full opacity-20 animate-pulse-ring" style={{ animationDelay: '1s' }}></div>
        </>
      )}

      {/* Avatar Container */}
      <div className={`relative z-10 w-32 h-32 rounded-full overflow-hidden border-4 transition-all duration-300 ${isActive ? 'border-real-gold shadow-xl scale-105' : 'border-gray-200 grayscale'}`}>
        <img src={avatarUrl} alt="Agent Avatar" className="w-full h-full object-cover" />
        
        {/* Speaking Overlay */}
        {isSpeaking && (
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center gap-1">
             <div className="w-1 h-4 bg-white rounded animate-bounce" style={{ animationDelay: '0ms' }}></div>
             <div className="w-1 h-6 bg-white rounded animate-bounce" style={{ animationDelay: '150ms' }}></div>
             <div className="w-1 h-3 bg-white rounded animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        )}
      </div>

      {/* Connection Status Indicator */}
      <div className={`absolute bottom-2 right-8 z-20 w-4 h-4 rounded-full border-2 border-white ${isActive ? 'bg-green-500' : 'bg-red-400'}`}></div>
    </div>
  );
};