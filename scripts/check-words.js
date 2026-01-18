const fs = require('fs');

// 한글 자소 분해 함수 (간단 버전)
function decomposeWord(word) {
  const CHOSUNG = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
  const JUNGSUNG = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
  const JONGSUNG = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

  const result = [];

  for (const char of word) {
    const code = char.charCodeAt(0);
    if (code < 0xAC00 || code > 0xD7A3) continue;

    const hangulCode = code - 0xAC00;
    const chosungIndex = Math.floor(hangulCode / 28 / 21);
    const jungsungIndex = Math.floor((hangulCode / 28) % 21);
    const jongsungIndex = hangulCode % 28;

    result.push(CHOSUNG[chosungIndex]);
    result.push(JUNGSUNG[jungsungIndex]);
    if (JONGSUNG[jongsungIndex]) {
      result.push(JONGSUNG[jongsungIndex]);
    }
  }

  return result;
}

const testWords = ['감수', '기장', '핑크', '누에'];

console.log('테스트 단어 자소 분해:\n');
testWords.forEach(word => {
  const jamos = decomposeWord(word);
  console.log(`${word} (${word.length}글자): ${jamos.join(' ')} (${jamos.length}자소)`);
});
