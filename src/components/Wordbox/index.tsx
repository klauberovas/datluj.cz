import { useState, useEffect, FC } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
  onFinish: () => void;
  active: boolean;
  onMistake: () => void;
}

const Wordbox: FC<IWordboxProp> = ({ word, onFinish, active, onMistake }) => {
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
      onMistake();
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
  }, [lettersLeft, active, onMistake]);

  return (
    <div className={mistake ? 'wordbox wordbox--mistake' : 'wordbox'}>
      {lettersLeft}
    </div>
  );
};

export default Wordbox;
