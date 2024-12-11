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
  }

  show() {
    fill(0);
    strokeWeight(4);
    rectMode(CORNER);
    push();
    translate(this.x, this.y);

    //테두리
    fill(255);

    stroke(0);
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
    fill(0);
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

    pop();
  }

  press() {
    let isKeyHandled = false;
    strokeWeight(0);

    for (let i = 0; i < this.space; i++) {
      text("A", 310, 400);
      text("S", 355, 400);
      text("D", 400, 400);
      text("F", 440, 400);
      text("G", 485, 400);
      text("H", 530, 400);
      text("J", 575, 400);

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

        // `pressedKeys` 배열에 현재 키가 없으면 추가
        if (!this.pressedKeys.includes(i)) {
          this.pressedKeys.push(i);
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
        fill(0, 0, 0, 100);
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
  pianoNav.show();
  pianoUser.show();
  pianoUser.press();
  image(img[1], 20, 240, 184, 225);
  image(img[2], 430, 20, 177, 211);

  if (newLevel) {
    pianoNav.startTime = millis();
    pianoUser.scoreIncreased = false; // 점수 증가 플래그 초기화
    pianoNav.nav = []; // 네비게이션 배열 초기화
    pianoUser.soundPlayed = Array(pianoUser.space).fill(false); // 소리 플래그 초기화
    newLevel = false; // 새 레벨 상태 초기화
    timeOK = false; // 타이머 상태 초기화
  }
}

//건반 navigate 전 타이머. 준비 시간. 오류 때문에 주석 처리해둠.
function timer() {
  if (timeOK) return; // 타이머 완료 시 다시 실행하지 않음

  let elapsedTime = millis() - pianoNav.startTime;
  let showTimer = 3 - int(elapsedTime / 1000);

  if (showTimer > 0) {
    textSize(32);

    strokeWeight(0);
    text(showTimer, 400, 100);
  } else {
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

    pianoUser.scoreIncreased = true; // 점수 증가 플래그 설정
  }

  // 점수 업데이트 후 배열 초기화
  if (pianoUser.scoreIncreased) {
    pianoUser.pressedKeys = []; // 배열 초기화
  }
}
