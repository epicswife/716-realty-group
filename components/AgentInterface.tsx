import React from 'react';
import { AgentConfig } from '../types';
import { useGeminiLive } from '../hooks/useGeminiLive';
import { AgentVisualizer } from './AgentVisualizer';
import { Mic, Phone, PhoneOff, Radio, Sparkles } from 'lucide-react';

interface AgentInterfaceProps {
  config: AgentConfig;
}

export const AgentInterface: React.FC<AgentInterfaceProps> = ({ config }) => {
  const { connect, disconnect, isConnected, isSpeaking, volumeLevel } = useGeminiLive({
    systemInstruction: config.systemInstruction,
    voiceName: config.voiceName
  });

  const handleToggleConnection = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  const isFrontDesk = config.id === 'FRONT_DESK';

  return (
    <div className="w-full relative group">
      {/* Glowing backdrop effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${isFrontDesk ? 'from-buffalo-blue to-blue-400' : 'from-real-gold to-yellow-600'} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000`}></div>
      
      <div className="relative bg-white rounded-2xl p-6 shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isFrontDesk ? 'bg-blue-50 text-buffalo-blue' : 'bg-yellow-50 text-yellow-700'}`}>
                    <Sparkles className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight">{config.name}</h3>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{config.role}</p>
                </div>
            </div>
            {isConnected && (
                 <div className="flex items-center gap-1.5 px-2 py-1 bg-green-50 border border-green-100 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">Live</span>
                 </div>
            )}
        </div>

        {/* Visualizer Area */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 flex flex-col items-center justify-center min-h-[200px] border border-gray-100 relative">
             <AgentVisualizer 
                isActive={isConnected}
                isSpeaking={isSpeaking}
                volume={volumeLevel}
                avatarUrl={config.avatarUrl}
            />
            
            {/* Context hint */}
            {!isConnected && (
                <div className="absolute bottom-4 text-xs text-gray-400 font-medium text-center px-8">
                    Tap the button below to speak with {config.name} about {isFrontDesk ? "scheduling or selling" : "compliance and docs"}.
                </div>
            )}
        </div>

        {/* Controls */}
        <div className="space-y-3">
            <button
                onClick={handleToggleConnection}
                className={`w-full py-4 px-6 rounded-xl font-bold text-sm uppercase tracking-widest transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 shadow-lg ${
                    isConnected 
                    ? 'bg-white border-2 border-red-100 text-red-500 hover:bg-red-50' 
                    : `text-white hover:shadow-xl hover:-translate-y-0.5 ${isFrontDesk ? 'bg-buffalo-blue hover:bg-buffalo-dark' : 'bg-real-slate hover:bg-slate-800'}`
                }`}
            >
                {isConnected ? (
                    <>
                        <PhoneOff className="w-5 h-5" /> End Session
                    </>
                ) : (
                    <>
                        <Phone className="w-5 h-5" /> Start Call
                    </>
                )}
            </button>
            
            <div className="flex justify-center gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                    <Mic className="w-3 h-3" />
                    <span>Voice Enabled</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                    <Radio className="w-3 h-3" />
                    <span>Low Latency</span>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};