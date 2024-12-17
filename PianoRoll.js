class PianoRoll {
  constructor(x, y, w, h, pianoSounds) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.space = 7;
    this.black = (this.w / this.space) * 0.7;
    this.duration = 1000;
    this.startTime = millis();
    this.pressedKeys = [];
    this.nav = [];
    this.key = -1;
    this.pianoSounds = pianoSounds;
    this.soundPlayed = Array(this.space).fill(false); // 각 건반의 소리 재생 여부
    this.keyStates = []; // 키가 눌린 상태를 추적

    for (let i = 0; i < this.space; i++) {
      this.keyStates[i] = false;
    }
  }

  show(alpha) {
    fill(alpha);
    strokeWeight(4);
    rectMode(CORNER);
    push();
    translate(this.x, this.y);

    //테두리
    fill(255);

    stroke(alpha);
    rect(0, 0, this.w, this.h);
    //흰 건반
    for (let i = 0; i < this.space; i++) {
      line(
        (this.w / this.space) * (i + 1),
        0,
        (this.w / this.space) * (i + 1),
        this.h
      );
    }
    //검은 건반
    fill(alpha);
    strokeWeight(0);
    for (let i = 0; i < 2; i++) {
      rect(
        (this.w / this.space) * (i + 1) - this.black / 2,
        0,
        this.black,
        this.h / 1.8
      );
    }

    for (let i = 3; i < this.space - 1; i++) {
      rect(
        (this.w / this.space) * (i + 1) - this.black / 2,
        0,
        this.black,
        this.h / 1.8
      );
    }

    //알파벳 글자
    for (let i = 0; i <= this.space - 1; i++) {
      textSize(this.w / 12);
      if (i == 0)
        text(
          "A",
          (this.w / this.space) * i + this.w / this.space / 4,
          this.h - this.h / 10
        );
      if (i == 1)
        text(
          "S",
          (this.w / this.space) * i + this.w / this.space / 4,
          this.h - this.h / 10
        );
      if (i == 2)
        text(
          "D",
          (this.w / this.space) * i + this.w / this.space / 4,
          this.h - this.h / 10
        );
      if (i == 3)
        text(
          "F",
          (this.w / this.space) * i + this.w / this.space / 4,
          this.h - this.h / 10
        );
      if (i == 4)
        text(
          "G",
          (this.w / this.space) * i + this.w / this.space / 4,
          this.h - this.h / 10
        );
      if (i == 5)
        text(
          "H",
          (this.w / this.space) * i + this.w / this.space / 4,
          this.h - this.h / 10
        );
      if (i == 6)
        text(
          "J",
          (this.w / this.space) * i + this.w / this.space / 4,
          this.h - this.h / 10
        );
    }

    pop();
  }

  press() {
    //console.log(this.keyStates);

    if (wait) {
      textFont(kossuyeom);
      textAlign(CENTER, CENTER);
      textSize(20);
      fill(150);
      strokeWeight(4);
      stroke(255);
      text("악상 떠올리는 중…", 450, 410);
      return;
    }

    soundPlayed = false;
    let isKeyHandled = false;
    strokeWeight(0);

    for (let i = 0; i < this.space; i++) {
      if (
        this.key === i &&
        !isKeyHandled &&
        keyIsPressed // 키가 눌린 상태 확인
      ) {
        fill(0, 0, 0, 100);
        rect(
          this.x + (this.w / this.space) * i,
          this.y,
          this.w / this.space,
          this.h
        );
        isKeyHandled = true;

        // 키가 이미 추가되어도 중복 추가 허용 (한 번씩만)
        if (!this.keyStates[i]) {
          this.pressedKeys.push(i);
          this.keyStates[i] = true; // 키 상태 업데이트
          if (this.pianoSounds && this.pianoSounds[i]) {
            this.pianoSounds[i].play();
          }
        }
      }
    }
  }

  //먼저 보여주는 그 화면
  navigate(n1, n2, n3, n4, n5) {
    this.nav = [n1, n2, n3, n4, n5];

    for (let i = 0; i < this.nav.length; i++) {
      // 각 건반의 시작 시간 계산
      let keyStartTime = this.startTime + i * this.duration + 3000;

      // 현재 시간이 각 건반의 시작 시간 범위 안에 있는지 확인
      if (millis() >= keyStartTime && millis() < keyStartTime + this.duration) {
        wait = true;
        fill(0, 0, 0, 100);
        strokeWeight(0);
        rect(
          this.x + (this.w / this.space) * this.nav[i], // nav 배열에 따라 위치 계산
          this.y,
          this.w / this.space,
          this.h
        );
        fill(0);
        if (
          this.pianoSounds &&
          this.pianoSounds[this.nav[i]] &&
          !this.soundPlayed[this.nav[i]]
        ) {
          this.pianoSounds[this.nav[i]].play();
          this.soundPlayed[this.nav[i]] = true; // 건반별로 재생 플래그 설정
        }
      } else if (millis() > keyStartTime + this.duration) {
        // 건반 소리의 범위가 끝나면 플래그 초기화
        this.soundPlayed[this.nav[i]] = false;
        wait = false;
        feedback = false;
        hasChanged = false;
      }
    }
  }
}

