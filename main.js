'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__btn');
const timeBox = document.querySelector('.time__box');
const scoreBox = document.querySelector('.score__box');

const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.message__box');
const replayBtn = document.querySelector('.replay__btn');

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

field.addEventListener('click', onFieldClick);

replayBtn.addEventListener('click', () => {
  startGame();
  hidePopUp();
  console.log(started);
});

function startGame() {
  started = true;
  initGame();
  showStopBtn();
  showTimerAndScore();
  startTimer();
  playSound(bgSound);
}

function stopGame() {
  started = false;
  stopTimer();
  hideGameBtn();
  showPopup('REPLAY?');
  playSound(alertSound);
  stopSound(bgSound);
}

function finishGame(result) {
  started = false;
  hideGameBtn();
  if (result) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }
  stopSound(bgSound);
  showPopup(result ? 'YOU WIN!' : 'YOU LOST ㅠㅠ');
}

function initGame() {
  field.innerHTML = '';
  scoreBox.innerText = CARROT_COUNT;
  addItems('carrot', 5, 'img/carrot.png');
  addItems('bug', 5, 'img/bug.png');
}

function addItems(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;

  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function showStopBtn() {
  const icon = gameBtn.querySelector('.fas');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function showTimerAndScore() {
  timeBox.style.visibility = 'visible';
  scoreBox.style.visibility = 'visible';
}

function startTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timeBox.innerText = `${minutes}:${seconds}`;
}

function stopTimer() {
  clearInterval(timer);
}

function hideGameBtn() {
  gameBtn.style.visibility = 'hidden';
}

function showPopup(text) {
  popUpText.innerText = text;
  popUp.classList.remove('pop-up__hide');
}

function hidePopUp() {
  popUp.classList.add('pop-up__hide');
}

function onFieldClick(e) {
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.matches('.carrot')) {
    target.remove();
    score++;
    playSound(carrotSound);
    updateScoreBox();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches('.bug')) {
    stopTimer();
    finishGame(false);
  }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function updateScoreBox() {
  scoreBox.innerText = CARROT_COUNT - score;
}
