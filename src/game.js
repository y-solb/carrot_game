"use strict";

import Field from "./field.js";
import * as sound from "./sound.js";

// Builder Pattern
export default class GameBuilder {
  withCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  withBugCount(num) {
    this.bugCount = num;
    return this;
  }

  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  build() {
    console.log(this);
    return new Game(this.carrotCount, this.bugCount, this.gameDuration);
  }
}

class Game {
  constructor(carrotCount, bugCount, gameDuration) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.gameDuration = gameDuration;

    this.timeBox = document.querySelector(".time__box");
    this.scoreBox = document.querySelector(".score__box");
    this.gameBtn = document.querySelector(".game__btn");

    this.gameBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop();
      } else {
        this.start();
      }
    });

    this.started = false;
    this.score = 0;
    this.timer = undefined;

    this.gameField = new Field(this.carrotCount, this.bugCount);
    this.gameField.setClickListener(this.onItemClick);
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.initGame();
    this.showStopBtn();
    this.showTimerAndScore();
    this.startTimer();
    sound.playBackground();
  }

  stop() {
    this.started = false;
    this.stopTimer();
    this.hideGameBtn();
    sound.playAlert();
    sound.stopBackground();
    this.onGameStop && this.onGameStop("cancel");
  }

  finish(result) {
    this.started = false;
    this.hideGameBtn();
    if (result) {
      sound.playWin();
    } else {
      sound.playBug();
    }
    this.stopTimer();
    sound.stopBackground();
    this.onGameStop && this.onGameStop(result ? "win" : "lose");
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === "carrot") {
      this.score++;
      this.updateScoreBox();
      if (this.score === this.carrotCount) {
        this.finish(true);
      }
    } else if (item === "bug") {
      this.finish(false);
    }
  };

  initGame() {
    this.score = 0;
    this.scoreBox.innerText = this.carrotCount;
    this.gameField.init();
  }

  showStopBtn() {
    const icon = this.gameBtn.querySelector(".fas");
    icon.classList.add("fa-stop");
    icon.classList.remove("fa-play");
    this.gameBtn.style.visibility = "visible";
  }

  showTimerAndScore() {
    this.timeBox.style.visibility = "visible";
    this.scoreBox.style.visibility = "visible";
  }

  startTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.finish(this.carrotCount === this.score);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.timeBox.innerText = `${minutes}:${seconds}`;
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  hideGameBtn() {
    this.gameBtn.style.visibility = "hidden";
  }

  updateScoreBox() {
    this.scoreBox.innerText = this.carrotCount - this.score;
  }
}
