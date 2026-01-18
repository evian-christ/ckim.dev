const fs = require('fs');

// 한글 자소 분해 함수
const CHOSUNG = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const JUNGSUNG = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
const JONGSUNG = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

const COMPLEX_CHOSUNG_MAP = {
  'ㄲ': ['ㄱ', 'ㄱ'],
  'ㄸ': ['ㄷ', 'ㄷ'],
  'ㅃ': ['ㅂ', 'ㅂ'],
  'ㅆ': ['ㅅ', 'ㅅ'],
  'ㅉ': ['ㅈ', 'ㅈ'],
};

const COMPLEX_JUNGSUNG_MAP = {
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

const COMPLEX_JONGSUNG_MAP = {
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

function decomposeHangul(char) {
  const code = char.charCodeAt(0);

  if (code < 0xAC00 || code > 0xD7A3) {
    return [char];
  }

  const hangulCode = code - 0xAC00;
  const chosungIndex = Math.floor(hangulCode / 28 / 21);
  const jungsungIndex = Math.floor((hangulCode / 28) % 21);
  const jongsungIndex = hangulCode % 28;

  const chosung = CHOSUNG[chosungIndex];
  const jungsung = JUNGSUNG[jungsungIndex];
  const jongsung = JONGSUNG[jongsungIndex];

  const result = [];

  if (COMPLEX_CHOSUNG_MAP[chosung]) {
    result.push(...COMPLEX_CHOSUNG_MAP[chosung]);
  } else {
    result.push(chosung);
  }

  if (COMPLEX_JUNGSUNG_MAP[jungsung]) {
    result.push(...COMPLEX_JUNGSUNG_MAP[jungsung]);
  } else {
    result.push(jungsung);
  }

  if (jongsung) {
    if (COMPLEX_JONGSUNG_MAP[jongsung]) {
      result.push(...COMPLEX_JONGSUNG_MAP[jongsung]);
    } else {
      result.push(jongsung);
    }
  }

  return result;
}

function decomposeWord(word) {
  return word.split('').flatMap(char => decomposeHangul(char));
}

// 단어 리스트 읽기
const content = fs.readFileSync('/tmp/korean_words.txt', 'utf-8');
const allWords = content.split('\n').filter(line => line.trim());

console.log(`총 단어 수: ${allWords.length}`);

// 2글자 단어만 필터 (한글 완성형만)
const twoCharWords = allWords.filter(word => {
  const trimmed = word.trim();
  if (trimmed.length !== 2) return false;

  // 모든 글자가 한글 완성형(가-힣)인지 확인
  return /^[가-힣]{2}$/.test(trimmed);
});

console.log(`2글자 단어 수: ${twoCharWords.length}`);

// 5자소 단어만 필터
const fiveJamoWords = twoCharWords.filter(word => {
  const jamos = decomposeWord(word);
  return jamos.length === 5;
});

console.log(`5자소 단어 수: ${fiveJamoWords.length}`);

// 샘플 출력
console.log('\n첫 20개 단어 샘플:');
fiveJamoWords.slice(0, 20).forEach(word => {
  const jamos = decomposeWord(word);
  console.log(`${word}: ${jamos.join(' ')}`);
});

// JSON 파일로 저장
const outputPath = '/Users/chan/Desktop/ckim.dev/src/app/handle/words.json';
fs.writeFileSync(outputPath, JSON.stringify(fiveJamoWords, null, 2), 'utf-8');

console.log(`\n✅ ${fiveJamoWords.length}개의 5자소 단어를 ${outputPath}에 저장했습니다.`);
