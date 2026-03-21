import React from 'react';

interface Props {
    text: string;
    className?: string;
    delayStep?: number; // Скорость буквы
    startDelay?: number; // Пауза перед началом всего блока
    shouldStart?: boolean; // Тот самый флаг от прелоадера
}

const Spanizer = ({
                      text,
                      className,
                      delayStep = 0.03,
                      startDelay = 0,
                      shouldStart = false
                  }: Props) => {
    return (
        <span className={className}>
      {text.split('').map((char, index) => (
          <span
              key={index}
              // Если shouldStart еще false — скрываем буквы совсем
              className={shouldStart ? "animate-letter" : "opacity-0"}
              style={{
                  animationDelay: shouldStart
                      ? `${startDelay + index * delayStep}s`
                      : '0s'
              }}
          >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
    );
};

export default Spanizer;