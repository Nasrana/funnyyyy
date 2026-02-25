import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Moon, Sparkles, Heart, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

type Step = 'sugar' | 'sugar-response' | 'moon' | 'moon-response' | 'name' | 'gift' | 'opened';

export default function App() {
  const [step, setStep] = useState<Step>('sugar');
  const [name, setName] = useState('');
  const [tempName, setTempName] = useState('');

  const nextStep = (next: Step) => {
    setStep(next);
  };

  const handleOpenGift = () => {
    setStep('opened');
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#ec4899', '#3b82f6', '#10b981']
    });
  };

  return (
    <div className="min-h-screen aurora-bg flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 opacity-20 animate-pulse">
        <Sparkles className="w-12 h-12 text-purple-400" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20 animate-pulse delay-700">
        <Moon className="w-12 h-12 text-blue-400" />
      </div>

      <AnimatePresence mode="wait">
        {step === 'sugar' && (
          <motion.div
            key="sugar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-8 max-w-md w-full"
          >
            <h1 className="text-4xl md:text-5xl font-bold neon-text tracking-tight">
              Are you a sugar?
            </h1>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => nextStep('sugar-response')}
                className="px-8 py-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all neon-border font-medium"
              >
                Yes
              </button>
              <button
                onClick={() => nextStep('sugar-response')}
                className="px-8 py-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all neon-border font-medium"
              >
                No
              </button>
            </div>
          </motion.div>
        )}

        {step === 'sugar-response' && (
          <motion.div
            key="sugar-response"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center space-y-8"
          >
            <p className="text-3xl md:text-4xl font-light italic text-purple-200">
              "Then why I always feel very filled with you?"
            </p>
            <button
              onClick={() => nextStep('moon')}
              className="mt-8 text-sm uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
            >
              Continue →
            </button>
          </motion.div>
        )}

        {step === 'moon' && (
          <motion.div
            key="moon"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-8 max-w-md w-full"
          >
            <h1 className="text-4xl md:text-5xl font-bold neon-text tracking-tight">
              Are you a moon?
            </h1>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => nextStep('moon-response')}
                className="px-8 py-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all neon-border font-medium"
              >
                Yes
              </button>
              <button
                onClick={() => nextStep('moon-response')}
                className="px-8 py-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all neon-border font-medium"
              >
                No
              </button>
            </div>
          </motion.div>
        )}

        {step === 'moon-response' && (
          <motion.div
            key="moon-response"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center space-y-8"
          >
            <p className="text-3xl md:text-4xl font-light italic text-blue-200">
              "Then why you are so pretty and bright?"
            </p>
            <button
              onClick={() => nextStep('name')}
              className="mt-8 text-sm uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
            >
              Continue →
            </button>
          </motion.div>
        )}

        {step === 'name' && (
          <motion.div
            key="name"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center space-y-8 max-w-md w-full"
          >
            <h2 className="text-2xl font-light tracking-wide opacity-80">
              Wait, I forgot to ask...
            </h2>
            <h1 className="text-4xl font-bold neon-text">What's your name?</h1>
            <div className="relative">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && tempName && (setName(tempName), nextStep('gift'))}
                placeholder="Type here..."
                className="w-full bg-white/5 border-b-2 border-purple-500/50 py-4 px-2 text-2xl focus:outline-none focus:border-purple-400 transition-colors text-center"
                autoFocus
              />
              {tempName && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => {
                    setName(tempName);
                    nextStep('gift');
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-purple-400"
                >
                  <Send className="w-6 h-6" />
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {step === 'gift' && (
          <motion.div
            key="gift"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-12"
          >
            <div className="space-y-4">
              <h2 className="text-xl font-light opacity-70">A special delivery for</h2>
              <h1 className="text-5xl font-bold neon-text">{name}</h1>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, -2, 0] }}
              onClick={handleOpenGift}
              className="cursor-pointer relative group"
            >
              <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full group-hover:bg-purple-500/40 transition-all" />
              <Gift className="w-48 h-48 mx-auto text-purple-400 relative z-10 drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]" />
              <p className="mt-8 text-sm uppercase tracking-[0.3em] font-bold text-purple-300 animate-bounce">
                Tap to Open
              </p>
            </motion.div>
          </motion.div>
        )}

        {step === 'opened' && (
          <motion.div
            key="opened"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-8 max-w-2xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12 }}
              className="flex justify-center"
            >
              <Heart className="w-32 h-32 text-pink-500 fill-pink-500 drop-shadow-[0_0_20px_rgba(236,72,153,0.5)]" />
            </motion.div>
            
            <div className="space-y-4">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-black neon-text italic"
              >
                HAPPY BIRTHDAY, {name.toUpperCase()}!
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl font-light text-purple-200/80 leading-relaxed"
              >
                May your day be as bright as the moon and as sweet as sugar. 
                You deserve all the magic the universe has to offer.
              </motion.p>
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              onClick={() => {
                setStep('sugar');
                setTempName('');
                setName('');
              }}
              className="mt-12 px-6 py-2 rounded-full border border-white/10 text-xs uppercase tracking-widest hover:bg-white/5 transition-colors"
            >
              Restart Magic
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
