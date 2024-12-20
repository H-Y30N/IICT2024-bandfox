//텍스트 관련 전역변수
let dialogues = [];
let currentDialogueIndex = 0; // 현재 대화 배열의 인덱스
let displayedText = ""; // 현재까지 화면에 표시된 텍스트
let currentCharIndex = 0; // 현재 대화의 문자 인덱스
let isDisplaying = false; // 현재 텍스트 출력 중인지 여부
let sceneChange = false;
let soundPlayed = false;

let stage = 0;

//엔딩용 점수 관련 전역변수
let drumFinal; //드럼 최종 스코어
let bassFinal; //베이스 최종 스코어
let keyboardFinal; //키보드 최종 스코어
let guitarFinal; //기타 최종 스코어
let bearResult = "";
let copyResult = "";
let rabbitResult = "";
let catResult = "";
let finalResult = [];
let finalOut = [];

//게임 중에는 넘어가지 않게 하는 boolean. 각 파이널 스코어가 정산되어야 엔터가 먹히게 합니다.
let gaming = false;

//이미지 파일
let openingImage; //오프닝
let gameIntroImage; //인트로 이미지
let drumIntroImage; //드럼 인트로 이미지
let bassIntroImage; //베이스 인트로이미지
let keyboardIntroImage; //키보드 인트로 이미지
let guitarIntroImage; // 기타 인트로 이미지
let vocalFox; // 여우 이미지
let drumBear; // 곰 이미지
let bassCapy; //카피바라 이미지
let keyboardRabbit; //토끼 이미지
let guitarCat; //고양이 이미지
let backgroundImage; //기본 배경
let everyone;
let bassBackground;
let lastFox;
let lastCat;
let lastBear;
let lastRabbit;
let lastCopy;

//대사창 파일
let dialogueFox;
let dialogueBear;
let dialogueCat;
let dialogueCopy;
let dialogueRabbit;

//사운드 파일
let song = [];
let songPlay = false;
let foxVoice;
let bearVoice;
let rabbitVoice;
let catVoice;
let copyVoice;
let bassSlap;

let saying = false;

//드럼 관련 전역변수
let snareImage;
let practiceGame;
let realGame;
let isInPracticeMode = true;
let drumPractice; // 드럼 연습 이미지
let drumPracticeStart;
let drumPracticeComplete;
let drumSize = false;
let drumDifferent = 0;

//베이스 관련 전역변수
let notes = [];
let strings = [120, 200, 300, 400]; // 줄의 위치 (y좌표)
let bassScore = 0;
let bassLevel = 0;
let missedNotes = 0; // 놓친 노트 개수
let retryLevel = 0; // 실패한 레벨을 기억하는 변수
let bassEx; //베이스 게임 설명 이미지
let feedbackText = "";
let feedbackTimer = 0;
let gameTimer = 0;
let gameDuration = 2400;

//키보드 관련 전역변수
let score = 0;
let level = 1;
let newLevel = false;
let _width = 640;
let _height = 480;
let piano = [];
let img = [];
let timeOK = false;
let scoreNum = 0;
let wait = false;
let feedback = false;
let hasChanged = false;
let keyboardEx; //키보드 게임 설명 이미지

//기타 관련 전역변수
let pointOfGuitar = 0; // 점수
let rects = []; // 빨간 네모들의 정보 저장
let guitarWidth; // 기타 줄 넓이
let guitarHeight; // 기타 줄 높이
let handPose;
let video;
let hands = []; // 손 데이터 저장
let scoreIncrementedRects = []; // 점수 증가 여부 체크 배열
let startTimeOfguitar; // 시작 시간
let guitarPick; // 기타 피크 이미지
let handHere; // 손 이미지
let guitarRect; //기타 게임용 이미지
let guitarEntireImage; //기타 전체 이미지
let guitarEx; //기타 설명 이미지
let guitarEffect; //기타 이펙트 소리

let filteredHands = []; // 손 위치를 필터링한 데이터

function preload() {
  // Load handPose
  handPose = ml5.handPose();
  // Load Images
  openingImage = loadImage("assets/opening.png");
  gameIntroImage = loadImage("assets/gameIntro.jpg");
  gameIntroImage2 = loadImage("assets/gameIntro2.jpg");
  drumIntroImage = loadImage("assets/drumIntro.jpg");
  bassIntroImage = loadImage("assets/bassIntro.jpg");
  keyboardIntroImage = loadImage("assets/keyboardIntro.jpg");
  guitarIntroImage = loadImage("assets/guitarIntro.jpg");
  scoreImage = loadImage("assets/scoreImage.jpg");
  vocalFox = loadImage("assets/vocalFox.png");
  drumBear = loadImage("assets/drumBear.png");
  bassCapy = loadImage("assets/bassCapy.png");
  keyboardRabbit = loadImage("assets/keyboardRabbit.png");
  guitarCat = loadImage("assets/guitarCat.png");
  handHere = loadImage("assets/handHere.png");
  guitarPick = loadImage("assets/guitarPick.png");
  guitarRect = loadImage("assets/guitarRect.png");
  guitarEntireImage = loadImage("assets/guitarEntireImage.png");
  backgroundImage = loadImage("assets/backgroundImage.png");
  drumEx = loadImage("assets/drumEx.png");
  keyboardEx = loadImage("assets/keyboardEx.png");
  bassEx = loadImage("assets/bassEx.png");
  guitarEx = loadImage("assets/guitarEx.png");
  everyone = loadImage("assets/everyone.png");
  bassBackground = loadImage("assets/bassBackground.png");
  ending = loadImage("assets/ending.png");

  drumPractice = loadImage("assets/drumPractice.png");
  drumPracticeStart = loadImage("assets/drumPracticeStart.png");
  drumPracticeComplete = loadImage("assets/drumPracticeComplete.png");

  dialogueFox = loadImage("assets/dialogueFox.png");
  dialogueBear = loadImage("assets/dialogueBear.png");
  dialogueCat = loadImage("assets/dialogueCat.png");
  dialogueCopy = loadImage("assets/dialogueCopy.png");
  dialogueRabbit = loadImage("assets/dialogueRabbit.png");

  lastBear = loadImage("assets/lastBear.png");
  lastFox = loadImage("assets/lastFox.png");
  lastCat = loadImage("assets/lastCat.png");
  lastCopy = loadImage("assets/lastCopy.png");
  lastRabbit = loadImage("assets/lastRabbit.png");

  //loadfonts
  kossuyeom = loadFont("assets/kossuyeom.otf");
  choice = loadFont("assets/elandChoiceM.ttf");

  //키보드 관련 프리로드
  for (let i = 0; i < 7; i++) {
    piano[i] = loadSound(`assets/piano_${i}.wav`);
  }
  for (let i = 0; i < 4; i++) {
    img[i] = loadImage(`assets/img${i}.png`);
  }

  //드럼 관련 프리로드
  snareImage = loadImage("assets/snare.png");
  drumImage = loadImage("assets/drum.png");
  drumSnare = loadSound("assets/drumSnare.wav");

  //마지막에 나오는 노래
  for (let i = 0; i < 16; i++) {
    song[i] = loadSound(`assets/song${i}.wav`);
  }

  //sfx
  click = loadSound("assets/click.wav");
  correct = loadSound("assets/correct.wav");
  foxVoice = loadSound("assets/foxVoice.mp3");
  bearVoice = loadSound("assets/bearVoice.wav");
  rabbitVoice = loadSound("assets/rabbitVoice.ogg");
  copyVoice = loadSound("assets/copyVoice.wav");
  catVoice = loadSound("assets/catVoice.mp3");
  hmmSound = loadSound("assets/hmmSound.mp3");
  count = loadSound("assets/count.mp3");
  bassSlap = loadSound("assets/bassSlap2.wav");
  guitarEffect = loadSound("assets/guitarEffect.wav");

  //bgm 관련 세팅
  bgm = loadSound("assets/bgm.mp3");
  bgmPlaying = false;
  env = new p5.Envelope();
  env.setADSR(0.1, 0.2, 0.5, 3); // Attack: 0.1s, Decay: 0.2s, Sustain: 0.5, Release: 3s
  env.setRange(1, 0.2); // 시작 볼륨: 1, 최저 볼륨: 0.2
}

