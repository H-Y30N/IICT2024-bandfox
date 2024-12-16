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
    let numNotesToGenerate =
      simultaneousNoteChance < 0.4
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
  let finalScore = max(bassScore * 2 - missedNotes, 0);
  //textSize(32);
  //textAlign(CENTER, CENTER);
  //fill(255);
  //text("Your Score is", _width / 2, _height / 2 - 50);
  //text(`${finalScore}`, _width / 2, _height / 2);
  if (finalScore >= 100) bassFinal = 10;
  else if (finalScore >= 50) bassFinal = 5;
  else bassFinal = 0;

  //캐릭터들의 대사(요구 포함)가 들어가는 씬마다 여기서부터 다시 주석이 등장하는 곳까지
  //복사+붙여넣기 후, dialogues 안의 문구를 변경해 주세요.
  //추가한다면 "대사","대사", 식으로 더 넣으면 됩니다.

  //이전에 사용하던 대사의 참조 인덱스를 초기화합니다.
  if (currentDialogueIndex > dialogues.length && !isDisplaying) {
    currentDialogueIndex = 0;
    isDisplaying = false;
  } else {
  }
  image(bassIntroImage, width / 2, height / 2);
  //디버깅용. 위의 인덱스 초기화를 확인하기 위해 사용했습니다.
  //console.log(currentDialogueIndex);

  //여기에 해당 스테이지의 대사를 나열해주시면 됩니다.
  //그림과 겹치지 않게 줄바꿈을 해주세요. (\n을 사용합니다.)
  //줄바꿈 직후에 스페이스바가 있다면 정렬이 깨지니 유의해주세요.
  if (currentDialogueIndex <= 0) {
    image(dialogueFox, width / 2, height / 2);
  } else image(dialogueCopy, width / 2, height / 2);
  textSize(18);
  textFont(choice);
  fill(0);
  strokeWeight(0);
  if (bassFinal == 10) {
    dialogues = [
      "이런 멜로디는 어떤 것 같아?",
      "와!!! 완전 마음에 들어!! \n진짜 베이스도 엄청나게 화려할 수 있을 것 같아!",
      "이젠 아무도 베이스에서 소리가 안 난다고 못 놀릴 거야!\n여우야 고마워!",
      "맞아, 곡 만들고 있는 거 비스카차한테도 물어봤어?\n빨리 가서 물어봐야 할 거야!",
      "안그래도 잠깐 합주 쉬고 일광욕 하러 갈 장소를\n물색하고 있던데…….",
    ];
  } else if (bassFinal == 5) {
    dialogues = [
      "이런 멜로디는 어떤 것 같아?",
      "오, 나름 괜찮은 것 같아. \n이 정도면 그래도……. 안 들릴 정도는 아니네.",
      "친구들한테 베이스 소리 좀 잘 들어달라고 해야겠다.\n여우야 고마워!",
      "맞아, 곡 만들고 있는 거 비스카차한테도 물어봤어?\n빨리 가서 물어봐야 할 거야!",
      "안그래도 잠깐 합주 쉬고 일광욕 하러 갈 장소를\n물색하고 있던데…….",
    ];
  } else {
    dialogues = [
      "이런 멜로디는 어떤 것 같아?",
      "…….\n내가 진짜 이런 말은 안 하는데, 내 말 듣긴 한 거야?",
      "베이스에 너무 특색이 없잖아!\n이러다간 아무도 베이스 소리에 신경을 안 쓸 거라고!",
      "그나저나 곡 만들고 있는 거 비스카차한테도 물어봤어?\n빨리 가서 물어봐야 할 거야.",
      "안그래도 잠깐 합주 쉬고 일광욕 하러 갈 장소를\n물색하고 있던데…….",
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
    currentDialogueIndex > 0 &&
    currentCharIndex % 9 === 0 &&
    currentCharIndex < dialogues[currentDialogueIndex].length &&
    keyCode == ENTER &&
    !soundPlayed // 이미 재생된 경우 방지
  ) {
    if (currentDialogueIndex <= 0) {
      foxVoice.play();
    } else CopyVoice.play();
    soundPlayed = true; // 소리 재생 여부 설정
  }

  // 조건이 변할 때 플래그 초기화
  if (currentCharIndex % 9 !== 0 || keyCode !== ENTER) {
    soundPlayed = false; // 다시 재생 가능하도록 초기화
  }
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