//챗gpt의 도움을 받은 함수. 제공된 순서 = 누른 순서면 점수가 증가합니다.
//arraysEqual은 두 배열이 같은지 여부를 체크하고, updateScore은 점수를 한 번만 증가시켜줍니다.
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false; // 길이가 다르면 false
  return arr1.every((val, index) => val === arr2[index]); // 각 요소 비교
}

function updateScore(num1, num2, num3) {
  if (
    arraysEqual(pianoUser.pressedKeys, [num1, num2, num3]) &&
    !pianoUser.scoreIncreased // 점수가 증가하지 않았을 때만
  ) {
    score = score + 10;
    pianoUser.scoreIncreased = true; // 점수 증가 플래그 설정
  }
}

//case마다 배열 초기화하는 함수
function initialize() {
  pianoNav.show(0);
  if (wait) pianoUser.show(100);
  else pianoUser.show(0);
  pianoUser.press();
  if (feedback) {
    image(img[1], 0, 250, 348, 225);
  } else image(img[0], 0, 250, 348, 225);
  if (wait) {
    image(img[2], 320, 20, 314, 211);
  } else image(img[3], 320, 20, 314, 211);

  if (wait && timeOK) {
    textSize(14);
    fill(95, 75, 62);
    strokeWeight(0);
    textAlign(CENTER, CENTER);
    textFont(choice);
    text("멜로디를\n기억해보자!", 412, 85);
    if (!soundPlayed) {
      foxVoice.play();
      soundPlayed = true;
    }
  }
  if (feedback) {
    if (hasChanged) {
      textSize(14);
      fill(78, 78, 72);
      strokeWeight(0);
      textAlign(CENTER, CENTER);
      textFont(choice);
      text("이 정도면 금방\n익히겠는데?", 210, 325);
      if (!soundPlayed) {
        rabbitVoice.play();
        soundPlayed = true;
      }
    } else {
      textSize(14);
      fill(78, 78, 72);
      strokeWeight(0);
      textAlign(CENTER, CENTER);
      textFont(choice);
      text("기억이 잘\n안날 것 같은데…", 210, 325);
      if (!soundPlayed) {
        hmmSound.play();
        soundPlayed = true;
      }
    }
  }

  if (newLevel) {
    pianoNav.startTime = millis();

    pianoUser.scoreIncreased = false; // 점수 증가 플래그 초기화
    pianoNav.nav = []; // 네비게이션 배열 초기화
    pianoUser.soundPlayed = Array(pianoUser.space).fill(false); // 소리 플래그 초기화
    newLevel = false; // 새 레벨 상태 초기화
    timeOK = false; // 타이머 상태 초기화
    if (level > 2) {
      feedback = true;
    }
  }
}

//건반 navigate 전 타이머. 준비 시간.
let previousShowTimer = -1; // 초기값 설정 (타이머 범위에 없는 값)

function timer() {
  if (timeOK) return; // 타이머 완료 시 다시 실행하지 않음

  let elapsedTime = millis() - pianoNav.startTime;
  let showTimer = 3 - int(elapsedTime / 1000);

  if (showTimer > 0) {
    pianoUser.pressedKeys = [];

    fill(95, 75, 62);
    textAlign(CENTER, CENTER);
    textSize(32);
    strokeWeight(0);
    textFont(kossuyeom);
    text(showTimer, 410, 83);
    wait = true;

    // 이전 값과 현재 값 비교
    if (showTimer !== previousShowTimer) {
      count.play(); // showTimer 값이 바뀌었을 때만 실행
      previousShowTimer = showTimer; // 이전 값을 업데이트
    }
  } else {
    soundPlayed = false;
    timeOK = true; // 타이머 완료 상태
    pianoUser.pressedKeys = []; // 타이머 완료 시 눌린 키 초기화
  }
}

function updateScore(...expectedKeys) {
  pianoUser.pressedKeys = [...new Set(pianoUser.pressedKeys)]; // 중복 제거

  // `pressedKeys`와 `expectedKeys` 비교
  if (
    arraysEqual(pianoUser.pressedKeys, expectedKeys) &&
    !pianoUser.scoreIncreased
  ) {
    score += scoreNum * 10;
    hasChanged = true;
    pianoUser.scoreIncreased = true; // 점수 증가 플래그 설정
  }

  // 점수 업데이트 후 배열 초기화
  if (pianoUser.scoreIncreased) {
    pianoUser.pressedKeys = []; // 배열 초기화
  }
}
