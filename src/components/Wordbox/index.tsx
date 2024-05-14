import React, { useState, useEffect } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
  onFinish: () => void;
}

const Wordbox: React.FC<IWordboxProp> = ({ word, onFinish }) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word);

  const handleKeyUp = (e: KeyboardEvent) => {
    const firstLetter = lettersLeft.slice(0, 1);

    if (e.key === firstLetter) {
      setLettersLeft(lettersLeft.slice(1));
      if (lettersLeft.length === 1) {
        onFinish();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [lettersLeft]);

  return <div className="wordbox">{lettersLeft}</div>;
};

export default Wordbox;
