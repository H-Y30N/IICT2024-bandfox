// 손 위치 가져오는 함수
function gotHands(results) {
  hands = results;
}

// 네모 위치와 색상을 생성하는 함수
function generateRects() {
  let numRects = int(random(1, 4)); // 1~3개 네모 생성
  rects = [];
  scoreIncrementedRects = [];
  
  for (let i = 0; i < numRects; i++) {
    // x와 y 좌표를 검은색 네모의 격자에 정확히 맞게 설정
    let col = int(random(1, 6)); // 기타 칸의 열(가로 위치)
    let row = int(random(1, 3)); // 기타 칸의 줄(세로 위치)
    
    let x = 5 + col * guitarWidth; // 기타의 열에 맞춘 x 좌표
    let y = 100 + 70 + row * guitarHeight; // 기타의 줄에 맞춘 y 좌표

    rects.push({ x: x, y: y, color: color(255, 0, 0, 120), blinkCount: 0 });
    scoreIncrementedRects.push(false);
  }
}
