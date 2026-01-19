const fs = require('fs');

const words = JSON.parse(fs.readFileSync('src/app/handle/words-original.json', 'utf-8'));

// 분석 카테고리
const analysis = {
  repeating: [], // 같은 글자 반복 (예: 꺼끄, 뻐끔)
  rare_chars: [], // 드문 자음 조합 (ㅃ, ㄸ, ㅉ 등이 많은)
  all_consonants: [], // 자음만 있는 듯한 단어
  samples: [] // 랜덤 샘플
};

// 드문 자음/모음
const rareChars = ['ㄲ', 'ㄸ', 'ㅃ', 'ㅆ', 'ㅉ', 'ㅒ', 'ㅖ'];

for (const word of words) {
  // 같은 글자 반복
  if (word[0] === word[1]) {
    analysis.repeating.push(word);
  }

  // 드문 자음 많이 포함
  let rareCount = 0;
  for (const char of word) {
    for (const rare of rareChars) {
      if (char.includes(rare)) rareCount++;
    }
  }
  if (rareCount >= 2) {
    analysis.rare_chars.push(word);
  }
}

// 랜덤 샘플 200개
const shuffled = [...words].sort(() => Math.random() - 0.5);
analysis.samples = shuffled.slice(0, 200);

console.log('=== 단어 분석 결과 ===\n');

console.log(`총 단어 수: ${words.length}\n`);

console.log(`1. 같은 글자 반복 (${analysis.repeating.length}개):`);
console.log(analysis.repeating.slice(0, 50).join(', '));
console.log('\n');

console.log(`2. 드문 자음 많이 포함 (${analysis.rare_chars.length}개):`);
console.log(analysis.rare_chars.slice(0, 50).join(', '));
console.log('\n');

console.log(`3. 랜덤 샘플 200개:`);
for (let i = 0; i < 200; i += 10) {
  console.log(analysis.samples.slice(i, i + 10).join(', '));
}

// 통계
console.log('\n=== 통계 ===');
console.log(`반복 글자: ${analysis.repeating.length}개`);
console.log(`드문 자음: ${analysis.rare_chars.length}개`);
