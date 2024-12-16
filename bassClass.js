function playLevel(noteInterval, maxSimultaneousNotes, speedMultiplier) {
  gameTimer++;
  // 줄 그리기
  stroke(255);
  strokeWeight(4);
  for (let y of strings) {
    line(0, y, width, y);
  }

  // 목표 지점 그리기 (빈 동그라미 형태)
  noFill();
  stroke(255);
  strokeWeight(2);
  const displayKeys = ["9", "I", "J", "N"]; // 표시되는 키 순서
  for (let i = 0; i < strings.length; i++) {
    ellipse(width - 50, strings[i], 40); // 목표 지점 원
    textSize(16);
    textAlign(CENTER, CENTER);
    fill(255); // 텍스트 색상
    text(displayKeys[i], width - 50, strings[i]); // 목표 원 내부에 키 표시
    noFill(); // 원 내부 비우기 유지
  }

  // 노트 생성
  if (frameCount % noteInterval === 0) {
    // noteInterval 주기로 노트 생성
    let simultaneousNoteChance = random(); // 동시에 나올 가능성 결정
    let numNotesToGenerate = (simultaneousNoteChance < 0.4)
    ? floor(random(1, maxSimultaneousNotes + 1))
    : 1;

    // 선택된 개수의 노트 생성
    let selectedStrings = getRandomStrings(numNotesToGenerate);
    for (let i of selectedStrings) {
      let newNote = new Note(0, strings[i], speedMultiplier); // displayKeys[i] 없이 기존 변수 유지
      notes.push(newNote);
    }
  }

  // 노트 업데이트 및 화면에 그리기
  for (let i = notes.length - 1; i >= 0; i--) {
    if (notes[i]) {
      // 배열 인덱스 유효성 확인
      notes[i].update();
      notes[i].show();

      if (notes[i].x > width && !notes[i].hitEffect) {
        notes.splice(i, 1); // 화면을 벗어나면 삭제
        missedNotes++;
        showFeedback("Miss");
      }
    }
  }

  // 상단 점수 및 남은 시간 표시
  textAlign(RIGHT, TOP);
  text(`Score: ${bassScore}`, width - 10, 10);
  text(`Missed: ${missedNotes}`, width - 10, 40);

  // 피드백 메시지 표시
  if (feedbackTimer > 0) {
    textSize(32);
    fill(feedbackText === "Good" ? "green" : "red"); // Good은 초록색, Miss는 빨간색
    text(feedbackText, width / 2, height / 2);
    feedbackTimer--;
  }

  // 남은 시간 표시
  let remainingTime = ceil((gameDuration - gameTimer) / 60);
  textSize(18);
  textAlign(LEFT, TOP);
  text(`Time Left: ${remainingTime}s`, 10, 10);
}

function showFeedback(feedback) {
  feedbackText = feedback;
  feedbackTimer = 30;
}


function getRandomStrings(count) {
  let available = [0, 1, 2, 3];
  let selected = [];
  for (let i = 0; i < count; i++) {
    let index = floor(random(0, available.length));
    selected.push(available[index]);
    available.splice(index, 1);
  }
  return selected;
}

function resetGame() {
  level = 0;
  bassScore = 0;
  missedNotes = 0;
  notes = [];
}

function resetLevel() {
  missedNotes = 0;
  notes = [];
  gameTimer = 0; // 타이머 초기화
}


function displayReadyScreen(levelNumber) {
  fill(255);
  text("Press Space to start", _width / 2, _height / 2);
}

function displayEndingScreen() {
  let finalScore = max(bassScore*2 - missedNotes, 0);
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text("Your Score is", _width / 2, _height / 2 - 50);
  text(`${finalScore}`, _width / 2, _height / 2);
}


class Note {
  constructor(x, y, speedMultiplier, key) {
    this.x = x;
    this.y = y;
    this.size = 30;
    this.speed = 2 * speedMultiplier;
    this.hitEffect = false; // 맞춘 효과 활성화 상태
    this.key = key; // 노트에 표시될 키
  }

  update() {
    this.x += this.speed;
  }

  show() {
    fill(this.hitEffect ? color(0, 0, 255) : color(255, 0, 0)); // 맞춘 노트: 파란색, 기본: 빨간색
    ellipse(this.x, this.y, this.size);
    fill(255); // 텍스트 색상
    textSize(14);
    textAlign(CENTER, CENTER);
    text(this.key, this.x, this.y); // 노트에 표시되는 키
  }
}

