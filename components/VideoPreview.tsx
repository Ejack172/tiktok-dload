'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface VideoPreviewProps {
  metadata: {
    title: string;
    author: string;
    thumbnail: string;
    duration: number;
  };
}

export default function VideoPreview({ metadata }: VideoPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex flex-col md:flex-row gap-6 items-center relative z-10">
        <div className="relative w-full md:w-48 h-64 rounded-xl overflow-hidden shadow-2xl border border-white/20">
          <img 
            src={metadata.thumbnail || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop'} 
            alt={metadata.title || 'Video thumbnail'} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
              <Play className="w-8 h-8 text-white fill-white" />
            </div>
          </div>
          {metadata.duration && (
            <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white font-medium">
              {Math.floor(metadata.duration / 60)}:{(metadata.duration % 60).toString().padStart(2, '0')}
            </div>
          )}
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm font-medium mb-3 border border-cyan-500/30">
            @{metadata.author || 'tiktok_user'}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4 line-clamp-3">
            {metadata.title || 'Amazing TikTok Video'}
          </h2>
          
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-sm">
              <span className="text-white font-semibold">1.2M</span> Views
            </div>
            <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-sm">
              <span className="text-white font-semibold">245K</span> Likes
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
