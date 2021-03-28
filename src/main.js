"use strict";

import PopUp from "./popup.js";
import * as sound from "./sound.js";
import { GameBuilder, Reason } from "./game.js";

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  game.start();
});

const game = new GameBuilder().withCarrotCount(5).withBugCount(5).withGameDuration(10).build();

game.setGameStopListener((reason) => {
  let messgage;
  switch (reason) {
    case Reason.cancel:
      messgage = "REPLAY?";
      sound.playAlert();
      break;
    case Reason.win:
      messgage = "WIN!!";
      sound.playWin();
      break;
    case Reason.lose:
      messgage = "YOU LOST ㅠㅠ";
      sound.playBug();
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.showWithText(messgage);
});
