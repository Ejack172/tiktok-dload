'use client';

import { motion } from 'framer-motion';

export default function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className={`absolute rounded-full blur-3xl ${
            i % 2 === 0 ? 'bg-cyan-500' : 'bg-pink-500'
          }`}
          style={{
            width: 200 + i * 50,
            height: 200 + i * 50,
            left: `${i * 20}%`,
            top: `${i * 15}%`
          }}
        />
      ))}
    </div>
  );
}
