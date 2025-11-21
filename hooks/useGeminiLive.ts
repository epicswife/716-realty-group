import { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { base64ToUint8Array, float32ToInt16, arrayBufferToBase64, decodeAudioData } from '../utils/audioUtils';

interface UseGeminiLiveProps {
  systemInstruction: string;
  voiceName?: string;
  onTranscriptionUpdate?: (text: string, isUser: boolean) => void;
}

export const useGeminiLive = ({ systemInstruction, voiceName = 'Kore', onTranscriptionUpdate }: UseGeminiLiveProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  
  // Refs for cleanup and state management
  const audioContextRef = useRef<AudioContext | null>(null); // Input context
  const outputAudioContextRef = useRef<AudioContext | null>(null); // Output context
  const inputSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  
  const disconnect = useCallback(() => {
    if (sessionRef.current) {
        // Attempt to close the session if the method exists
        try {
            // Note: The SDK might not expose a direct synchronous close on the session object yet, 
            // but we drop the reference.
             if (typeof sessionRef.current.close === 'function') {
                sessionRef.current.close();
            }
        } catch (e) {
            console.warn("Error closing session:", e);
        }
      sessionRef.current = null;
    }

    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }

    if (inputSourceRef.current) {
      inputSourceRef.current.disconnect();
      inputSourceRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    // Stop all currently playing sources
    sourcesRef.current.forEach(source => {
        try { source.stop(); } catch (e) {}
    });
    sourcesRef.current.clear();

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (outputAudioContextRef.current) {
        outputAudioContextRef.current.close();
        outputAudioContextRef.current = null;
    }

    setIsConnected(false);
    setIsSpeaking(false);
    setVolumeLevel(0);
    nextStartTimeRef.current = 0;
  }, []);

  const connect = useCallback(async () => {
    try {
      // 1. Initialize Audio Contexts
      // We use a separate context for input (16kHz required by Gemini) and output (24kHz for high quality)
      // Creating them ONCE here prevents the massive lag caused by creating them per-chunk.
      
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 16000,
      });
      audioContextRef.current = audioCtx;

      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 24000,
      });
      outputAudioContextRef.current = outputCtx;
      nextStartTimeRef.current = outputCtx.currentTime;

      // 2. Get Microphone Stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // 3. Initialize Gemini Client
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // 4. Establish Connection
      // We keep a local reference to the session promise/object to avoid closure staleness
      let currentSession: any = null;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            console.log('Gemini Live Session Opened');
            setIsConnected(true);

            // Setup Audio Input Processing
            const source = audioCtx.createMediaStreamSource(stream);
            inputSourceRef.current = source;

            // Lower buffer size to 2048 (approx 128ms) to reduce input latency
            // while keeping it safe from audio dropouts. 4096 was too slow.
            const processor = audioCtx.createScriptProcessor(2048, 1, 1);
            processorRef.current = processor;

            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              
              // Simple volume meter calculation
              let sum = 0;
              for(let i=0; i<inputData.length; i++) sum += inputData[i] * inputData[i];
              const rms = Math.sqrt(sum / inputData.length);
              setVolumeLevel(Math.min(rms * 5, 1));

              // Convert Float32 to PCM Int16
              const pcmInt16 = float32ToInt16(inputData);
              const base64Data = arrayBufferToBase64(pcmInt16.buffer);

              // Send to session immediately
              if (currentSession) {
                  currentSession.sendRealtimeInput({
                      media: {
                          mimeType: 'audio/pcm;rate=16000',
                          data: base64Data
                      }
                  });
              }
            };

            source.connect(processor);
            processor.connect(audioCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Audio Output
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            
            if (base64Audio && outputAudioContextRef.current) {
                setIsSpeaking(true);
                const ctx = outputAudioContextRef.current;
                const audioData = base64ToUint8Array(base64Audio);
                
                // Ensure correct timing for smooth playback
                const now = ctx.currentTime;
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, now);

                const audioBuffer = await decodeAudioData(audioData, ctx, 24000, 1);
                
                const source = ctx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(ctx.destination);
                
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                
                sourcesRef.current.add(source);

                source.onended = () => {
                    sourcesRef.current.delete(source);
                    // Heuristic to stop speaking animation if queue is empty
                    if (sourcesRef.current.size === 0 && ctx.currentTime >= nextStartTimeRef.current - 0.1) {
                        setIsSpeaking(false);
                    }
                };
            }

            // Handle Interruption
            const interrupted = message.serverContent?.interrupted;
            if (interrupted) {
                console.log("Model interrupted");
                // Stop all currently playing audio
                sourcesRef.current.forEach(source => {
                    try { source.stop(); } catch (e) {}
                });
                sourcesRef.current.clear();
                // Reset sync time
                if (outputAudioContextRef.current) {
                   nextStartTimeRef.current = outputAudioContextRef.current.currentTime;
                }
                setIsSpeaking(false);
            }
          },
          onclose: () => {
            console.log('Session closed');
            disconnect();
          },
          onerror: (err) => {
            console.error('Session error:', err);
            disconnect();
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: voiceName } }
          },
          systemInstruction: systemInstruction,
        }
      });

      // Save session reference
      sessionPromise.then(sess => {
          currentSession = sess;
          sessionRef.current = sess;
      });

    } catch (error) {
      console.error("Failed to connect:", error);
      disconnect();
    }
  }, [systemInstruction, voiceName, disconnect]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return { connect, disconnect, isConnected, isSpeaking, volumeLevel };
};