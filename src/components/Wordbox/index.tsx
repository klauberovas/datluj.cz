import React, { useState, useEffect } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
}

const Wordbox: React.FC<IWordboxProp> = ({ word }) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word);

  const handleKeyUp = (e: KeyboardEvent) => {
    console.log('handleKeyUp');

    const firstLetter = lettersLeft.slice(0, 1);

    if (e.key === firstLetter) {
      setLettersLeft(lettersLeft.slice(1));
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