function setup() {
  createCanvas(640, 480);

  //드럼 관련 세팅
  practiceGame = new PracticeMode();
  realGame = new DrumGame();

  //키보드 관련 세팅
  pianoNav = new PianoRoll(40, 60, 240, 160, piano);
  pianoUser = new PianoRoll(300, 250, 300, 200, piano);

  //기타 관련 세팅
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  handPose.detectStart(video, gotHands);
  guitarHeight = 76;
  guitarWidth = 93;
  generateRects(); // 초기 네모 생성
}

function draw() {
  //console.log(drumFinal, bassFinal, keyboardFinal, guitarFinal);

  textFont(kossuyeom);
  switch (stage) {
    case 0: //Opening
      stageChange = true;
      imageMode(CORNER);
      image(openingImage, 0, 0);
      fill(255);
      stroke(192, 140, 43);
      strokeWeight(10);
      textSize(40);
      textAlign(CENTER, CENTER);
      text("밴드맨으로\n살아남기", 150, height / 2 - 100);
      strokeWeight(0);
      textSize(14);
      fill(126, 105, 87);
      textFont(choice);
      text("계속하려면 ENTER 키를 누르세요.", 150, height / 2 - 20);

      //initializeScene();

      sceneChange = true;

      break;

    case 1: //Game Intro
      //console.log(currentDialogueIndex);

      if (sceneChange) {
        initializeDialogue();
        sceneChange = false;
        //console.log("대화 초기화");
      }
      if (
        currentDialogueIndex == 1 ||
        currentDialogueIndex == 10 ||
        currentDialogueIndex == 11
      )
        image(gameIntroImage2, 0, 0);
      else image(gameIntroImage, 0, 0);

      fill(0);
      textSize(18);
      textFont(choice);
      dialogues = [
        "안녕! 나는 여우. \n락의 피가 들끓는 락앤롤한 여우지.",
        "꼭 밴드로 성공해서,여우가 “하티하티 하티호!”라고만\n울지는 않는다는 사실을 전세계에 증명할거야!",
        "우리 밴드를 소개해줄게! \n여기는 우리 밴드 멤버들이야.",
        "드러머 북극곰! \n북극에서 온 진짜 야생 드러머야. 실력 하나만큼은 확실하다구.", //3 곰
        "베이시스트 카피바라! \n어디서나 존재감이 드러나는 인싸 of 인싸. 취미는 탑 쌓기래.", //4 카피바라
        "기타리스트 고양이! \n어디로 튈지 모를 4차원 매력의 소유자랄까? 가장 좋아하는 간식은 츄르.", //5 고양이
        "그리고 키보디스트 비스카차. \n언제나 선글라스를 가지고 다니는 멋쟁이지!", //6 토끼
        "마지막으로 보컬이자 프론트맨인 나, \n여우가 있어.", //7 여우
        "이 각박한 인간 중심 사회에서, \n우리가 동물 밴드로 잘 해나갈 수 있도록 응원해 줘!",
        "멋진 밴드가 되려면 먼저 자작곡을 쓸 줄 알아야 해.\n그래서 곡을 만들고 있는데…….",
        "멤버들의 개성과 취향이 전부 강해서 큰일이네.",
        "모두의 취향을 만족시킬 수 있는 곡이 아니라면 \n음악적 견해를 이유로 밴드가 해체되어버릴 수도 있으니까.",
        "내가 모두의 의견에 귀를 기울여서, \n모두가 즐겁게 연주할 수 있는 곡을 만들 수 있게 도와줘!",
        "앗, 저기 북극곰이 오네. \n뭔가 하고 싶은 말이 있나 봐.",
      ];

      //동물들 이미지 제시 --> 좌표 수정했습니다!
      if (currentDialogueIndex == 3) {
        //북극곰
        image(drumBear, 0, 0);
      } else if (currentDialogueIndex == 4) {
        //카피바라
        image(bassCapy, 0, 0);
      } else if (currentDialogueIndex == 5) {
        //고양이
        image(guitarCat, 0, 0);
      } else if (currentDialogueIndex == 6) {
        //카피바라
        image(keyboardRabbit, 0, 0);
      } else if (currentDialogueIndex == 7) {
        //여우
        image(vocalFox, 0, 0);
      } else if (currentDialogueIndex == 8) {
        //전체 등장
        image(everyone, -10, -10);
      } else if (currentDialogueIndex == 12) {
        env.triggerRelease();
      }

      //대사창
      image(dialogueFox, 0, 0);

      if (currentDialogueIndex == 0) {
        text(dialogues[0], width / 2, height - 70);
      } else text(displayedText, width / 2, height - 70);

      //목소리 재생
      if (
        currentDialogueIndex >= 0 &&
        currentCharIndex % 9 === 0 &&
        currentCharIndex < dialogues[currentDialogueIndex].length &&
        keyCode == ENTER &&
        !soundPlayed // 이미 재생된 경우 방지
      ) {
        foxVoice.play();
        soundPlayed = true; // 소리 재생 여부 설정
      }

      // 조건이 변할 때 플래그 초기화
      if (currentCharIndex % 9 !== 0 || keyCode !== ENTER) {
        soundPlayed = false; // 다시 재생 가능하도록 초기화
      }

      break;

    case 2: //drum Intro
      image(drumIntroImage, 0, 0);

      //캐릭터들의 대사(요구 포함)가 들어가는 씬마다 여기서부터 다시 주석이 등장하는 곳까지
      //복사+붙여넣기 후, dialogues 안의 문구를 변경해 주세요.
      //추가한다면 "대사","대사", 식으로 더 넣으면 됩니다.

      //이전에 사용하던 대사의 참조 인덱스를 초기화합니다.
      if (currentDialogueIndex > dialogues.length && !isDisplaying) {
        currentDialogueIndex = 0;
        isDisplaying = false;
        initializeDialogue();
      } else {
      }

      //디버깅용. 위의 인덱스 초기화를 확인하기 위해 사용했습니다.
      //console.log(currentDialogueIndex);

      //여기에 해당 스테이지의 대사를 나열해주시면 됩니다.
      //그림과 겹치지 않게 줄바꿈을 해주세요. (\n을 사용합니다.)
      //줄바꿈 직후에 스페이스바가 있다면 정렬이 깨지니 유의해주세요.
      image(dialogueBear, 0, 0);
      textSize(18);
      textFont(choice);
      dialogues = [
        "야, 너 곡을 쓸 거라고 했지? \nBPM은 북극의 얼음이 녹는 속도에 맞춰 줘.",
        "지금도 고향이 녹고 있을 걸 생각하면 가슴이 답답해지니까,",
        "그 한을 음악으로 풀어야겠어! 드럼 한 번 제대로 쳐보자고!",
        "어때? 할 수 있지?",
      ];

      //첫 대사는 엔터키 입력(bassClass에서 담당) 없이도 출력되게 합니다.
      if (currentDialogueIndex == 0) {
        text(dialogues[0], width / 2, height - 70);
        //첫 대사가 아니라면 엔터키를 누를 때마다 다음 배열의 대사를 업데이트합니다.
      } else text(displayedText, width / 2, height - 70);

      if (
        currentDialogueIndex >= 0 &&
        currentCharIndex % 9 === 0 &&
        currentCharIndex < dialogues[currentDialogueIndex].length &&
        keyCode == ENTER &&
        !soundPlayed // 이미 재생된 경우 방지
      ) {
        bearVoice.play();
        soundPlayed = true; // 소리 재생 여부 설정
      }

      // 조건이 변할 때 플래그 초기화
      if (currentCharIndex % 9 !== 0 || keyCode !== ENTER) {
        soundPlayed = false; // 다시 재생 가능하도록 초기화
      }

      sceneChange = true;
      break;

    case 3: //Drum Game Explanation
      imageMode(CORNER);
      image(drumEx, 0, 0);
      break;

    case 4: //Drum Game
      textFont(kossuyeom);
      background(220);
      strokeWeight(2);
      if (isInPracticeMode) {
        practiceGame.display();
      } else {
        realGame.display();
      }

      //console.log(realGame.averageBPM.toFixed(2)); //잘 작동함
      //console.log(realGame.missionGuage.targetBPM);
      //console.log("drumdiffernt" + drumDifferent);

      if (realGame.isGameOver) {
        if (drumDifferent <= 20) drumFinal = 10;
        else if (drumDifferent > 20 && drumDifferent < 50) drumFinal = 5;
        else if (drumDifferent >= 50) drumFinal = 0;
      }

      break;

    case 5: //bass intro
      imageMode(CORNER);
      image(bassIntroImage, 0, 0);
      //캐릭터들의 대사(요구 포함)가 들어가는 씬마다 여기서부터 다시 주석이 등장하는 곳까지
      //복사+붙여넣기 후, dialogues 안의 문구를 변경해 주세요.
      //추가한다면 "대사","대사", 식으로 더 넣으면 됩니다.

      if (sceneChange) {
        initializeDialogue();
        sceneChange = false;
        //console.log("대화 초기화");
      }

      //디버깅용. 위의 인덱스 초기화를 확인하기 위해 사용했습니다.
      //console.log(currentDialogueIndex);

      //여기에 해당 스테이지의 대사를 나열해주시면 됩니다.
      //그림과 겹치지 않게 줄바꿈을 해주세요. (\n을 사용합니다.)
      //줄바꿈 직후에 스페이스바가 있다면 정렬이 깨지니 유의해주세요.
      image(dialogueCopy, 0, 0);
      textSize(18);
      textFont(choice);
      fill(0);
      strokeWeight(0);
      dialogues = [
        "여우야! 네가 생각해도 역시\n베이스가 짱이지?",
        "우리 곡에서 베이스의 멋짐을\n제대로 보여줬으면 좋겠어!",
        "공연 때 친구들이 엄청 많이\n온다고 했단 말이야.",
        "베이스에서도 제대로 멋진 소리가\n난다는 사실을 모두에게 들려줄거야!",
      ];

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
        copyVoice.play();
        soundPlayed = true; // 소리 재생 여부 설정
      }

      // 조건이 변할 때 플래그 초기화
      if (currentCharIndex % 9 !== 0 || keyCode !== ENTER) {
        soundPlayed = false; // 다시 재생 가능하도록 초기화
      }

      break;

    case 6: // bass explanation
      image(bassEx, 0, 0);
      break;

    case 7: // bass game
      background(0);
      image(bassBackground, 0, 0);
      switch (bassLevel) {
        case 0: // 게임 오프닝 화면
          strokeWeight(3);
          stroke(0);
          textAlign(CENTER, CENTER);
          textSize(30);
          text("BASS MINI GAME", _width / 2, _height / 2 - 50);
          fill(100);
          text("Press Space to Start", _width / 2, 300);

          // 스페이스바 입력으로 게임 시작
          if (keyIsPressed && keyCode === 32) {
            bassLevel = 4; // 레벨 2 시작
            resetLevel();
          }
          break;

        /*case 2: // 레벨 1: 쉬운 난이도
          playLevel(100, 2, 1.3);
          if (gameTimer >= gameDuration) { // 10초 후 레벨 업
            bassLevel = 4; // 레벨 2로 이동
            
          }
          break;*/

        case 4: // 레벨 2: 중간 난이도
          playLevel(80, 3, 1.6);
          if (gameTimer >= 1800) {
            // 30초 후 레벨 업
            bassLevel = 6; // 레벨 3로 이동
          }
          break;

        case 6: // 레벨 3: 어려운 난이도
          playLevel(60, 4, 2);
          if (gameTimer > gameDuration) {
            // 10초 후 게임 종료
            bassLevel = 7; // 엔딩 화면으로 이동
          }
          break;

        case 7: // 엔딩 화면
          displayEndingScreen(); // 최종 점수 표시
          // 5초 후 다음 스테이지로 이동
          /*
          if (frameCount % 300 === 0) {
            currentStage++; // 다음 스테이지로 이동
          }
            */
          break;
      }
      break;

    case 8: //keyboard intro
      console.log(stage);
      image(keyboardIntroImage, 0, 0);

      //캐릭터들의 대사(요구 포함)가 들어가는 씬마다 여기서부터 다시 주석이 등장하는 곳까지
      //복사+붙여넣기 후, dialogues 안의 문구를 변경해 주세요.
      //추가한다면 "대사","대사", 식으로 더 넣으면 됩니다.

      //이전에 사용하던 대사의 참조 인덱스를 초기화합니다.
      if (currentDialogueIndex > dialogues.length && !isDisplaying) {
        currentDialogueIndex = 0;
        isDisplaying = false;
      } else {
      }

      //디버깅용. 위의 인덱스 초기화를 확인하기 위해 사용했습니다.
      //console.log(currentDialogueIndex);

      //여기에 해당 스테이지의 대사를 나열해주시면 됩니다.
      //그림과 겹치지 않게 줄바꿈을 해주세요. (\n을 사용합니다.)
      //줄바꿈 직후에 스페이스바가 있다면 정렬이 깨지니 유의해주세요.
      if (currentDialogueIndex <= 2) {
        image(dialogueRabbit, 0, 0);
      } else image(dialogueFox, 0, 0);
      textSize(18);
      textFont(choice);
      fill(0);
      strokeWeight(0);
      dialogues = [
        "최고의 일광욕을 위해 떠남!\n합주는 돌아와서 합류 예정!",
        "……이라는 쪽지 한 장과 선글라스만 남아 있다.",
        "이런! \n야생의 비스카차(이)가 펑크를 내고 도망가버렸다!",
        "이런 키보디스트라도, \n프론트맨이 된 도리로 품어줘야겠지…….",
      ];

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
        if (currentDialogueIndex <= 2) {
          rabbitVoice.play();
        } else foxVoice.play();
        soundPlayed = true; // 소리 재생 여부 설정
      }

      // 조건이 변할 때 플래그 초기화
      if (currentCharIndex % 9 !== 0 || keyCode !== ENTER) {
        soundPlayed = false; // 다시 재생 가능하도록 초기화
      }

      break;

    case 9: //keyboard game explanation
      console.log(stage);
      image(keyboardEx, 0, 0);
      break;

    case 10: //keyboard game
      background(252, 237, 168);
      textSize(25);
      textAlign(LEFT, CENTER);
      strokeWeight(0);
      fill(0);
      text("score:" + score, 50, 25);

      switch (level) {
        case 1:
          fill(255);
          strokeWeight(3);
          stroke(102, 98, 91);
          textAlign(CENTER, CENTER);
          text("준비 됐어?", _width / 2, _height / 2 - 10);
          text("시작하려면 Space를 눌러 보자!", _width / 2, _height / 2 + 10);
          textSize(10);

          //스페이스바 눌러서 시작
          if (keyIsPressed && keyCode == 32) {
            level++;
            newLevel = true;
          }
          break;

        case 2:
          initialize();
          timer();

          pianoNav.navigate(1, 5, 2);
          scoreNum = 1;

          if (pianoUser.pressedKeys.length == 3 && !mouseIsPressed) {
            ready = false;
            updateScore(1, 5, 2);
            level++;
            newLevel = true;
          }

          break;

        case 3:
          initialize();
          timer();

          pianoNav.navigate(3, 6, 0);

          if (pianoUser.pressedKeys.length == 3) {
            ready = false;
            updateScore(3, 6, 0);
            level++;
            newLevel = true;
          }
          break;

        case 4:
          initialize();
          timer();

          pianoNav.navigate(2, 3, 4);

          if (pianoUser.pressedKeys.length == 3) {
            updateScore(2, 3, 4);
            level++;
            newLevel = true;
          }
          break;

        case 5:
          initialize();
          timer();

          pianoNav.navigate(1, 3, 5, 6);
          scoreNum = 2;

          if (pianoUser.pressedKeys.length == 4) {
            updateScore(1, 3, 5, 6);
            level++;
            newLevel = true;
          }
          break;

        case 6:
          initialize();
          timer();

          pianoNav.navigate(5, 0, 4, 2);

          if (pianoUser.pressedKeys.length == 4) {
            updateScore(5, 0, 4, 2);
            level++;
            newLevel = true;
          }
          break;

        case 7:
          initialize();
          timer();

          pianoNav.navigate(6, 3, 2, 4, 0);
          scoreNum = 3;

          if (pianoUser.pressedKeys.length == 5) {
            updateScore(6, 3, 2, 4, 0);
            level++;
            newLevel = true;
          }
          break;

        case 8:
          if (score >= 70) {
            //text("GOOD JOB", width / 2, height / 2);
            keyboardFinal = 10;
          } else if (30 <= score && score < 70) {
            //text("NOT BAD", width / 2, height / 2);
            keyboardFinal = 5;
          } else if (score < 30) {
            //text("FXXK YOU", width / 2, height / 2);
            keyboardFinal = 0;
          }
          //캐릭터들의 대사(요구 포함)가 들어가는 씬마다 여기서부터 다시 주석이 등장하는 곳까지
          //복사+붙여넣기 후, dialogues 안의 문구를 변경해 주세요.
          //추가한다면 "대사","대사", 식으로 더 넣으면 됩니다.

          //이전에 사용하던 대사의 참조 인덱스를 초기화합니다.
          if (currentDialogueIndex > dialogues.length && !isDisplaying) {
            currentDialogueIndex = 0;
            isDisplaying = false;
          } else {
          }
          imageMode(CENTER);
          image(keyboardIntroImage, width / 2, height / 2);
          //디버깅용. 위의 인덱스 초기화를 확인하기 위해 사용했습니다.
          //console.log(currentDialogueIndex);

          //여기에 해당 스테이지의 대사를 나열해주시면 됩니다.
          //그림과 겹치지 않게 줄바꿈을 해주세요. (\n을 사용합니다.)
          //줄바꿈 직후에 스페이스바가 있다면 정렬이 깨지니 유의해주세요.
          if (currentDialogueIndex <= 0) {
            imageMode(CENTER);
            image(dialogueFox, width / 2, height / 2);
          } else imageMode(CENTER);
          image(dialogueRabbit, width / 2, height / 2);
          textSize(18);
          textFont(choice);
          fill(0);
          strokeWeight(0);
          if (keyboardFinal == 10) {
            dialogues = [
              "비스카차에게는 전화로 작곡한 곡을 들려주기로 했다.",
              "(뚜르르……. 뚜르르…….)",
              "응? 무슨 일이야? 아, 곡 만들고 있구나!\n흠, 이 정도면 돌아가서 금방 익힐 거야, 나도!",
              "가성비 좋게 잘 만들었네.\n역시 여우야!",
              "그나저나 기타한테도 물어봤어?\n걔도 어지간한 기분파인데, 잘 맞춰 봐.",
              "나는 다시 일광욕 하러 이만!",
            ];
          } else if (keyboardFinal == 5) {
            dialogues = [
              "비스카차에게는 전화로 작곡한 곡을 들려주기로 했다.",
              "(뚜르르……. 뚜르르…….)",
              "응? 무슨 일이야? 아, 곡 만들고 있구나!\n뭐, 좀 까다롭긴 하지만 못 칠 정도는 아니네.",
              "돌아가서 연습 좀 해봐야겠는걸?",
              "그나저나 기타한테도 물어봤어?\n걔도 어지간한 기분파인데, 잘 맞춰 봐.",
              "나는 다시 일광욕 하러 이만!",
            ];
          } else {
            dialogues = [
              "비스카차에게는 전화로 작곡한 곡을 들려주기로 했다.",
              "(뚜르르……. 뚜르르…….)",
              "응? 무슨 일이야? 아, 곡 만들고 있구나!\n……그런데 이건 좀 아니지 않아?",
              "어떻게 해도 내가 따라잡기 어려운 난이도잖아?\n나만 여기 와있다고 따돌리는 거 아니지?",
              "그나저나 기타한테도 물어봤어?\n걔도 어지간한 기분파인데, 잘 맞춰 봐.",
              "나는 다시 일광욕 하러 이만!",
            ];
          }
          //첫 대사는 엔터키 입력(bassClass에서 담당) 없이도 출력되게 합니다.
          textAlign(CENTER, CENTER);
          if (currentDialogueIndex == 0) {
            textAlign(CENTER, CENTER);
            text(dialogues[0], width / 2, height - 70);
            //첫 대사가 아니라면 엔터키를 누를 때마다 다음 배열의 대사를 업데이트합니다.
          } else textAlign(CENTER, CENTER);
          text(displayedText, width / 2, height - 70);
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
            } else rabbitVoice.play();
            soundPlayed = true; // 소리 재생 여부 설정
          }

          // 조건이 변할 때 플래그 초기화
          if (currentCharIndex % 9 !== 0 || keyCode !== ENTER) {
            soundPlayed = false; // 다시 재생 가능하도록 초기화
          }
      }
      break;

    case 11: //guitar intro
      console.log(stage);
      imageMode(CORNER);
      image(guitarIntroImage, 0, 0);

      //캐릭터들의 대사(요구 포함)가 들어가는 씬마다 여기서부터 다시 주석이 등장하는 곳까지
      //복사+붙여넣기 후, dialogues 안의 문구를 변경해 주세요.

      //이전에 사용하던 대사의 참조 인덱스를 초기화합니다.
      if (currentDialogueIndex > dialogues.length && !isDisplaying) {
        currentDialogueIndex = 0;
        isDisplaying = false;
      } else {
      }

      //디버깅용. 위의 인덱스 초기화를 확인하기 위해 사용했습니다.
      //console.log(currentDialogueIndex);

      //여기에 해당 스테이지의 대사를 나열해주시면 됩니다.
      //그림과 겹치지 않게 줄바꿈을 해주세요. (\n을 사용합니다.)
      //줄바꿈 직후에 스페이스바가 있다면 정렬이 깨지니 유의해주세요.
      image(dialogueCat, 0, 0);
      textSize(18);
      textFont(choice);
      fill(0);
      strokeWeight(0);
      dialogues = [
        "이봐, 곡을 쓴다고 들었어. \n다만 나는 음악 신동이니까,",
        "내가 지금 연습할 필요는 못 느끼겠어.",
        "네가 나 대신 손으로 연습 좀 해!",
      ];

      //첫 대사는 엔터키 입력(bassClass에서 담당) 없이도 출력되게 합니다.
      if (currentDialogueIndex == 0) {
        text(dialogues[0], width / 2, height - 70);
        //첫 대사가 아니라면 엔터키를 누를 때마다 다음 배열의 대사를 업데이트합니다.
      } else text(displayedText, width / 2, height - 70);
      textAlign(CENTER, CENTER);
      //여기까지 복사하시면 됩니다.

      if (
        currentDialogueIndex >= 0 &&
        currentCharIndex % 9 === 0 &&
        currentCharIndex < dialogues[currentDialogueIndex].length &&
        keyCode == ENTER &&
        !soundPlayed // 이미 재생된 경우 방지
      ) {
        catVoice.play();
        soundPlayed = true; // 소리 재생 여부 설정
      }

      // 조건이 변할 때 플래그 초기화
      if (currentCharIndex % 9 !== 0 || keyCode !== ENTER) {
        soundPlayed = false; // 다시 재생 가능하도록 초기화
      }
      break;

    case 12: //guitar ex
      console.log(stage);
      image(guitarEx, 0, 0);
      break;

    case 13: // how to play guitar
      image(backgroundImage, 0, 0);
      //image(guitarEntireImage, 0, height / 2 - 200);
      textSize(24);
      textAlign(CENTER, CENTER);
      fill(255);
      stroke(90);
      strokeWeight(3);
      text(
        "카메라에 손을 대봐\n기타 피크로 연주하는 거야! \n준비되면 ENTER를 눌러!",
        width / 2,
        height / 2 - 120
      );

      image(handHere, width / 2 - 200, height / 2 - 30);
      image(guitarPick, width / 2 - 70, height / 2 - 70);
      // 손 데이터 필터링 (lerp 적용)
      filteredHands = hands.map((hand) => {
        return {
          keypoints: hand.keypoints.map((kp, idx) => {
            if (!filteredHands[idx]) {
              return { x: kp.x, y: kp.y, score: kp.score };
            }
            return {
              x: lerp(filteredHands[idx]?.x || kp.x, kp.x, 0.2),
              y: lerp(filteredHands[idx]?.y || kp.y, kp.y, 0.2),
              score: kp.score,
            };
          }),
        };
      });

      // 비디오와 손가락 시각화 (대기 시간 포함)
      push();
      translate(width, 0);
      scale(-1, 1);

      for (let i = 0; i < filteredHands.length; i++) {
        let hand = filteredHands[i];

        // 손가락 위치 순회
        if (hand.keypoints) {
          // 손가락 마디를 선으로 연결
          stroke(0);
          strokeWeight(3);
          noFill();

          beginShape();
          for (let j = 0; j < hand.keypoints.length; j++) {
            let keypoint = hand.keypoints[j];

            // 신뢰도가 낮은 점은 시각화하지 않음
            if (keypoint.score < 0.5) continue;

            let xPos = keypoint.x; // 비디오 좌표계
            let yPos = keypoint.y;

            curveVertex(xPos, yPos);

            // 두 번째 손가락(검지손가락)에 기타피크 이미지 표시
            if (j === 8) {
              imageMode(CENTER);
              image(guitarPick, xPos, yPos);
            }
          }
          endShape();
        }
      }
      pop();

      break;

    case 14: //guitar game
      if (!startTimeOfguitar) {
        startTimeOfguitar = millis(); // 게임 시작 시 시간을 초기화
      }

      // 손 데이터 필터링 (lerp 적용)
      filteredHands = hands.map((hand) => {
        return {
          keypoints: hand.keypoints.map((kp, idx) => {
            if (!filteredHands[idx]) {
              return { x: kp.x, y: kp.y, score: kp.score };
            }
            return {
              x: lerp(filteredHands[idx]?.x || kp.x, kp.x, 0.2),
              y: lerp(filteredHands[idx]?.y || kp.y, kp.y, 0.2),
              score: kp.score,
            };
          }),
        };
      });

      // 비디오와 손가락 시각화 (대기 시간 포함)
      push();
      translate(width, 0);
      scale(-1, 1);

      image(video, 0, 0);

      for (let i = 0; i < filteredHands.length; i++) {
        let hand = filteredHands[i];

        // 손가락 위치 순회
        if (hand.keypoints) {
          // 손가락 마디를 선으로 연결
          stroke(0);
          strokeWeight(3);
          noFill();

          beginShape();
          for (let j = 0; j < hand.keypoints.length; j++) {
            let keypoint = hand.keypoints[j];

            // 신뢰도가 낮은 점은 시각화하지 않음
            if (keypoint.score < 0.5) continue;

            let xPos = keypoint.x; // 비디오 좌표계
            let yPos = keypoint.y;

            curveVertex(xPos, yPos);

            // 두 번째 손가락(검지손가락)에 기타피크 이미지 표시
            if (j === 8) {
              imageMode(CENTER);
              image(guitarPick, xPos, yPos);
            }
          }
          endShape();
        }
      }
      pop();

      // 시간 체크
      let elapsedTime = (millis() - startTimeOfguitar) / 1000;

      // 대기 시간 5초 동안 타이머 표시
      if (elapsedTime < 5) {
        textSize(32);
        textAlign(CENTER, CENTER);
        fill(0);
        text(
          "Starting in: " + int(nf(5 - elapsedTime, 1, 1)) + "s",
          width / 2,
          height / 2
        );
        text("곧 게임이 시작돼!", width / 2, 30);
        return; // 5초가 지나기 전에는 아래 코드를 실행하지 않음
      }

      let gameElapsedTime = elapsedTime - 5; // 5초 대기 시간을 제외한 실제 게임 시간

      // 스테이지 변경 조건
      if (gameElapsedTime >= 30) {
        stage = 15;
        return;
      }

      // 2초마다 네모 위치 변경
      if (frameCount % 120 === 0) {
        rectMode(CORNER);
        generateRects(); // 네모 재생성
      }

      for (let i = 0; i < filteredHands.length; i++) {
        let hand = filteredHands[i];

        // 손가락 위치 순회
        if (hand.keypoints) {
          for (let j = 0; j < hand.keypoints.length; j++) {
            let keypoint = hand.keypoints[j];

            // 신뢰도가 낮은 점은 충돌 체크하지 않음
            if (keypoint.score < 0.5) continue;

            let xPos = keypoint.x; // 비디오 좌표계
            let yPos = keypoint.y;

            // 두 번째 손가락(검지손가락) 충돌 체크
            if (j === 8) {
              let actualXPos = width - xPos;

              // 각 빨간 네모와 충돌 체크
              for (let k = 0; k < rects.length; k++) {
                let rectData = rects[k];
                let padding = 10;
                if (
                  actualXPos > rectData.x - padding &&
                  actualXPos < rectData.x + guitarWidth + padding &&
                  yPos > rectData.y - padding &&
                  yPos < rectData.y + guitarHeight + padding &&
                  !scoreIncrementedRects[k]
                ) {
                  pointOfGuitar++; // 점수 증가
                  scoreIncrementedRects[k] = true; // 점수 증가 플래그 설정
                  rectData.color = color(0, 0, 255, 150); // 파란색으로 변경
                  rectData.blinkCount = 60; // 깜빡임 카운트 설정

                  guitarEffect.play(); //기타 소리 나기
                }
              }
            }
          }
        }
      }

      // 손 데이터 필터링 (lerp 적용)
      filteredHands = hands.map((hand) => {
        return {
          keypoints: hand.keypoints.map((kp, idx) => {
            if (!filteredHands[idx]) {
              return { x: kp.x, y: kp.y, score: kp.score };
            }
            return {
              x: lerp(filteredHands[idx]?.x || kp.x, kp.x, 0.2),
              y: lerp(filteredHands[idx]?.y || kp.y, kp.y, 0.2),
              score: kp.score,
            };
          }),
        };
      });

      // 비디오와 손가락 시각화 (대기 시간 포함)
      push();
      translate(width, 0);
      scale(-1, 1);
      image(video, 0, 0); //화면
      pop();

      image(guitarRect, 0, 110);

      // 기타 줄 그리기
      noFill();
      stroke(0); // 검정색 줄
      strokeWeight(10);
      for (let x = 5; x <= width; x += guitarWidth) {
        for (let y = 100 + 70; y < height; y += guitarHeight) {
          rect(x, y, guitarWidth, guitarHeight);
        }
      }

      push();
      translate(width, 0);
      scale(-1, 1);
      for (let i = 0; i < filteredHands.length; i++) {
        let hand = filteredHands[i];

        // 손가락 위치 순회
        if (hand.keypoints) {
          // 손가락 마디를 선으로 연결
          stroke(0);
          strokeWeight(3);
          noFill();

          beginShape();
          for (let j = 0; j < hand.keypoints.length; j++) {
            let keypoint = hand.keypoints[j];

            // 신뢰도가 낮은 점은 시각화하지 않음
            if (keypoint.score < 0.5) continue;

            let xPos = keypoint.x; // 비디오 좌표계
            let yPos = keypoint.y;

            curveVertex(xPos, yPos);

            // 두 번째 손가락(검지손가락)에 기타피크 이미지 표시
            if (j === 8) {
              imageMode(CENTER);
              image(guitarPick, xPos, yPos);
            }
          }
          endShape();
        }
      }
      pop();

      // 빨간 네모(혹은 파란 네모) 그리기
      for (let rectData of rects) {
        if (rectData.blinkCount > 0) {
          // 깜빡임 애니메이션
          if (frameCount % 10 < 5) {
            fill(rectData.color);
          } else {
            noFill();
          }
          rectData.blinkCount--;
        } else {
          fill(rectData.color); // 기본 색상
        }
        noStroke();
        rectMode(CORNER);
        rect(rectData.x, rectData.y, guitarWidth, guitarHeight);
      }

      // 점수 표시
      fill(0);
      textSize(24);
      textAlign(LEFT, TOP);
      text("Score: " + pointOfGuitar, 10, 10);
      text("Time: " + nf(35 - elapsedTime, 1, 1) + "s", width - 160, 10); // 남은 시간 표시
      textAlign(CENTER, TOP);
      text("빨간 곳을 \n 여러번 뜯어보자!", width / 2, 10);
      break;

    case 15: //guitar result
      background(255);
      //textAlign(CENTER, CENTER);
      //textSize(32);
      //text("Game Over!", width / 2, height / 2 - 30);
      //text("Final Score: " + pointOfGuitar, width / 2, height / 2 + 30);

      if (pointOfGuitar >= 18) guitarFinal = 10;
      else if (pointOfGuitar < 18 && pointOfGuitar > 8) guitarFinal = 5;
      else if (pointOfGuitar < 8) guitarFinal = 0;

      //캐릭터들의 대사(요구 포함)가 들어가는 씬마다 여기서부터 다시 주석이 등장하는 곳까지
      //복사+붙여넣기 후, dialogues 안의 문구를 변경해 주세요.
      //추가한다면 "대사","대사", 식으로 더 넣으면 됩니다.

      //이전에 사용하던 대사의 참조 인덱스를 초기화합니다.
      if (currentDialogueIndex > dialogues.length && !isDisplaying) {
        currentDialogueIndex = 0;
        isDisplaying = false;
      } else {
      }
      imageMode(CENTER);
      image(guitarIntroImage, width / 2, height / 2);
      //디버깅용. 위의 인덱스 초기화를 확인하기 위해 사용했습니다.
      //console.log(currentDialogueIndex);

      //여기에 해당 스테이지의 대사를 나열해주시면 됩니다.
      //그림과 겹치지 않게 줄바꿈을 해주세요. (\n을 사용합니다.)
      //줄바꿈 직후에 스페이스바가 있다면 정렬이 깨지니 유의해주세요.
      if (currentDialogueIndex <= 0) {
        image(dialogueFox, width / 2, height / 2);
      } else image(dialogueCat, width / 2, height / 2);
      textSize(18);
      textFont(choice);
      fill(0);
      strokeWeight(0);
      if (guitarFinal == 10) {
        dialogues = [
          "이런 코드는 어때? \n마음에 들었을까?",
          "흠…….\n아주 마음에 들어!",
          "이런 리프라면 공연 30분 전에 연습 시작해도\n충분히 칠 수 있다고! 난 천재 락스타니까!",
          "그럼 곡은 이걸로 완성인 건가?\n다른 애들한테도 들려줬어?",
          "이제 슬슬 평가 받을 차례지, 후훗.",
        ];
      } else if (guitarFinal == 5) {
        dialogues = [
          "이런 코드는 어때? \n마음에 들었을까?",
          "흠…….\n그냥저냥 들어줄 만하네. 조금 복잡한가?",
          "하지만 이 천재 락스타는 충분히 칠 수 있지.\n귀찮겠지만 연습은 해야겠네.",
          "그럼 곡은 이걸로 완성인 건가?\n다른 애들한테도 들려줬어?",
          "이제 슬슬 평가 받을 차례지, 후훗.",
        ];
      } else {
        dialogues = [
          "이런 코드는 어때? \n마음에 들었을까?",
          "흠…….\n내가 분명 연습하기 귀찮다고 했을 텐데?",
          "밴드 자작곡을 쓰는 이유가 뭐라고 생각하는 거야?\n이 천재 락스타에게 맞춰주려고 그런 게 아니었어?",
          "에휴…….그럼 곡은 이걸로 완성인 건가?\n다른 애들한테도 들려줬어?",
          "이제 슬슬 평가 받을 차례지, 후훗.",
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
        } else catVoice.play();
        soundPlayed = true; // 소리 재생 여부 설정
      }

      // 조건이 변할 때 플래그 초기화
      if (currentCharIndex % 9 !== 0 || keyCode !== ENTER) {
        soundPlayed = false; // 다시 재생 가능하도록 초기화
      }
      break;

    case 16: // 최종 결과
      //이전에 사용하던 대사의 참조 인덱스를 초기화합니다.

      if (typeof drumFinal == "undefined") drumFinal = 0;
      if (typeof bassFinal == "undefined") bassFinal = 0;
      if (typeof keyboardFinal == "undefined") keyboardFinal = 0;
      if (typeof guitarFinal == "undefined") guitarFinal = 0;

      if (drumFinal == 10) {
        bearResult = "10점 만점에 10점.\n내가 원하던 박자를 제대로 구현해냈어!";
      } else if (drumFinal == 5) {
        bearResult = "뭐, 그냥, 그럭저럭 했네.";
      } else if (drumFinal == 0) {
        bearResult =
          "너는 밴드맨 실격이야. 박자를 받아들이는 감각이 엉망이라고!\n나 이런 프론트맨이랑은 일 못 해!";
      }

      if (bassFinal == 10) {
        copyResult = "내가 원하던 바로 그 베이스 라인이야!";
      } else if (bassFinal == 5) {
        copyResult = "이 정도면 나름 준수하지!";
      } else if (bassFinal == 0) {
        copyResult =
          "베이스 소리를 잘 들려주고 싶다는 게 그렇게 문제였어?\n나 상처받았어 안 할래…….";
      }

      if (keyboardFinal == 10) {
        rabbitResult =
          "이 정도면 믿고 내 파트를 맡겨도 되겠는걸?\n나는 그 동안 일광욕 하러 가면 되는 거고.";
      } else if (keyboardFinal == 5) {
        rabbitResult = "뭐…… 악보만 제때 보내주면 충분히 감당 가능한 멜로디지.";
      } else if (keyboardFinal == 0) {
        rabbitResult =
          "이건 너무 복잡해!\n내 취미를 배려해주지 않는 프론트맨은 필요 없어!";
      }

      if (guitarFinal == 10) {
        catResult =
          "역시 천재 락스타 고양이님의 동료답다구!\n난 이런 리프가 좋더라.";
      } else if (guitarFinal == 5) {
        catResult = "살짝 서투르긴 하지만 이 정도는 양해해주지.";
      } else if (guitarFinal == 0) {
        catResult =
          "흥, 곡이 마음에 안 들어.\n넌 천재 락스타와 함께 할 자격이 없다!";
      }

      if (keyboardFinal + guitarFinal + bassFinal + drumFinal >= 30) {
        finalResult = [
          "그렇게 우리는 전설의 밴드가 됐어.\n내가 쓴 곡에 모두가 환호했고, 밴드의 합에 다들 열광했지.",
          "곡을 쓸 때 도와준 덕분에 이렇게 잘 될 수 있었어, 고마워!",
          "다음 번에 월드 투어를 할 때 전용기를 대절해서 초대해줄게.\n그때까지 우리 음악 잘 들어줘야 해?",
          "",
        ];
      } else if (
        keyboardFinal + guitarFinal + bassFinal + drumFinal < 30 &&
        keyboardFinal + guitarFinal + bassFinal + drumFinal >= 15
      ) {
        finalResult = [
          "뭐, 뻔한 결과야.\n흔하디 흔한 언더그라운드 밴드로 데뷔했지.",
          "대성공은 아니지만 이런 삶도 나름대로 락스타라고 할 수 있을 거야.\n음악을 즐길 줄 알면 그거야말로 락이니까 말이야!",
          "다음 번에 공연을 할 때는 너에게도 표를 전해 줄게.\n보러 올 거지?",
          "",
        ];
      } else if (keyboardFinal + guitarFinal + bassFinal + drumFinal < 15) {
        finalResult = [
          "음, 결론부터 말하자면…….\n우리는 밴드를 대차게 말아먹었어.",
          "어쩔 수 없지! 괜찮아, 아티스트에겐 흔한 일이니까.\n다들 뿔뿔이 흩어졌지만, 알아서 씩씩하게 살고 있을 게 분명해.",
          "그래도, 조금은 미련이 남는 건 어쩔 수가 없네…….",
          "",
        ];
      }
      if (
        keyboardFinal == 0 ||
        guitarFinal == 0 ||
        bassFinal == 0 ||
        drumFinal == 0
      ) {
        finalOut = [
          "물론 그 곡을 듣고 도망가버린 멤버도 있긴 하지만, 뭐 어때.\n원래 밴드는 해체 한 번 쯤은 해보는 게 간지라더라.",
          "새 동물을 구하는 게 쉽진 않았지만 어떻게든 해내긴 했어.",
        ];
      }

      if (currentDialogueIndex >= dialogues.length && !isDisplaying) {
        currentDialogueIndex = 0;
        isDisplaying = false;
      } else {
      }
      imageMode(CORNER);
      image(gameIntroImage, 0, 0);

      if (currentDialogueIndex >= 6 && currentDialogueIndex <= 10) {
        imageMode(CORNER);
        image(scoreImage, 0, 0);
        strokeWeight(0);
        textSize(10);
        fill(200);
        text(drumFinal, 327, 145);
        text(bassFinal, 618, 237);
        text(keyboardFinal, 480, 231);
        text(guitarFinal, 549, 250);
      }
      if (currentDialogueIndex >= 10) {
        imageMode(CORNER);
        image(backgroundImage, 0, 0);
        image(lastFox, 0, 0);
        if (drumFinal != 0) image(lastBear, 0, 0);
        if (bassFinal != 0) image(lastCopy, 0, 0);
        if (guitarFinal != 0) image(lastCat, 0, 0);
        if (keyboardFinal != 0) image(lastRabbit, 0, 0);
      }

      //디버깅용. 위의 인덱스 초기화를 확인하기 위해 사용했습니다.
      //console.log(currentDialogueIndex);

      //여기에 해당 스테이지의 대사를 나열해주시면 됩니다.
      //그림과 겹치지 않게 줄바꿈을 해주세요. (\n을 사용합니다.)
      //줄바꿈 직후에 스페이스바가 있다면 정렬이 깨지니 유의해주세요.
      if (currentDialogueIndex < 5) image(dialogueFox, 0, 0);
      else if (currentDialogueIndex == 5) image(dialogueFox, 0, 0);
      else if (currentDialogueIndex == 6) image(dialogueBear, 0, 0);
      else if (currentDialogueIndex == 7) image(dialogueRabbit, 0, 0);
      else if (currentDialogueIndex == 8) image(dialogueCat, 0, 0);
      else if (currentDialogueIndex == 9) image(dialogueCopy, 0, 0);
      else if (currentDialogueIndex >= 10) image(dialogueFox, 0, 0);
      textSize(18);
      fill(0);
      textFont(choice);
      dialogues = [
        "아, 이제 막 곡이 완성됐어!\n도와줘서 고마워!",
        "자, 얘들아. 이게 우리 밴드의 곡이 될 거야!\n한 번 합을 맞춰볼까?",
        "하나,\n둘,",
        "하나, 둘, 셋, 넷!",
        "",
        "어때? 마음에 들어?",
        bearResult,
        rabbitResult,
        catResult,
        copyResult,
      ];
      // 배열의 각 요소를 result 배열에 문자열로 추가
      for (let i = 0; i < finalOut.length; i++) {
        dialogues.push(finalOut[i]);
      }
      for (let i = 0; i < finalResult.length; i++) {
        dialogues.push(finalResult[i]);
      }

      //첫 대사는 엔터키 입력(bassClass에서 담당) 없이도 출력되게 합니다.
      if (currentDialogueIndex == 0) {
        text(dialogues[0], width / 2, height - 70);
        //첫 대사가 아니라면 엔터키를 누를 때마다 다음 배열의 대사를 업데이트합니다.
      } else text(displayedText, width / 2, height - 70);

      if (
        currentDialogueIndex >= 0 &&
        currentCharIndex % 9 === 0 &&
        currentCharIndex < dialogues[currentDialogueIndex].length &&
        keyCode == ENTER &&
        !soundPlayed // 이미 재생된 경우 방지
      ) {
        if (currentDialogueIndex <= 5 || currentDialogueIndex >= 10) {
          foxVoice.play();
          soundPlayed = true; // 소리 재생 여부 설정}
        } else if (currentDialogueIndex == 6) {
          bearVoice.play();
          soundPlayed = true; // 소리 재생 여부 설정}
        } else if (currentDialogueIndex == 7) {
          rabbitVoice.play();
          soundPlayed = true; // 소리 재생 여부 설정}
        } else if (currentDialogueIndex == 8) {
          catVoice.play();
          soundPlayed = true; // 소리 재생 여부 설정}
        } else if (currentDialogueIndex == 9) {
          copyVoice.play();
          soundPlayed = true; // 소리 재생 여부 설정}
        }
      }

      // 조건이 변할 때 플래그 초기화
      if (currentCharIndex % 9 !== 0 || keyCode !== ENTER) {
        soundPlayed = false; // 다시 재생 가능하도록 초기화
      }

      if (currentDialogueIndex == 4) {
        bgm.stop();
        bgmPlaying = false;
        image(ending, 0, 0);

        if (!songPlay) {
          songPlay = true;
          if (realGame.averageBPM >= 230) {
            //만약 드럼을 빠르게 쳤다면
            if (pointOfGuitar >= 10 && score >= 50 && bassFinal < 5)
              song[0].play();
            else if (pointOfGuitar >= 10 && score >= 50 && bassFinal >= 5)
              song[1].play();
            else if (pointOfGuitar >= 10 && score < 50 && bassFinal < 5)
              song[2].play();
            else if (pointOfGuitar >= 10 && score < 50 && bassFinal >= 5)
              song[3].play();
            else if (pointOfGuitar < 10 && score >= 50 && bassFinal < 5)
              song[4].play();
            else if (pointOfGuitar < 10 && score >= 50 && bassFinal >= 5)
              song[5].play();
            else if (pointOfGuitar < 10 && score < 50 && bassFinal < 5)
              song[6].play();
            else if (pointOfGuitar < 10 && score < 50 && bassFinal >= 5)
              song[7].play();
          } else if (realGame.averageBPM < 230) {
            //만약 드럼을 느리게 쳤다면
            if (pointOfGuitar >= 10 && score >= 50 && bassFinal < 5)
              song[8].play();
            else if (pointOfGuitar >= 10 && score >= 50 && bassFinal >= 5)
              song[9].play();
            else if (pointOfGuitar >= 10 && score < 50 && bassFinal < 5)
              song[10].play();
            else if (pointOfGuitar >= 10 && score < 50 && bassFinal >= 5)
              song[11].play();
            else if (pointOfGuitar < 10 && score >= 50 && bassFinal < 5)
              song[12].play();
            else if (pointOfGuitar < 10 && score >= 50 && bassFinal >= 5)
              song[13].play();
            else if (pointOfGuitar < 10 && score < 50 && bassFinal < 5)
              song[14].play();
            else if (pointOfGuitar < 10 && score < 50 && bassFinal >= 5)
              song[15].play();
          }
        }
      }

      if (
        keyboardFinal == 0 ||
        guitarFinal == 0 ||
        bassFinal == 0 ||
        drumFinal == 0
      ) {
        if (currentDialogueIndex >= 15) {
          image(backgroundImage, 0, 0);
          textAlign(CENTER, CENTER);
          textSize(49);
          stroke(255);
          strokeWeight(8);
          fill(116, 98, 69);
          textFont(kossuyeom);
          text("The End!", width / 2, height / 2 - 80);
          textFont(choice);
          textSize(20);
          strokeWeight(4);
          text(
            "새로고침(Command+R 혹은 F5)을 눌러 처음으로 돌아가세요.",
            width / 2,
            height / 2
          );
          textSize(16);
          text(
            "TIP: 게임 결과에 따라 엔딩에서 다른 곡을 만들 수 있습니다.",
            width / 2,
            height / 2 + 80
          );
        }
      } else {
        if (currentDialogueIndex >= 13) {
          image(backgroundImage, 0, 0);
          textAlign(CENTER, CENTER);
          textSize(49);
          stroke(255);
          strokeWeight(8);
          fill(116, 98, 69);
          textFont(kossuyeom);
          text("The End!", width / 2, height / 2 - 80);
          textFont(choice);
          textSize(24);
          strokeWeight(4);
          text(
            "Enter 혹은 ESC를 눌러 처음으로 돌아가세요.",
            width / 2,
            height / 2
          );
          textSize(16);
          text(
            "TIP: 게임 결과에 따라 엔딩에서 다른 곡을 만들 수 있습니다.",
            width / 2,
            height / 2 + 80
          );
        }
      }
  }
}
