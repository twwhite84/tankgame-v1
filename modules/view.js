// view.js -- UI handler
import { Dom } from './dom.js';

class View
{
	#controller
	#ctx;
	
	constructor(controller)
	{
		this.#controller = controller;
		Dom.playfield.height = 400;
		Dom.playfield.width = 400;
		this.#ctx = Dom.playfield.getContext(`2d`);
		
		Dom.buttonsFire.forEach(el => el.addEventListener(`click`, this.#controller.fire));
		Dom.formMain.addEventListener(`submit`, this.#controller.startGame);
	}
}

export { View }