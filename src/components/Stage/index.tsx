import { useState, FC } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';

// TODO: temporary disable function - remove next line when you start using it
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const generateWord = (size?: number) => {
  const sizeIndex = !size
    ? Math.floor(Math.random() * wordList.length)
    : size - 3;

  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return null;
  }

  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
};

const Stage: FC = () => {
  const [words, setWords] = useState<string[]>(['jahoda', 'atrapa', 'brynza']);
  const [numOfErrors, setNumOfErrors] = useState<number>(0);

  const handleFinish = () => {
    const newWord = generateWord(6);
    if (newWord) {
      const newArray = [...words.slice(1), newWord];
      setWords(newArray);
    }
  };

  const handleMistake = () => {
    setNumOfErrors(numOfErrors + 1);
  };

  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: {numOfErrors}</div>
      <div className="stage__words">
        {words.map((word, index) => (
          <Wordbox
            word={word}
            key={word}
            onFinish={handleFinish}
            active={index === 0}
            onMistake={handleMistake}
          />
        ))}
      </div>
    </div>
  );
};

export default Stage;
