function playLevel(noteInterval, maxSimultaneousNotes, speedMultiplier) {
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
  for (let y of strings) {
    ellipse(width - 50, y, 40); // 목표 지점 표시
  }

  // 노트 생성
  if (frameCount % noteInterval === 0) {
    // noteInterval 주기로 노트 생성
    let simultaneousNoteChance = random(); // 동시에 나올 가능성 결정
    let numNotesToGenerate;

    // 동시에 나올 노트 개수 설정 (레벨에 따라 다르게 조정)
    if (bassLevel === 6) {
      // 레벨 3: 어려운 난이도에서 4개의 노트가 나올 확률을 줄임
      if (simultaneousNoteChance < 0.1) {
        numNotesToGenerate = 4; // 10% 확률로 4개의 노트 생성
      } else if (simultaneousNoteChance < 0.4) {
        numNotesToGenerate = floor(random(2, 4)); // 40% 확률로 2~3개의 노트 생성
      } else {
        numNotesToGenerate = 1; // 나머지 경우에는 1개의 노트 생성
      }
    } else {
      if (simultaneousNoteChance < 0.4) {
        numNotesToGenerate = floor(random(1, maxSimultaneousNotes + 1)); // 여러 개의 노트 생성
      } else {
        numNotesToGenerate = 1; // 나머지 경우에는 하나의 노트 생성
      }
    }

    // 선택된 개수의 노트 생성
    let selectedStrings = getRandomStrings(numNotesToGenerate);
    for (let i of selectedStrings) {
      let newNote = new Note(0, strings[i], speedMultiplier);
      notes.push(newNote);
    }
  }

  // 노트 업데이트 및 화면에 그리기
  for (let i = notes.length - 1; i >= 0; i--) {
    if (notes[i]) {
      // 배열 인덱스 유효성 확인
      notes[i].update();
      notes[i].show();

      if (notes[i].x > width) {
        notes.splice(i, 1); // 화면을 벗어나면 삭제
        missedNotes++;
      }
    }
  }

  // 점수 및 놓친 노트 수 표시
  fill(255);
  textSize(24);
  textAlign(LEFT, TOP);
  text("Score: " + bassScore, 10, 10);
  text("Missed: " + missedNotes, 10, 40); // 놓친 노트 개수 표시
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
  missedNotes = 0; // 놓친 노트 수 초기화
  notes = []; // 현재 화면에 있는 노트 제거
}

function displayReadyScreen(levelNumber) {
  fill(255);
  text(`READY FOR LEVEL ${levelNumber}?`, _width / 2, _height / 2 - 10);
  text("Press Space to start", _width / 2, _height / 2 + 30);
}

function displayEndingScreen() {
  if (bassScore >= 50) {
    text("GOOD JOB!", _width / 2, _height / 2);
  } else {
    text("TRY AGAIN!", _width / 2, _height / 2);
  }
  fill(100);
  rect(_width / 2 - 80, 300, 160, 40);
  fill(255);
  text("Restart", _width / 2, 320);

  if (
    mouseIsPressed &&
    mouseX > _width / 2 - 80 &&
    mouseX < _width / 2 + 80 &&
    mouseY > 300 &&
    mouseY < 340
  ) {
    bassLevel = 0;
    resetGame();
  }
}

class Note {
  constructor(x, y, speedMultiplier) {
    this.x = x; // 노트의 시작 위치 (왼쪽 끝)
    this.y = y; // 노트가 떨어지는 줄의 위치
    this.size = 30; // 노트 크기
    this.speed = 2 * speedMultiplier; // 노트 이동 속도 (난이도에 따라 조절)
  }

  update() {
    this.x += this.speed; // 오른쪽으로 이동
  }

  show() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.size);
  }
}
