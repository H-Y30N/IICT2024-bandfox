function keyPressed() {
  /* 오류가 난 초기화 로직 바꾸고 엔딩 텍스트도 거기에 맞춰 새로고침으로
 if (keyCode == 27) {
    //ESC를 누르면
    dialogues = [];
    correct.play();
    stage = 0;
  }*/

  let keyMap = {
    9: 0, // 첫 번째 줄
    i: 1, // 두 번째 줄
    j: 2, // 세 번째 줄
    n: 3, // 네 번째 줄
  };

  // 키 입력 처리
  if (key.toLowerCase() in keyMap) {
    let stringIndex = keyMap[key.toLowerCase()];
    for (let i = notes.length - 1; i >= 0; i--) {
      if (
        notes[i] &&
        notes[i].y === strings[stringIndex] &&
        !notes[i].hitEffect
      ) {
        let distance = Math.abs(notes[i].x - (width - 50));
        if (distance < 30) {
          // 올바른 입력 처리
          //console.log("Note hit!");
          bassScore++; // 점수 증가
          notes[i].hitEffect = true; // 색상 변경을 위한 플래그
          showFeedback("Good"); // 피드백 메시지
          bassSlap.play(); // 효과음 재생

          // 노트 즉시 삭제
          notes.splice(i, 1);
          return; // 조건 만족 시 루프 종료
        }
      }
    }
    // 잘못된 입력 처리
    missedNotes++; // 놓친 노트 증가
    showFeedback("Miss"); // Miss 메시지
  }

  //드럼 관련 함수
  let drumSound = false;
  if (key === " " || key === "Space") {
    if (isInPracticeMode) {
      if (!practiceGame.isPracticeStarted) {
        practiceGame.startPractice();
      } else {
        practiceGame.registerInput();
        if (!drumSound && stage == 4) {
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
  } else if (keyCode === 83) {
    if (practiceGame.isPracticeOver) {
      isInPracticeMode = false; // 실전 모드로 전환
      realGame.pressedTimes = [];
      realGame.startGame(); // 실전 게임 시작
    }
  }

  //console.log(pianoUser.pressedKeys);

  //키보드 무엇이 눌리냐에 따라 건반을 바꿔준다.
  if (!wait) {
    if (keyCode === 65) pianoUser.key = 0; //A
    else if (keyCode === 83) pianoUser.key = 1; //S
    else if (keyCode === 68) pianoUser.key = 2; //D
    else if (keyCode === 70) pianoUser.key = 3; //F
    else if (keyCode === 71) pianoUser.key = 4; //G
    else if (keyCode === 72) pianoUser.key = 5; //H
    else if (keyCode === 74) pianoUser.key = 6; //J
    else pianoUser.key = -1;
  } else return;

  let maxStage = 17; // 최대 stage 수 (단계 수)

  //엔터키를 누르면 대사가 출력되도록 하는 코드
  if (keyCode == ENTER) {
    click.play();
    if (isDisplaying) {
      // 출력 중이라면 즉시 대사 전체 표시
      displayedText = dialogues[currentDialogueIndex];
      isDisplaying = false;
    } else {
      // 다음 대사로 진행
      currentDialogueIndex++;
      if (currentDialogueIndex < dialogues.length) {
        displayedText = ""; // 텍스트 초기화
        currentCharIndex = 0; // 문자 인덱스 초기화
        isDisplaying = true;
        showNextCharacter();
        //console.log(dialogues.length, currentCharIndex);
      } else {
        displayedText = "";
        isDisplaying = false;
        // 대사가 끝났을 때
      }
    }

    if (currentDialogueIndex >= dialogues.length) {
      if (typeof drumFinal == "undefined" && stage == 4) {
      } else if (typeof keyboardFinal == "undefined" && stage == 10) {
      } else if (typeof guitarFinal == "undefined" && stage == 14) {
      } else if (typeof bassFinal == "undefined" && stage == 7) {
      } else {
        correct.play();
        stage++;
      }
    }
  }
}

function showNextCharacter() {
  if (
    currentCharIndex < dialogues[currentDialogueIndex].length &&
    isDisplaying
  ) {
    displayedText += dialogues[currentDialogueIndex][currentCharIndex];
    currentCharIndex++;
    setTimeout(showNextCharacter, 50); // 출력 속도 조절 (50ms)
  } else {
    // 출력 완료
  }
}

function initializeDialogue() {
  dialogues = [];
  currentCharIndex = 0;
  currentDialogueIndex = 0;
}

function keyReleased() {
  // 키가 해제되면 keysAdded 초기화
  for (let i = 0; i < pianoUser.space; i++) {
    pianoUser.keyStates[i] = false;
  }
}

function initializeScene() {
  //BGM 플레이 코드 (추가)
  if (!bgmPlaying) {
    bgm.stop();
    bgm.loop();
    bgm.amp(env);
    env.triggerAttack();
    bgmPlaying = true;
  }
  if (
    drumFinal !== undefined &&
    bassFinal !== undefined &&
    keyboardFinal !== undefined &&
    guitarFinal !== undefined
  ) {
    //점수 초기화
    drumFinal = undefined;
    bassFinal = undefined;
    keyboardFinal = undefined;
    guitarFinal = undefined;
    isInPracticeMode = true;
    hands = []; // 손 데이터 저장
    scoreIncrementedRects = []; // 점수 증가 여부 체크 배열
    pointOfGuitar = 0; // 점수
    rects = []; // 빨간 네모들의 정보 저장
    score = 0;
    level = 1;
    newLevel = false;
    _width = 640;
    _height = 480;
    piano = [];
    img = [];
    timeOK = false;
    scoreNum = 0;
    wait = false;
    notes = [];
    bassScore = 0;
    bassLevel = 0;
    missedNotes = 0; // 놓친 노트 개수
    retryLevel = 0; // 실패한 레벨을 기억하는 변수
    drumPracticeStart;
    drumPracticeComplete;
  }
}
