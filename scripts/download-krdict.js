const https = require('https');
const fs = require('fs');

// 국립국어원 한국어 학습용 어휘 목록 다운로드
// 직접 다운로드 링크 (txt 파일)
const urls = [
  'https://www.korean.go.kr/common/download.do?file_path=/front_board/etcData/&real_name=%ED%95%9C%EA%B5%AD%EC%96%B4%20%ED%95%99%EC%8A%B5%EC%9A%A9%20%EC%96%B4%ED%9C%98%20%EB%AA%A9%EB%A1%9D(1%EB%93%B1%EA%B8%89).txt',
  'https://www.korean.go.kr/common/download.do?file_path=/front_board/etcData/&real_name=%ED%95%9C%EA%B5%AD%EC%96%B4%20%ED%95%99%EC%8A%B5%EC%9A%A9%20%EC%96%B4%ED%9C%98%20%EB%AA%A9%EB%A1%9D(2%EB%93%B1%EA%B8%89).txt',
  'https://www.korean.go.kr/common/download.do?file_path=/front_board/etcData/&real_name=%ED%95%9C%EA%B5%AD%EC%96%B4%20%ED%95%99%EC%8A%B5%EC%9A%A9%20%EC%96%B4%ED%9C%98%20%EB%AA%A9%EB%A1%9D(3%EB%93%B1%EA%B8%89).txt'
];

console.log('국립국어원 어휘 목록을 다운로드할 수 없습니다.');
console.log('수동으로 다운로드해주세요:');
console.log('https://www.korean.go.kr/front/etcData/etcDataView.do?mn_id=46&etc_seq=71');
console.log('\n대신 한국어 기초사전 API를 사용하거나, 일반적인 한국어 단어 목록을 만들겠습니다.');
