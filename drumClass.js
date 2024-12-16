class Snare {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = snareImage.width;
    this.h = snareImage.height;
    this.originalW = snareImage.width;
    this.originalH = snareImage.height;
  }

  display() {
    imageMode(CENTER);
    image(snareImage, this.x, this.y, this.w, this.h); // 이미지 그리기

    textAlign(CENTER, CENTER);
    if (drumSize) {
      textSize(40);
      fill(159, 254, 241);
    } else {
      textSize(35);
      fill(255);
    }
    stroke(130, 100, 81);
    strokeWeight(4);
    text("SPACE", width / 2, 420);
  }

  enlarge(factor) {
    drumSize = true;
    this.w *= factor;
    this.h *= factor;
  }

  resetSize() {
    drumSize = false;
    this.w = this.originalW;
    this.h = this.originalH;
  }
}

class DrumGame {
  constructor() {
    this.snare = new Snare(width / 2, height / 2, 100, 100);
    this.missionGauge = new MissionGuage();
    this.pressedTimes = [];
    this.startTime = 0;
    this.isGameStarted = false;
    this.isGameOver = false;
    this.isEnlarged = false;
    this.resetTimer = null;
    this.averageBPM = 0;
    this.gameDuration = 10000;
  }

  startGame() {
    this.isGameStarted = true;
    this.startTime = millis();
    this.pressedTimes = [];
    this.isGameOver = false;
  }

  registerInput() {
    let now = millis();
    this.pressedTimes.push(now);

    if (this.pressedTimes.length > 100) {
      this.pressedTimes.shift(); // 가장 오래된 값 제거
    }

    if (!this.isEnlarged) {
      this.snare.enlarge(1.17);
      this.isEnlarged = true;

      this.resetTimer = setTimeout(() => {
        this.snare.resetSize();
        this.isEnlarged = false;
      }, 250);
    }
  }

  calculateUserBPM() {
    if (this.pressedTimes.length > 1) {
      let cps =
        this.pressedTimes.length / ((millis() - this.pressedTimes[0]) / 1000);
      let bpm = cps * 60;
      return constrain(bpm, 100, 360);
    }
    return 0;
  }

  updateGame() {
    let elapsedTime = millis() - this.startTime;

    if (elapsedTime >= this.gameDuration) {
      this.isGameOver = true;
      this.averageBPM =
        (this.pressedTimes.length / (this.gameDuration / 1000)) * 60;
    }
  }

