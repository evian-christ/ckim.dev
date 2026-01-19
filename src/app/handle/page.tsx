'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { decomposeWord } from './hangul';
import WORD_LIST from './words.json';

// 5자소 단어 목록
const WORDS = WORD_LIST;

const JAMO_LENGTH = 5;
const MAX_ATTEMPTS = 6;

// 한글 기본 자소 키보드 배열 (복합 모음 제거)
const KEYBOARD_LAYOUT = [
  ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ'],
  ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ'],
  ['ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ']
];

// 키보드 키 -> 한글 자소 매핑
const KEY_TO_JAMO: { [key: string]: string } = {
  'q': 'ㅂ', 'w': 'ㅈ', 'e': 'ㄷ', 'r': 'ㄱ', 't': 'ㅅ',
  'y': 'ㅛ', 'u': 'ㅕ', 'i': 'ㅑ',
  'a': 'ㅁ', 's': 'ㄴ', 'd': 'ㅇ', 'f': 'ㄹ', 'g': 'ㅎ',
  'h': 'ㅗ', 'j': 'ㅓ', 'k': 'ㅏ', 'l': 'ㅣ',
  'z': 'ㅋ', 'x': 'ㅌ', 'c': 'ㅊ', 'v': 'ㅍ',
  'b': 'ㅠ', 'n': 'ㅜ', 'm': 'ㅡ'
};

// 복합 모음 -> 기본 자소 분해 매핑
const COMPLEX_VOWEL_MAP: { [key: string]: string[] } = {
  'ㅐ': ['ㅏ', 'ㅣ'],
  'ㅔ': ['ㅓ', 'ㅣ'],
  'ㅒ': ['ㅑ', 'ㅣ'],
  'ㅖ': ['ㅕ', 'ㅣ'],
  'ㅘ': ['ㅗ', 'ㅏ'],
  'ㅙ': ['ㅗ', 'ㅏ', 'ㅣ'],
  'ㅚ': ['ㅗ', 'ㅣ'],
  'ㅝ': ['ㅜ', 'ㅓ'],
  'ㅞ': ['ㅜ', 'ㅓ', 'ㅣ'],
  'ㅟ': ['ㅜ', 'ㅣ'],
  'ㅢ': ['ㅡ', 'ㅣ']
};

type LetterStatus = 'correct' | 'present' | 'absent' | 'empty';

interface Cell {
  letter: string;
  status: LetterStatus;
}

