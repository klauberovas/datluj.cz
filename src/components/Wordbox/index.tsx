import React, { useState, useEffect } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
  onFinish: () => void;
  active: boolean;
}

const Wordbox: React.FC<IWordboxProp> = ({ word, onFinish, active }) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word);
  const [mistake, setMistake] = useState<boolean>(false);

  const handleKeyUp = (e: KeyboardEvent) => {
    const firstLetter = lettersLeft.slice(0, 1);

    if (e.key === firstLetter) {
      const newLettersLeft = lettersLeft.slice(1);
      setLettersLeft(newLettersLeft);
      setMistake(false);
      if (newLettersLeft.length === 0) {
        onFinish();
      }
    } else {
      setMistake(true);
    }
  };

  useEffect(() => {
    if (active) {
      document.addEventListener('keyup', handleKeyUp);
    }
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [lettersLeft, active]);

  return (
    <div className={mistake ? 'wordbox wordbox--mistake' : 'wordbox'}>
      {lettersLeft}
    </div>
  );
};

export default Wordbox;
