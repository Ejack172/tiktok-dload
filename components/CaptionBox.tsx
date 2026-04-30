'use client';

import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface CaptionBoxProps {
  captions?: string;
}

export default function CaptionBox({ captions }: CaptionBoxProps) {
  const [copied, setCopied] = useState(false);
  const textToCopy = captions || "🔥 Watch this amazing content! #trending #viral #fyp";

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success('Captions copied to clipboard!', {
      style: {
        background: '#333',
        color: '#fff',
        border: '1px solid #555',
      },
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 group"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          Extracted Captions
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </motion.button>
      </div>
      
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none rounded-xl" />
        <div className="bg-black/30 border border-white/5 rounded-xl p-4 text-gray-300 font-mono text-sm leading-relaxed max-h-40 overflow-y-auto">
          {textToCopy}
        </div>
      </div>
    </motion.div>
  );
}