export default function HandlePage() {
  const router = useRouter();
  const [targetWord, setTargetWord] = useState('');
  const [targetJamos, setTargetJamos] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<Cell[][]>([]);
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [showHelp, setShowHelp] = useState(false);
  const [jamoStatus, setJamoStatus] = useState<{ [key: string]: LetterStatus }>({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [streak, setStreak] = useState(0);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [submittingScore, setSubmittingScore] = useState(false);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // 게임 초기화 및 연승 불러오기
  useEffect(() => {
    startNewGame();
    const savedStreak = localStorage.getItem('handle-streak');
    if (savedStreak) {
      setStreak(parseInt(savedStreak, 10));
    }
  }, []);

  // 숨겨진 input에 포커스 유지
  useEffect(() => {
    if (gameStatus === 'playing' && hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  }, [gameStatus, currentGuess]);

  // 숨겨진 input 이벤트 처리
  const handleHiddenInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (gameStatus !== 'playing') return;

    const input = e.currentTarget;
    const value = input.value;

    if (value.length > 0) {
      const lastChar = value[value.length - 1];

      // 한글 자모인지 확인
      if (/[ㄱ-ㅎㅏ-ㅣ]/.test(lastChar)) {
        addJamo(lastChar);
      }

      // input 초기화
      input.value = '';
    }
  };

  // 키보드 입력 처리 (Backspace, Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStatus !== 'playing') return;

      // Backspace
      if (e.key === 'Backspace') {
        e.preventDefault();
        deleteJamo();
      }
      // Enter
      else if (e.key === 'Enter') {
        e.preventDefault();
        submitGuess();
      }
      // 영어 키보드 매핑
      else if (KEY_TO_JAMO[e.key.toLowerCase()]) {
        addJamo(KEY_TO_JAMO[e.key.toLowerCase()]);
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
    setJamoStatus({});
  };

  // 자소 추가
  const addJamo = (jamo: string) => {
    if (gameStatus !== 'playing') return;

    // 복합 모음인 경우 분해해서 추가
    if (COMPLEX_VOWEL_MAP[jamo]) {
      const decomposed = COMPLEX_VOWEL_MAP[jamo];
      const remainingSpace = JAMO_LENGTH - currentGuess.length;
      const jamosToAdd = decomposed.slice(0, remainingSpace);
      setCurrentGuess(prev => [...prev, ...jamosToAdd]);
    } else {
      // 기본 자소는 그대로 추가
      if (currentGuess.length < JAMO_LENGTH) {
        setCurrentGuess(prev => [...prev, jamo]);
      }
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

    // 단어 목록에 있는지 확인
    const currentGuessString = currentGuess.join('');
    const isValidWord = WORDS.some(word => {
      const wordJamos = decomposeWord(word).join('');
      return wordJamos === currentGuessString;
    });

    if (!isValidWord) {
      setErrorMessage('단어 목록에 없는 단어입니다');
      setTimeout(() => setErrorMessage(''), 2000);
      return;
    }

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

    // 자소 상태 업데이트 (correct > present > absent 우선순위)
    const newJamoStatus = { ...jamoStatus };
    currentGuess.forEach((jamo, i) => {
      const currentStatus = statusArray[i];
      const existingStatus = newJamoStatus[jamo];

      // 우선순위: correct > present > absent
      if (!existingStatus ||
          (currentStatus === 'correct') ||
          (currentStatus === 'present' && existingStatus !== 'correct')) {
        newJamoStatus[jamo] = currentStatus;
      }
    });
    setJamoStatus(newJamoStatus);

    // 게임 상태 체크
    const isCorrect = currentGuess.every((jamo, i) => jamo === targetJamos[i]);
    if (isCorrect) {
      // 연승 증가
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem('handle-streak', newStreak.toString());

      setSuccessMessage('🎉 성공!');
      setTimeout(() => {
        setSuccessMessage('');
        startNewGame();
      }, 1500);
    } else if (currentAttempt + 1 >= MAX_ATTEMPTS) {
      // 게임 오버 모달 표시
      setGameStatus('lost');
      setShowGameOver(true);
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

  // 키보드 버튼 색상 가져오기
  const getKeyboardColor = (jamo: string) => {
    const status = jamoStatus[jamo];
    switch (status) {
      case 'correct': return 'bg-green-200 hover:bg-green-300 text-gray-900';
      case 'present': return 'bg-yellow-200 hover:bg-yellow-300 text-gray-900';
      case 'absent': return 'bg-gray-300 hover:bg-gray-400 text-gray-600';
      default: return 'bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-900';
    }
  };

  // 다시 시작
  const handleRestart = () => {
    setStreak(0);
    localStorage.setItem('handle-streak', '0');
    setShowGameOver(false);
    setShowNameInput(false);
    setPlayerName('');
    startNewGame();
  };

  // 하이스코어 등록
  const handleSubmitHighScore = async () => {
    if (!playerName.trim() || playerName.length > 32) {
      return;
    }

    setSubmittingScore(true);

    try {
      const { error } = await supabase
        .from('highscores')
        .insert([
          {
            name: playerName.trim(),
            score: streak,
            date: new Date().toISOString()
          }
        ]);

      if (error) {
        console.error('Error submitting score:', error);
        alert('점수 등록에 실패했습니다.');
      } else {
        // 연승 리셋
        setStreak(0);
        localStorage.setItem('handle-streak', '0');
        // 하이스코어 페이지로 이동
        router.push('/handle/highscore');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('점수 등록에 실패했습니다.');
    } finally {
      setSubmittingScore(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 md:p-8 relative">
      {/* Hidden input for Korean IME */}
      <input
        ref={hiddenInputRef}
        type="text"
        onInput={handleHiddenInput}
        className="absolute opacity-0 pointer-events-none"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />

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
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center z-50 p-4"
          onClick={() => setShowHelp(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/95 backdrop-blur-sm rounded-xl p-8 max-w-sm w-full border border-gray-200 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">게임 방법</h2>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-400 hover:text-gray-900 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="text-sm text-gray-600 mb-6">
              <p className="mb-4">키보드 또는 화면 키보드로 5개 자소를 맞추세요</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded"></div>
                  <span>정확한 위치</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-yellow-500 rounded"></div>
                  <span>단어에 포함되지만 위치가 틀림</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gray-400 rounded"></div>
                  <span>단어에 없음</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowHelp(false)}
              className="w-full bg-gray-900 text-white py-2.5 rounded-lg hover:bg-gray-700 transition-colors text-sm"
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
                  // 이미 제출된 행이면 guess 데이터 사용, 아니면 현재 입력 중인 데이터 사용
                  const isSubmitted = guess[letterIndex]?.letter !== '';
                  const displayLetter = isSubmitted
                    ? guess[letterIndex]?.letter || ''
                    : (attemptIndex === currentAttempt ? (currentGuess[letterIndex] || '') : '');

                  const cellStatus = isSubmitted
                    ? guess[letterIndex]?.status || 'empty'
                    : 'empty';

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
                    className={`${getKeyboardColor(jamo)} font-bold py-3 px-2 md:px-3 rounded transition-colors text-base md:text-lg min-w-[32px] md:min-w-[40px]`}
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

        {/* Streak Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-full">
            <span className="text-2xl">🔥</span>
            <span className="font-bold text-gray-900">
              {streak > 0 ? `${streak}연승 중!` : '도전 시작!'}
            </span>
          </div>
        </motion.div>

      </div>

      {/* Toast Overlays */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg font-bold">
              {errorMessage}
            </div>
          </motion.div>
        )}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="bg-green-500 text-white px-8 py-4 rounded-lg shadow-2xl font-bold text-2xl">
              {successMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Over Modal */}
      {showGameOver && (
        <div className="fixed inset-0 bg-white bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/90 backdrop-blur-md rounded-xl p-10 max-w-sm w-full border border-gray-200"
          >
            {!showNameInput ? (
              <>
                {/* Game Over Screen */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">게임 종료</h2>
                  <p className="text-gray-500 text-sm mb-2">정답</p>
                  <p className="text-gray-900 font-medium text-lg mb-6">{targetWord}</p>

                  {streak > 0 && (
                    <div className="inline-flex items-center gap-2 bg-gray-100 px-5 py-2 rounded-full">
                      <span className="text-xl">🔥</span>
                      <span className="text-lg font-medium text-gray-700">{streak}연승</span>
                    </div>
                  )}
                </div>

                {/* Options */}
                <div className="space-y-2">
                  <button
                    onClick={handleRestart}
                    className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                  >
                    다시 시작
                  </button>
                  {streak > 0 && (
                    <button
                      onClick={() => setShowNameInput(true)}
                      className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                    >
                      하이스코어 등록
                    </button>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Name Input Screen */}
                <div className="text-center mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">이름 입력</h2>
                  <p className="text-gray-500 text-xs mb-6">32자 이내</p>

                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value.slice(0, 32))}
                    placeholder="이름"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-gray-400 focus:outline-none text-center text-base text-gray-900 mb-2"
                    maxLength={32}
                    autoFocus
                  />
                  <p className="text-xs text-gray-400">{playerName.length}/32</p>
                </div>

                {/* Submit Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={handleSubmitHighScore}
                    disabled={!playerName.trim() || submittingScore}
                    className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {submittingScore ? '등록 중...' : '등록하기'}
                  </button>
                  <button
                    onClick={() => setShowNameInput(false)}
                    className="w-full bg-gray-100 text-gray-600 py-3 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    취소
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
