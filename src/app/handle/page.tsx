'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { decomposeWord } from './hangul';

// 5자소 단어 목록
const WORDS = ['감자', '지진', '나무', '바다', '하늘', '구름', '달빛', '별빛'];

const JAMO_LENGTH = 5;
const MAX_ATTEMPTS = 6;

// 한글 2벌식 키보드 배열
const KEYBOARD_LAYOUT = [
  ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅔ'],
  ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ'],
  ['ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ']
];

// 키보드 키 -> 한글 자소 매핑
const KEY_TO_JAMO: { [key: string]: string } = {
  'q': 'ㅂ', 'w': 'ㅈ', 'e': 'ㄷ', 'r': 'ㄱ', 't': 'ㅅ',
  'y': 'ㅛ', 'u': 'ㅕ', 'i': 'ㅑ', 'o': 'ㅐ', 'p': 'ㅔ',
  'a': 'ㅁ', 's': 'ㄴ', 'd': 'ㅇ', 'f': 'ㄹ', 'g': 'ㅎ',
  'h': 'ㅗ', 'j': 'ㅓ', 'k': 'ㅏ', 'l': 'ㅣ',
  'z': 'ㅋ', 'x': 'ㅌ', 'c': 'ㅊ', 'v': 'ㅍ',
  'b': 'ㅠ', 'n': 'ㅜ', 'm': 'ㅡ'
};

type LetterStatus = 'correct' | 'present' | 'absent' | 'empty';

interface Cell {
  letter: string;
  status: LetterStatus;
}

