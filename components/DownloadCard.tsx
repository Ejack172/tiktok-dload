'use client';

import { motion } from 'framer-motion';
import { Download, Film, Music } from 'lucide-react';

interface DownloadCardProps {
  downloadLink: string;
  musicLink?: string;
  wmLink?: string;
}

export default function DownloadCard({ downloadLink, musicLink, wmLink }: DownloadCardProps) {
  const getProxyUrl = (url: string, isAudio: boolean) => {
    if (!url) return '';
    const ext = isAudio ? '.mp3' : '.mp4';
    return `/api/proxy-download?url=${encodeURIComponent(url)}&filename=tiktok_download${ext}`;
  };

  const options = [
    { label: 'Watermark-free (HD)', icon: Film, quality: 'HD', color: 'from-cyan-500 to-blue-500', url: getProxyUrl(downloadLink, false) },
    { label: 'Watermarked Video', icon: Film, quality: 'Standard', color: 'from-blue-500 to-indigo-500', url: wmLink ? getProxyUrl(wmLink, false) : getProxyUrl(downloadLink, false) },
    { label: 'Audio Only (MP3)', icon: Music, quality: 'High', color: 'from-pink-500 to-rose-500', url: musicLink ? getProxyUrl(musicLink, true) : getProxyUrl(downloadLink, true) },
  ].filter(opt => opt.url); // filter out options that don't have URLs

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 mb-8"
    >
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Download className="w-5 h-5 text-cyan-400" />
        Download Options
      </h3>
      
      <div className="grid gap-4">
        {options.map((option, index) => (
          <motion.a
            key={index}
            href={option.url}
            download

            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative group overflow-hidden rounded-xl p-[1px]"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${option.color} opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
            <div className="relative bg-black/80 backdrop-blur-xl px-6 py-4 rounded-xl flex items-center justify-between group-hover:bg-black/60 transition-colors duration-300">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${option.color} bg-opacity-20`}>
                  <option.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">{option.label}</div>
                  <div className="text-gray-400 text-sm">{option.quality}</div>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Download className="w-5 h-5 text-white" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