  display() {
    if (!this.isGameStarted) {
      textAlign(CENTER, CENTER);
      textSize(32);
      fill(0);
      noStroke();
      text("Ready? Press Space to start", width / 2, height / 2);
    } else if (!this.isGameOver) {
      imageMode(CORNER);
      image(drumImage, 0, 0, width, height);
      this.snare.display();
      let userBPM = this.calculateUserBPM();
      this.missionGauge.display(userBPM);
      this.updateGame();

      let targetBPMX = this.missionGauge.getTargetBPMX();
      textAlign(CENTER, TOP);
      textSize(12);
      fill(255);
      stroke(0);
      strokeWeight(2);
      text("현재 속도: " + userBPM.toFixed(0) + " BPM", targetBPMX, 10);
    } else {
      textAlign(CENTER, CENTER);

      //캐릭터들의 대사(요구 포함)가 들어가는 씬마다 여기서부터 다시 주석이 등장하는 곳까지
      //복사+붙여넣기 후, dialogues 안의 문구를 변경해 주세요.
      //추가한다면 "대사","대사", 식으로 더 넣으면 됩니다.

      //이전에 사용하던 대사의 참조 인덱스를 초기화합니다.
      if (currentDialogueIndex > dialogues.length && !isDisplaying) {
        currentDialogueIndex = 0;
        isDisplaying = false;
      } else {
      }
      image(drumIntroImage, width / 2, height / 2);
      //디버깅용. 위의 인덱스 초기화를 확인하기 위해 사용했습니다.
      //console.log(currentDialogueIndex);

      //여기에 해당 스테이지의 대사를 나열해주시면 됩니다.
      //그림과 겹치지 않게 줄바꿈을 해주세요. (\n을 사용합니다.)
      //줄바꿈 직후에 스페이스바가 있다면 정렬이 깨지니 유의해주세요.
      if (currentDialogueIndex <= 0) {
        image(dialogueFox, width / 2, height / 2);
      } else image(dialogueBear, width / 2, height / 2);
      textSize(18);
      textFont(choice);
      fill(0);
      strokeWeight(0);
      if (drumFinal == 10) {
        dialogues = [
          "이런 박자를 만들어 봤는데…….\n어떤 것 같아?",
          "흠……. 나쁘지 않은데? 아주 신나는 것 같아.",
          "얼음이 녹는 속도를 완벽하게 표현한 게 살짝 슬프면서도\n한이 승화될 만큼 이븐하게 흥겨워.",
          "역시 여우야!\n믿고 있었다고!",
          "그럼 이 갓곡을 같은 리듬 세션인\n베이시스트에게도 전달해줘야겠군.",
          "야, 카피바라!\n너도 와서 얘 곡 만드는 것 좀 도와 봐!",
        ];
      } else if (drumFinal == 5) {
        dialogues = [
          "이런 박자를 만들어 봤는데…….\n어떤 것 같아?",
          "……흠. 애매한데?\n듣기엔 나쁘지 않지만, 영혼의 울림이 없달까.",
          "뭐, 그런 걸 이제 막 결성한 신생 밴드에 기대하는 건\n역시 어려운 일이었겠지.",
          "이걸로도 나쁘진 않아.",
          "어쨌거나 같은 리듬 세션인\n베이시스트에게도 전달해줘야겠군.",
          "야, 카피바라!\n너도 와서 얘 곡 만드는 것 좀 도와 봐!",
        ];
      } else {
        dialogues = [
          "이런 박자를 만들어 봤는데…….\n어떤 것 같아?",
          "내 말을 듣긴 한 거야?\n내가 원한 곡은 이런 게 아냐!",
          "북극의 얼음은 커녕 사하라 사막이 떠오르는 박자잖아!\n이건 밴드맨으로서 모욕이야…….",
          "나 이런 곡은 별로 안 치고 싶어.",
          "베이시스트한테도 한 번 물어 보든가.\n네가 충고를 받을 만큼 똑똑하기만 하다면 말이야.",
          "야, 카피바라!\n너도 와서 얘 곡 만드는 것 좀 도와 봐!",
        ];
      }
      //첫 대사는 엔터키 입력(bassClass에서 담당) 없이도 출력되게 합니다.
      if (currentDialogueIndex == 0) {
        text(dialogues[0], width / 2, height - 70);
        //첫 대사가 아니라면 엔터키를 누를 때마다 다음 배열의 대사를 업데이트합니다.
      } else text(displayedText, width / 2, height - 70);
      //대사 외의 폰트 정렬을 위해 다시 센터 정렬로 돌려놓습니다.
      textAlign(CENTER, CENTER);
      //여기까지 복사하시면 됩니다.

      if (
        currentDialogueIndex >= 0 &&
        currentCharIndex % 9 === 0 &&
        currentCharIndex < dialogues[currentDialogueIndex].length &&
        keyCode == ENTER &&
        !soundPlayed // 이미 재생된 경우 방지
      ) {
        if (currentDialogueIndex <= 0) {
          foxVoice.play();
        } else bearVoice.play();
        soundPlayed = true; // 소리 재생 여부 설정
      }

      // 조건이 변할 때 플래그 초기화
      if (currentCharIndex % 9 !== 0 || keyCode !== ENTER) {
        soundPlayed = false; // 다시 재생 가능하도록 초기화
      }

      textSize(32);
      fill(0);
      noStroke();

      drumDifferent = sqrt(
        (this.averageBPM.toFixed(2) - this.missionGauge.targetBPM) *
          (this.averageBPM.toFixed(2) - this.missionGauge.targetBPM)
      );
      /*
      text(
        `Game Over!\nTarget BPM: ${
          this.missionGauge.targetBPM
        }\nAvg BPM: ${this.averageBPM.toFixed(2)}`,
        width / 2,
        height / 2
      );
      */
    }
  }
}

class MissionGuage {
  constructor(targetBPM = null) {
    this.x = width / 2;
    this.y = 50;
    this.w = width - 200;
    this.h = 20;
    this.startColor = color(0, 255, 0);
    this.endColor = color(255, 0, 0);
    this.targetBPM = targetBPM !== null ? targetBPM : int(random(140, 320));
    this.userBPM = 0;
  }

