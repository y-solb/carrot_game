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

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
  console.log(started);
});

function startGame() {
  initGame();
  showStopBtn();
  showTimerAndScore();
  startTimer();
}

function startTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
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

function stopGame() {
  stopTimer();
  hideGameBtn();
  showPopup();
}

function stopTimer() {
  clearInterval(timer);
}

function hideGameBtn() {
  gameBtn.style.visibility = 'hidden';
}

function showPopup() {
  popUp.classList.remove('pop-up__hide');
}

function showStopBtn() {
  const icon = gameBtn.querySelector('.fa-play');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function showTimerAndScore() {
  timeBox.style.visibility = 'visible';
  scoreBox.style.visibility = 'visible';
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
