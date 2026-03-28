import React from 'react';

interface Props {
    text: string;
    className?: string;
    delayStep?: number;
    startDelay?: number;
    shouldStart?: boolean;
}

const Spanizer = ({
                      text,
                      className,
                      delayStep = 0.03,
                      startDelay = 0,
                      shouldStart = false
                  }: Props) => {
    let charCounter = 0;

    return (
        <span className={className}>
            {text.split(' ').map((word, wordIndex, wordsArray) => {
                return (
                    <React.Fragment key={wordIndex}>
                        <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                            {word.split('').map((char) => {
                                const currentIndex = charCounter++;
                                return (
                                    <span
                                        key={currentIndex}
                                        className={shouldStart ? "animate-letter" : "opacity-0"}
                                        style={{
                                            display: 'inline-block',
                                            animationDelay: shouldStart
                                                ? `${startDelay + currentIndex * delayStep}s`
                                                : '0s'
                                        }}
                                    >
                                        {char}
                                    </span>
                                );
                            })}
                        </span>
                        {wordIndex < wordsArray.length - 1 && (
                            <span style={{ display: 'inline-block' }}>&nbsp;</span>
                        )}
                    </React.Fragment>
                );
            })}
        </span>
    );
};

export default Spanizer;