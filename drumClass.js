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
    textSize(35);
    fill(255);
    stroke(0);
    strokeWeight(2);
    text("SPACE", width/2, 420);
  }

  enlarge(factor) {
    this.w *= factor;
    this.h *= factor;
  }

  resetSize() {
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
      textSize(32);
      fill(0);
      noStroke();

      drumDifferent = sqrt(
        (this.averageBPM.toFixed(2) - this.missionGauge.targetBPM) *
          (this.averageBPM.toFixed(2) - this.missionGauge.targetBPM)
      );

      text(
        `Game Over!\nTarget BPM: ${
          this.missionGauge.targetBPM
        }\nAvg BPM: ${this.averageBPM.toFixed(2)}`,
        width / 2,
        height / 2
      );
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
    return map(this.targetBPM, 100, 360, this.x - this.w /2, this.x + this.w /2);
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
    text("얼음이 녹는 속도\n" + this.targetBPM + " BPM", targetBpmX, this.y + this.h / 2 + 22);

    let userBpmX = map(userBPM, 100, 360, this.x - this.w / 2, this.x + this.w / 2);
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
        text("스페이스 바 연타!!", width/2, 10);
      } else if (userBPM <= 150) {
        text("더 빠르게!!", width/2, 10);
      } else {
        text("현재 속도: " + userBPM.toFixed(0) + " BPM", width/2, 10);
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
