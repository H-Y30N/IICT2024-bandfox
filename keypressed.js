function keyPressed() {
  let keyMap = {
    4: 0, // 첫 번째 줄 (4키)
    r: 1, // 두 번째 줄 (R키)
    f: 2, // 세 번째 줄 (F키)
    v: 3, // 네 번째 줄 (V키)
  };

  // 키 입력 처리
  if (key.toLowerCase() in keyMap) {
    // 대소문자 무관하게 처리
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
  } else if (key === "s" || key === "S") {
    if (practiceGame.isPracticeOver) {
      isInPracticeMode = false; // 실전 모드로 전환
      realGame.startGame(); // 실전 게임 시작
    }
  }

  console.log(pianoUser.pressedKeys);

  //키보드 무엇이 눌리냐에 따라 건반을 바꿔준다.
  if (!wait) {
    if (key === "a" || key === "A") pianoUser.key = 0;
    else if (key === "s" || key === "S") pianoUser.key = 1;
    else if (key === "d" || key === "D") pianoUser.key = 2;
    else if (key === "f" || key === "F") pianoUser.key = 3;
    else if (key === "g" || key === "G") pianoUser.key = 4;
    else if (key === "h" || key === "H") pianoUser.key = 5;
    else if ((key === "j") | (key === "J")) pianoUser.key = 6;
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
      } 
      else {
        correct.play();
        stage = (stage + 1) % maxStage;
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
