"use strict";

import PopUp from "./popup.js";
import Field from "./field.js";
import * as sound from "./sound.js";

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const gameBtn = document.querySelector(".game__btn");
const timeBox = document.querySelector(".time__box");
const scoreBox = document.querySelector(".score__box");

let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();

gameFinishBanner.setClickListener(() => {
  startGame();
});

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
  if (!started) {
    return;
  }
  if (item === "carrot") {
    console.log("carrot");
    score++;
    updateScoreBox();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (item === "bug") {
    console.log("bug");
    finishGame(false);
  }
}

gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

function startGame() {
  started = true;
  initGame();
  showStopBtn();
  showTimerAndScore();
  startTimer();
  sound.playBackground();
}

function stopGame() {
  started = false;
  stopTimer();
  hideGameBtn();
  gameFinishBanner.showWithText("REPLAY?");
  sound.playAlert();
  sound.stopBackground();
}

function finishGame(result) {
  started = false;
  hideGameBtn();
  if (result) {
    sound.playWin();
  } else {
    sound.playBug();
  }
  stopTimer();
  sound.stopBackground();
  gameFinishBanner.showWithText(result ? "YOU WIN!" : "YOU LOST ㅠㅠ");
}

function initGame() {
  score = 0;
  scoreBox.innerText = CARROT_COUNT;
  gameField.init();
}

function showStopBtn() {
  const icon = gameBtn.querySelector(".fas");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
  gameBtn.style.visibility = "visible";
}

function showTimerAndScore() {
  timeBox.style.visibility = "visible";
  scoreBox.style.visibility = "visible";
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
  gameBtn.style.visibility = "hidden";
}

function updateScoreBox() {
  scoreBox.innerText = CARROT_COUNT - score;
}
