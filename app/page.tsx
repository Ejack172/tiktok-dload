'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import FloatingOrbs from '@/components/FloatingOrbs';
import VideoPreview from '@/components/VideoPreview';
import CaptionBox from '@/components/CaptionBox';
import DownloadCard from '@/components/DownloadCard';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.includes('tiktok.com')) {
      toast.error('Please enter a valid TikTok URL', {
        style: { background: '#333', color: '#fff', border: '1px solid #555' }
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      
      const result = await res.json();
      
      if (result.success) {
        setData(result);
        toast.success('Video ready to download!', {
          style: { background: '#333', color: '#fff', border: '1px solid #555' }
        });
      } else {
        toast.error(result.error || 'Failed to process video', {
          style: { background: '#333', color: '#fff', border: '1px solid #555' }
        });
      }
    } catch (err) {
      toast.error('Something went wrong', {
        style: { background: '#333', color: '#fff', border: '1px solid #555' }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black overflow-hidden font-sans">
      <FloatingOrbs />
      
      <main className="relative z-10 max-w-2xl mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent font-semibold text-sm">
              v2.0 Beta Live
            </span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            TikTok <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">Downloader</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto">
            Download TikTok videos in ultra-HD without watermarks. Extract captions instantly.
          </p>
        </motion.div>

        {!data ? (
          <form onSubmit={handleDownload} className="mb-12">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-2 md:p-3 shadow-2xl flex items-center group"
            >
              <div className="pl-4 pr-2">
                <Search className="w-6 h-6 text-gray-400 group-focus-within:text-cyan-400 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Paste TikTok URL (e.g., https://tiktok.com/...)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-base md:text-lg w-full py-3"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading || !url}
                className="ml-2 bg-gradient-to-r from-cyan-500 to-pink-500 px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-white shadow-lg shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Download'
                )}
              </motion.button>
            </motion.div>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setData(null);
                setUrl('');
              }}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-xl font-bold text-white transition-all shadow-lg backdrop-blur-md"
            >
              <Search className="w-5 h-5 text-cyan-400" />
              Download Another Video
            </motion.button>
          </motion.div>
        )}

        {data && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            <CaptionBox captions={data.captions} />
            <DownloadCard 
              downloadLink={data.downloadLink} 
              musicLink={data.musicLink}
              wmLink={data.wmLink}
            />
            <VideoPreview metadata={data.metadata} />
          </motion.div>
        )}
        
        {!data && !loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-gray-500 text-sm mt-20"
          >
            <p>100% Free • No Watermark • HD Quality • Secure</p>
          </motion.div>
        )}
      </main>
    </div>
  );
}
