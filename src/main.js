"use strict";

import PopUp from "./popup.js";
import Game from "./game.js";

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  game.start();
});

const game = new Game(2, 2, 5);
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
