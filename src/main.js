"use strict";

import PopUp from "./popup.js";
import { GameBuilder } from "./game.js";

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  game.start();
});

const game = new GameBuilder().withCarrotCount(5).withBugCount(5).withGameDuration(10).build();

game.setGameStopListener((reason) => {
  let messgage;
  switch (reason) {
    case "cancel":
      messgage = "REPLAY?";
      break;
    case "win":
      messgage = "WIN!!";
      break;
    case "lose":
      messgage = "YOU LOST ㅠㅠ";
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.showWithText(messgage);
});