  getTargetBPMX() {
    return map(
      this.targetBPM,
      100,
      360,
      this.x - this.w / 2,
      this.x + this.w / 2
    );
  }

  display(userBPM) {
    this.drawGradient(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);

    stroke(0);
    noFill();
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h, this.h / 2);

    textAlign(CENTER, TOP);
    textSize(10);
    fill(0);
    noStroke();
    text("100 BPM", this.x - this.w / 2, this.y + this.h / 2 + 5);
    text("360 BPM", this.x + this.w / 2, this.y + this.h / 2 + 5);

    let targetBpmX = this.getTargetBPMX();
    fill(255, 255, 51);
    stroke(0);
    strokeWeight(2);
    rect(targetBpmX, this.y, 8, 50);
    textSize(15);
    text(
      "얼음이 녹는 속도\n" + this.targetBPM + " BPM",
      targetBpmX,
      this.y + this.h / 2 + 22
    );

    let userBpmX = map(
      userBPM,
      100,
      360,
      this.x - this.w / 2,
      this.x + this.w / 2
    );
    fill(255);
    stroke(0);
    strokeWeight(2);
    rect(userBpmX, this.y, 6, 40);
  }

  drawGradient(x, y, w, h) {
    noStroke();
    rectMode(CORNER);
    for (let i = 0; i < w; i++) {
      let inter = map(i, 0, w, 0, 1);
      let col = lerpColor(this.startColor, this.endColor, inter);
      fill(col);
      rect(x + i, y, 1, h);
    }
  }
}

class PracticeMode {
  constructor() {
    const targetBPM_fixed = 230;
    this.snare = new Snare(width / 2, height / 2, 100, 100);
    this.missionGauge = new MissionGuage(targetBPM_fixed);
    this.pressedTimes = [];
    this.isPracticeStarted = false; // 연습 게임 시작 여부
    this.isPracticeOver = false;
    this.isEnlarged = false;
    this.resetTimer = null;
  }

  startPractice() {
    this.isPracticeStarted = true;
    this.pressedTimes = [];
    this.isPracticeOver = false;
  }

  registerInput() {
    if (!this.isPracticeStarted) return;
    if (!this.isPracticeOver) {
      let now = millis();
      this.pressedTimes.push(now);

      if (this.pressedTimes.length > 100) {
        this.pressedTimes.shift();
      }

      if (!this.isEnlarged) {
        this.snare.enlarge(1.17);
        this.isEnlarged = true;

        this.resetTimer = setTimeout(() => {
          this.snare.resetSize();
          this.isEnlarged = false;
        }, 250);
      }

      if (this.pressedTimes.length >= 25) {
        this.isPracticeOver = true;
      }
    }
  }

  display() {
    if (!this.isPracticeStarted) {
      textAlign(CENTER, CENTER);
      textSize(32);
      fill(0);
      image(drumPracticeStart, 0, 0);
      //text("Ready? Press Space to start", width / 2, height / 2);
    } else if (!this.isPracticeOver) {
      imageMode(CORNER);
      image(drumImage, 0, 0, width, height);
      this.snare.display();
      let userBPM = this.calculateUserBPM();
      this.missionGauge.display(userBPM);
      imageMode(CORNER);
      image(drumPractice, 0, 0);

      textAlign(CENTER, TOP);
      textSize(12);
      fill(255);
      stroke(0);
      strokeWeight(2);
      if (this.pressedTimes.length == 0) {
        text("스페이스 바 연타!!", width / 2, 10);
      } else if (userBPM <= 150) {
        text("더 빠르게!!", width / 2, 10);
      } else {
        text("현재 속도: " + userBPM.toFixed(0) + " BPM", width / 2, 10);
      }
    } else {
      textAlign(CENTER, CENTER);
      textSize(32);
      fill(0);
      noStroke();
      imageMode(CORNER);
      image(drumPracticeComplete, 0, 0);
      //text("Practice Complete!\nPress N to start the real game", width / 2, height / 2);
    }
  }

  calculateUserBPM() {
    if (this.pressedTimes.length > 1) {
      let cps =
        this.pressedTimes.length / ((millis() - this.pressedTimes[0]) / 1000);
      let bpm = cps * 60;
      return constrain(bpm, 100, 360);
    }
    return 0;
  }
}