export default function HandlePage() {
  const [targetWord, setTargetWord] = useState('');
  const [targetJamos, setTargetJamos] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<Cell[][]>([]);
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [showHelp, setShowHelp] = useState(false);

  // 게임 초기화
  useEffect(() => {
    startNewGame();
  }, []);

  // 키보드 입력 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStatus !== 'playing') return;

      // 한글 자소 입력
      if (KEY_TO_JAMO[e.key.toLowerCase()]) {
        addJamo(KEY_TO_JAMO[e.key.toLowerCase()]);
      }
      // Backspace
      else if (e.key === 'Backspace') {
        deleteJamo();
      }
      // Enter
      else if (e.key === 'Enter') {
        submitGuess();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStatus, currentGuess, currentAttempt]);

  const startNewGame = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    const jamos = decomposeWord(randomWord);

    setTargetWord(randomWord);
    setTargetJamos(jamos);
    setGuesses(Array(MAX_ATTEMPTS).fill(null).map(() =>
      Array(JAMO_LENGTH).fill(null).map(() => ({ letter: '', status: 'empty' }))
    ));
    setCurrentGuess([]);
    setCurrentAttempt(0);
    setGameStatus('playing');
  };

  // 자소 추가
  const addJamo = (jamo: string) => {
    if (gameStatus !== 'playing') return;
    if (currentGuess.length < JAMO_LENGTH) {
      setCurrentGuess(prev => [...prev, jamo]);
    }
  };

  // 자소 삭제
  const deleteJamo = () => {
    if (gameStatus !== 'playing') return;
    setCurrentGuess(prev => prev.slice(0, -1));
  };

  // 추측 제출
  const submitGuess = () => {
    if (currentGuess.length !== JAMO_LENGTH) return;
    if (currentAttempt >= MAX_ATTEMPTS) return;

    const newGuesses = [...guesses];
    const statusArray: LetterStatus[] = Array(JAMO_LENGTH).fill('absent');
    const targetCopy = [...targetJamos];

    // 1단계: 정확한 위치 체크
    currentGuess.forEach((jamo, i) => {
      if (jamo === targetJamos[i]) {
        statusArray[i] = 'correct';
        targetCopy[i] = '';
      }
    });

    // 2단계: 포함되어 있지만 위치가 틀린 경우 체크
    currentGuess.forEach((jamo, i) => {
      if (statusArray[i] !== 'correct') {
        const targetIndex = targetCopy.indexOf(jamo);
        if (targetIndex !== -1) {
          statusArray[i] = 'present';
          targetCopy[targetIndex] = '';
        }
      }
    });

    // 현재 시도 업데이트
    newGuesses[currentAttempt] = currentGuess.map((jamo, i) => ({
      letter: jamo,
      status: statusArray[i]
    }));

    setGuesses(newGuesses);

    // 게임 상태 체크
    const isCorrect = currentGuess.every((jamo, i) => jamo === targetJamos[i]);
    if (isCorrect) {
      setGameStatus('won');
    } else if (currentAttempt + 1 >= MAX_ATTEMPTS) {
      setGameStatus('lost');
    } else {
      setCurrentAttempt(prev => prev + 1);
      setCurrentGuess([]);
    }
  };

  // 셀 색상 가져오기
  const getCellColor = (status: LetterStatus) => {
    switch (status) {
      case 'correct': return 'bg-green-500 text-white border-green-500';
      case 'present': return 'bg-yellow-500 text-white border-yellow-500';
      case 'absent': return 'bg-gray-400 text-white border-gray-400';
      default: return 'bg-white border-gray-300 text-gray-900';
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 md:p-8 relative">
      {/* Top Navigation */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8">
        <Link
          href="/"
          className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-2xl"
        >
          ←
        </Link>
      </div>
      <div className="absolute top-4 right-4 md:top-8 md:right-8">
        <button
          onClick={() => setShowHelp(true)}
          className="w-8 h-8 rounded-full border-2 border-gray-600 text-gray-600 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center font-bold"
        >
          ?
        </button>
      </div>

      {/* Help Modal */}
      {showHelp && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowHelp(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">게임 방법</h2>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-600 hover:text-gray-900 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              <p className="mb-3">키보드 또는 화면 키보드로 5개 자소를 맞추세요</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-500 rounded"></div>
                  <span>정확한 위치</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-yellow-500 rounded"></div>
                  <span>단어에 포함되지만 위치가 틀림</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-400 rounded"></div>
                  <span>단어에 없음</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowHelp(false)}
              className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              확인
            </button>
          </motion.div>
        </div>
      )}

      <div className="max-w-lg w-full">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            한들
          </h1>
          <p className="text-gray-600 text-sm">
            5개 자소 맞추기 게임
          </p>
        </motion.div>

        {/* Game Board */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <div className="grid gap-2">
            {guesses.map((guess, attemptIndex) => (
              <div key={attemptIndex} className="flex gap-2 justify-center">
                {Array.from({ length: JAMO_LENGTH }).map((_, letterIndex) => {
                  const displayLetter = attemptIndex === currentAttempt
                    ? (currentGuess[letterIndex] || '')
                    : guess[letterIndex]?.letter || '';

                  const cellStatus = attemptIndex === currentAttempt
                    ? 'empty'
                    : guess[letterIndex]?.status || 'empty';

                  return (
                    <motion.div
                      key={letterIndex}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: letterIndex * 0.05 }}
                      className={`w-12 h-12 md:w-14 md:h-14 border-2 flex items-center justify-center text-xl md:text-2xl font-bold ${getCellColor(cellStatus)}`}
                    >
                      {displayLetter}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Game Status */}
        {gameStatus !== 'playing' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-6"
          >
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <p className="text-xl font-bold text-gray-900 mb-2">
                {gameStatus === 'won' ? '🎉 성공!' : '😢 실패!'}
              </p>
              <p className="text-gray-600 text-sm mb-3">
                정답: <span className="font-bold">{targetWord}</span> ({targetJamos.join(' ')})
              </p>
              <button
                onClick={startNewGame}
                className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                새 게임
              </button>
            </div>
          </motion.div>
        )}

        {/* Virtual Keyboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          {/* 키보드 배열 */}
          <div>
            {KEYBOARD_LAYOUT.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex gap-1 justify-center mb-1"
                style={{ paddingLeft: rowIndex === 1 ? '20px' : rowIndex === 2 ? '0' : '0' }}
              >
                {/* 마지막 줄에 삭제 버튼 추가 */}
                {rowIndex === 2 && (
                  <button
                    onClick={deleteJamo}
                    className="bg-red-100 hover:bg-red-200 active:bg-red-300 text-red-900 font-bold py-3 px-2 md:px-3 rounded transition-colors text-sm md:text-base min-w-[50px] md:min-w-[60px]"
                    disabled={gameStatus !== 'playing'}
                  >
                    삭제
                  </button>
                )}

                {row.map(jamo => (
                  <button
                    key={jamo}
                    onClick={() => addJamo(jamo)}
                    className="bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-900 font-bold py-3 px-2 md:px-3 rounded transition-colors text-base md:text-lg min-w-[32px] md:min-w-[40px]"
                    disabled={gameStatus !== 'playing'}
                  >
                    {jamo}
                  </button>
                ))}

                {/* 마지막 줄에 입력 버튼 추가 */}
                {rowIndex === 2 && (
                  <button
                    onClick={submitGuess}
                    className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-3 px-2 md:px-3 rounded transition-colors disabled:bg-gray-300 disabled:text-gray-500 text-sm md:text-base min-w-[50px] md:min-w-[60px]"
                    disabled={gameStatus !== 'playing' || currentGuess.length !== JAMO_LENGTH}
                  >
                    입력
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
