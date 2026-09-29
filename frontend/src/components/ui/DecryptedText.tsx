import React, { useState, useEffect } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  className?: string;
  encryptedClassName?: string;
  animateOn?: 'view' | 'hover';
}

const CHARACTERS = '0123456789ABCDEFabcdef!@#$%^&*<>~';

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 40,
  maxIterations = 10,
  className = '',
  encryptedClassName = 'text-cyan-neon font-mono opacity-80',
  animateOn = 'view',
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) return text[index];
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / (maxIterations / 5);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, maxIterations, isHovered]);

  return (
    <span
      className={`inline-block ${className}`}
      onMouseEnter={() => animateOn === 'hover' && setIsHovered((prev) => !prev)}
    >
      {displayText.split('').map((char, i) => (
        <span
          key={i}
          className={char === text[i] ? '' : encryptedClassName}
        >
          {char}
        </span>
      ))}
    </span>
  );
};
