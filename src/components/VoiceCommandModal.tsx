import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  X, 
  Sparkles, 
  Play, 
  Volume2, 
  CheckCircle2, 
  CornerDownLeft,
  Search,
  Filter
} from 'lucide-react';
import { sampleVoiceQueries } from '../data/mockShipments';

interface VoiceCommandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExecuteCommand: (command: string) => void;
}

export const VoiceCommandModal: React.FC<VoiceCommandModalProps> = ({
  isOpen,
  onClose,
  onExecuteCommand,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognizedFeedback, setRecognizedFeedback] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Web Speech API if supported in browser
  useEffect(() => {
    if (!isOpen) {
      setIsListening(false);
      setTranscript('');
      setRecognizedFeedback(null);
      return;
    }

    // Auto-start listening simulation on open
    startSimulatedListening();

    const SpeechRecognition = 
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          const current = event.resultIndex;
          const text = event.results[current][0].transcript;
          setTranscript(text);
          if (event.results[current].isFinal) {
            handleFinalCommand(text);
          }
        };

        recognition.onerror = () => {
          // Fallback seamlessly to simulator
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } catch (e) {
        // Fallback
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, [isOpen]);

  const startSimulatedListening = () => {
    setIsListening(true);
    setTranscript('Listening for natural language supply chain instruction...');
  };

  const handleFinalCommand = (commandText: string) => {
    setTranscript(commandText);
    setIsListening(false);
    setRecognizedFeedback(`Interpreted SAP Intent: "${commandText}"`);

    setTimeout(() => {
      onExecuteCommand(commandText);
      onClose();
    }, 900);
  };

  const handleSelectSample = (sample: string) => {
    setTranscript(`"${sample}"`);
    setIsListening(true);
    setTimeout(() => {
      handleFinalCommand(sample);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-blue-500/40 bg-[#0c1322] text-slate-100 shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30">
            <Mic className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-300"></span>
            </span>
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              SAP Voice Assistant Simulator
              <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-semibold text-blue-300 border border-blue-500/30">
                NLP / LLM Parser
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Speak or click a prompt to query shipments and trigger resolution
            </p>
          </div>
        </div>

        {/* Animated Waveform Visualizer */}
        <div className="my-5 flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-950/70 p-6 text-center">
          <div className="relative mb-4 flex items-center justify-center">
            {/* Pulsing Aura */}
            <div className={`absolute h-24 w-24 rounded-full bg-blue-500/20 transition-all ${
              isListening ? 'animate-ping scale-110 opacity-70' : 'opacity-0'
            }`} />
            
            <button
              onClick={() => {
                if (isListening) {
                  setIsListening(false);
                } else {
                  startSimulatedListening();
                }
              }}
              className={`relative flex h-16 w-16 items-center justify-center rounded-full transition-all shadow-xl ${
                isListening
                  ? 'bg-gradient-to-r from-red-500 to-amber-500 text-white ring-4 ring-red-500/30 shadow-red-500/40 animate-pulse'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:scale-105 shadow-blue-500/30'
              }`}
            >
              <Mic className="h-7 w-7" />
            </button>
          </div>

          {/* Audio Bars Simulation */}
          <div className="flex items-center gap-1.5 h-8 mb-3">
            {[40, 65, 85, 45, 95, 70, 35, 90, 60, 80, 50, 75].map((height, idx) => (
              <span
                key={idx}
                className={`w-1 rounded-full bg-gradient-to-t from-blue-600 to-cyan-400 transition-all duration-150 ${
                  isListening ? 'animate-bounce' : 'h-1.5 opacity-30'
                }`}
                style={{
                  height: isListening ? `${height}%` : '6px',
                  animationDelay: `${idx * 70}ms`,
                }}
              />
            ))}
          </div>

          {/* Transcript Display */}
          <div className="min-h-[44px] w-full rounded-lg bg-slate-900/90 border border-slate-800 p-2.5 text-xs">
            <p className="font-mono text-slate-200">
              {transcript || 'Say: "Show high-risk shipments from Taiwan"'}
            </p>
          </div>

          {recognizedFeedback && (
            <div className="mt-2.5 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{recognizedFeedback}</span>
            </div>
          )}
        </div>

        {/* Quick-Prompt Suggestions (Click to Speak) */}
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Simulated Voice Commands (Click to Test):
          </span>
          
          <div className="space-y-1.5">
            {sampleVoiceQueries.map((query, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectSample(query)}
                className="w-full flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-left text-xs text-slate-300 hover:border-blue-500/60 hover:bg-slate-800/80 hover:text-white transition-all group"
              >
                <span className="flex items-center gap-2">
                  <Play className="h-3 w-3 text-blue-400 opacity-60 group-hover:opacity-100" />
                  <span>"{query}"</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono group-hover:text-blue-400">
                  Execute &rarr;
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-5 border-t border-slate-800 pt-3 text-center text-[11px] text-slate-500">
          Connected to SAP Conversational AI & Gemini Multi-Modal Voice Service
        </div>

      </div>
    </div>
  );
};
