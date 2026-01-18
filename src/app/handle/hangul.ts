// 한글 자소 분해/조합 유틸리티

// 초성 리스트
const CHOSUNG = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

// 중성 리스트
const JUNGSUNG = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];

// 종성 리스트 (첫 번째는 없음)
const JONGSUNG = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

// 복합 자소 분해 맵
const COMPLEX_CHOSUNG_MAP: { [key: string]: string[] } = {
  'ㄲ': ['ㄱ', 'ㄱ'],
  'ㄸ': ['ㄷ', 'ㄷ'],
  'ㅃ': ['ㅂ', 'ㅂ'],
  'ㅆ': ['ㅅ', 'ㅅ'],
  'ㅉ': ['ㅈ', 'ㅈ'],
};

const COMPLEX_JUNGSUNG_MAP: { [key: string]: string[] } = {
  'ㅐ': ['ㅏ', 'ㅣ'],
  'ㅒ': ['ㅑ', 'ㅣ'],
  'ㅔ': ['ㅓ', 'ㅣ'],
  'ㅖ': ['ㅕ', 'ㅣ'],
  'ㅘ': ['ㅗ', 'ㅏ'],
  'ㅙ': ['ㅗ', 'ㅏ', 'ㅣ'],
  'ㅚ': ['ㅗ', 'ㅣ'],
  'ㅝ': ['ㅜ', 'ㅓ'],
  'ㅞ': ['ㅜ', 'ㅓ', 'ㅣ'],
  'ㅟ': ['ㅜ', 'ㅣ'],
  'ㅢ': ['ㅡ', 'ㅣ'],
};

const COMPLEX_JONGSUNG_MAP: { [key: string]: string[] } = {
  'ㄳ': ['ㄱ', 'ㅅ'],
  'ㄵ': ['ㄴ', 'ㅈ'],
  'ㄶ': ['ㄴ', 'ㅎ'],
  'ㄺ': ['ㄹ', 'ㄱ'],
  'ㄻ': ['ㄹ', 'ㅁ'],
  'ㄼ': ['ㄹ', 'ㅂ'],
  'ㄽ': ['ㄹ', 'ㅅ'],
  'ㄾ': ['ㄹ', 'ㅌ'],
  'ㄿ': ['ㄹ', 'ㅍ'],
  'ㅀ': ['ㄹ', 'ㅎ'],
  'ㄲ': ['ㄱ', 'ㄱ'],
  'ㅄ': ['ㅂ', 'ㅅ'],
  'ㅆ': ['ㅅ', 'ㅅ'],
};

/**
 * 한글 문자를 자소로 분해
 */
export function decomposeHangul(char: string): string[] {
  const code = char.charCodeAt(0);

  // 한글 완성형 범위 확인
  if (code < 0xAC00 || code > 0xD7A3) {
    return [char]; // 한글이 아니면 그대로 반환
  }

  const hangulCode = code - 0xAC00;

  const chosungIndex = Math.floor(hangulCode / 28 / 21);
  const jungsungIndex = Math.floor((hangulCode / 28) % 21);
  const jongsungIndex = hangulCode % 28;

  const chosung = CHOSUNG[chosungIndex];
  const jungsung = JUNGSUNG[jungsungIndex];
  const jongsung = JONGSUNG[jongsungIndex];

  const result: string[] = [];

  // 초성 분해
  if (COMPLEX_CHOSUNG_MAP[chosung]) {
    result.push(...COMPLEX_CHOSUNG_MAP[chosung]);
  } else {
    result.push(chosung);
  }

  // 중성 분해
  if (COMPLEX_JUNGSUNG_MAP[jungsung]) {
    result.push(...COMPLEX_JUNGSUNG_MAP[jungsung]);
  } else {
    result.push(jungsung);
  }

  // 종성 분해
  if (jongsung) {
    if (COMPLEX_JONGSUNG_MAP[jongsung]) {
      result.push(...COMPLEX_JONGSUNG_MAP[jongsung]);
    } else {
      result.push(jongsung);
    }
  }

  return result;
}

/**
 * 단어를 자소 배열로 분해
 */
export function decomposeWord(word: string): string[] {
  return word.split('').flatMap(char => decomposeHangul(char));
}

/**
 * 자소가 자음인지 확인
 */
export function isConsonant(jamo: string): boolean {
  return CHOSUNG.includes(jamo) || JONGSUNG.includes(jamo);
}

/**
 * 자소가 모음인지 확인
 */
export function isVowel(jamo: string): boolean {
  return JUNGSUNG.includes(jamo);
}

/**
 * 모든 기본 자음 반환
 */
export function getBasicConsonants(): string[] {
  return ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
}

/**
 * 모든 기본 모음 반환
 */
export function getBasicVowels(): string[] {
  return ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ'];
}
