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



function keyPressed() {
  let keyMap = {
    '4': 0, // 첫 번째 줄 (4키)
    'r': 1, // 두 번째 줄 (R키)
    'f': 2, // 세 번째 줄 (F키)
    'v': 3  // 네 번째 줄 (V키)
  };

  // 키 입력 처리
  if (key.toLowerCase() in keyMap) { // 대소문자 무관하게 처리
    let stringIndex = keyMap[key.toLowerCase()];
    console.log(`Pressed key: ${key}, String index: ${stringIndex}`); // 키 입력 로그

    for (let i = notes.length - 1; i >= 0; i--) {
      if (notes[i] && notes[i].y === strings[stringIndex]) {
        // 배열 인덱스 유효성 확인
        let distance = Math.abs(notes[i].x - (width - 50));
        if (distance < 30) {
          // 노트가 목표 지점에 가까운 위치에 도달했을 때 점수 추가
          console.log("Note hit!");
          bassScore += 1; // 점수 증가
          notes.splice(i, 1); // 맞춘 노트는 삭제
          break;
        }
      }
    }
  }

  //드럼 관련 함수
  let drumSound = false;
  if (key === " " || key === "Space") {
    if (isInPracticeMode) {
      if (!practiceGame.isPracticeStarted) {
        practiceGame.startPractice();
      } else {
        practiceGame.registerInput();
        if (!drumSound) {
          drumSnare.play();
          !drumSound;
        }
      }
    } else {
      if (!realGame.isGameStarted) {
        realGame.startGame();
      } else if (!realGame.isGameOver) {
        realGame.registerInput();
        if (!drumSound) {
          drumSnare.play();
          !drumSound;
        }
      }
    }
  } else if (key === "s" || key === "S") {
    if (practiceGame.isPracticeOver) {
      isInPracticeMode = false; // 실전 모드로 전환
      realGame.startGame(); // 실전 게임 시작
    }
  }

  // 오른쪽 방향키를 누르면 넘어감
  let maxStage = 17; // 최대 stage 수 (단계 수)
  if (keyCode == 39) {
    correct.play();
    stage = (stage + 1) % maxStage; // stage를 계속 증가시키며 0으로 돌아감
  }

  //키보드 무엇이 눌리냐에 따라 건반을 바꿔준다.
  if (key === "a") pianoUser.key = 0;
  else if (key === "s") pianoUser.key = 1;
  else if (key === "d") pianoUser.key = 2;
  else if (key === "f") pianoUser.key = 3;
  else if (key === "g") pianoUser.key = 4;
  else if (key === "h") pianoUser.key = 5;
  else if (key === "j") pianoUser.key = 6;
  else pianoUser.key = -1;

  //엔터키를 누르면 대사가 출력되도록 하는 코드
  if (keyCode === ENTER && !nowTalking) {
    click.play();
    if (isDisplaying) {
      // 출력 중이라면 즉시 대사 전체 표시
      displayedText = dialogues[currentDialogueIndex];
      isDisplaying = false;
    } else {
      // 다음 대사로 진행
      currentDialogueIndex++;
      if (currentDialogueIndex <= dialogues.length) {
        displayedText = ""; // 텍스트 초기화
        currentCharIndex = 0; // 문자 인덱스 초기화
        isDisplaying = true;
        showNextCharacter();
      } else {
        displayedText = "";
        // 대사가 끝났을 때
      }
    }
  }
}

function showNextCharacter() {
  if (currentCharIndex < dialogues[currentDialogueIndex].length) {
    nowTalking = true;
    displayedText += dialogues[currentDialogueIndex][currentCharIndex];
    currentCharIndex++;
    setTimeout(showNextCharacter, 50); // 출력 속도 조절 (50ms)
  } else {
    isDisplaying = false;
    nowTalking = false; // 출력 완료
  }
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
