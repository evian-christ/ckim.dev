const fs = require('fs');

// 한글 자소 분해 함수
function decomposeHangul(char) {
  const code = char.charCodeAt(0) - 0xAC00;

  if (code < 0 || code > 11171) {
    return /[ㄱ-ㅎㅏ-ㅣ]/.test(char) ? [char] : [];
  }

  const choseong = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
  const jungseong = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
  const jongseong = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

  const complexJungsung = {
    'ㅐ': ['ㅏ', 'ㅣ'], 'ㅔ': ['ㅓ', 'ㅣ'], 'ㅒ': ['ㅑ', 'ㅣ'], 'ㅖ': ['ㅕ', 'ㅣ'],
    'ㅘ': ['ㅗ', 'ㅏ'], 'ㅙ': ['ㅗ', 'ㅏ', 'ㅣ'], 'ㅚ': ['ㅗ', 'ㅣ'],
    'ㅝ': ['ㅜ', 'ㅓ'], 'ㅞ': ['ㅜ', 'ㅓ', 'ㅣ'], 'ㅟ': ['ㅜ', 'ㅣ'], 'ㅢ': ['ㅡ', 'ㅣ']
  };

  const complexJongsung = {
    'ㄲ': ['ㄱ', 'ㄱ'], 'ㄳ': ['ㄱ', 'ㅅ'], 'ㄵ': ['ㄴ', 'ㅈ'], 'ㄶ': ['ㄴ', 'ㅎ'],
    'ㄺ': ['ㄹ', 'ㄱ'], 'ㄻ': ['ㄹ', 'ㅁ'], 'ㄼ': ['ㄹ', 'ㅂ'], 'ㄽ': ['ㄹ', 'ㅅ'],
    'ㄾ': ['ㄹ', 'ㅌ'], 'ㄿ': ['ㄹ', 'ㅍ'], 'ㅀ': ['ㄹ', 'ㅎ'], 'ㅄ': ['ㅂ', 'ㅅ'], 'ㅆ': ['ㅅ', 'ㅅ']
  };

  const cho = Math.floor(code / 588);
  const jung = Math.floor((code % 588) / 28);
  const jong = code % 28;

  const result = [choseong[cho]];

  if (complexJungsung[jungseong[jung]]) {
    result.push(...complexJungsung[jungseong[jung]]);
  } else {
    result.push(jungseong[jung]);
  }

  if (jong > 0) {
    const jongChar = jongseong[jong];
    if (complexJongsung[jongChar]) {
      result.push(...complexJongsung[jongChar]);
    } else {
      result.push(jongChar);
    }
  }

  return result;
}

function decomposeWord(word) {
  return word.split('').flatMap(char => decomposeHangul(char));
}

// JS 파일에서 단어 추출
const jsContent = fs.readFileSync('/tmp/all_nouns.js', 'utf-8');
const matches = jsContent.match(/'([가-힣]+)'/g);

if (!matches) {
  console.error('단어를 찾을 수 없습니다');
  process.exit(1);
}

const validWords = [];

for (const match of matches) {
  const word = match.replace(/'/g, '');

  // 2글자만
  if (word.length !== 2) continue;

  // 5자소 확인
  const jamos = decomposeWord(word);
  if (jamos.length === 5) {
    validWords.push(word);
  }
}

// 중복 제거 및 정렬
const uniqueWords = [...new Set(validWords)];
uniqueWords.sort();

console.log(`총 단어 수: ${uniqueWords.length}`);
console.log(`\n처음 50개:`);
console.log(uniqueWords.slice(0, 50).join(', '));
console.log(`\n마지막 50개:`);
console.log(uniqueWords.slice(-50).join(', '));

// "감수" 있는지 확인
if (uniqueWords.includes('감수')) {
  console.log('\n✓ "감수" 포함됨');
} else {
  console.log('\n✗ "감수" 없음');
}

// 파일로 저장
fs.writeFileSync(
  'src/app/handle/words-wordle-nouns.json',
  JSON.stringify(uniqueWords, null, 2),
  'utf-8'
);

console.log('\nwords-wordle-nouns.json 파일로 저장되었습니다.');
