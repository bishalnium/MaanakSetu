import React from 'react';
import { motion } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  highlightWords?: string[];
  highlightClass?: string;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 0.03,
  highlightWords = [],
  highlightClass = 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-neon via-indigo-neon to-purple-400',
}) => {
  const words = text.split(' ');

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, wordIndex) => {
        const isHighlight = highlightWords.some(
          (hw) => hw.toLowerCase() === word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
        );

        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={charIndex}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.5,
                  delay: (wordIndex * 5 + charIndex) * delay,
                  ease: [0.2, 0.65, 0.3, 0.9],
                }}
                className={`inline-block ${isHighlight ? highlightClass : ''}`}
              >
                {char}
              </motion.span>
            ))}
          </span>
        );
      })}
    </span>
  );
};
