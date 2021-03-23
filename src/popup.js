'use strict';

export default class PopUp {
  constructor() {
    // 초기화
    this.popUp = document.querySelector('.pop-up');
    this.popUpText = document.querySelector('.message__box');
    this.replayBtn = document.querySelector('.replay__btn'); // 클래스에 멤버변수 3개 만듬
    this.replayBtn.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  hide() {
    this.popUp.classList.add('pop-up__hide');
  }

  showWithText(text) {
    this.popUpText.innerText = text;
    this.popUp.classList.remove('pop-up__hide');
  }
}
