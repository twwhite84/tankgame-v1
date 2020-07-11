import { Game } from './modules/game.js';
import { UI } from './modules/UI.js';

//set up event listeners
let DOMElements =
{
	canvas:		document.getElementById(`playfield`),
	ctx:			document.getElementById(`playfield`).getContext(`2d`),
	fireBtn:	document.querySelectorAll(`.fire-btn`)
							.forEach(el => el.addEventListener(`click`, this.fireButton)),
	startBtn:	document.getElementById(`mainmenu-start-btn`)
							.addEventListener(`click`, this.startButton)
}