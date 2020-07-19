// view.js -- UI handler
import { Dom } from './dom.js';

class View
{
	#controller
	#ctx;
	
	constructor(controller)
	{
		this.#controller = controller;
	}

	
	initView()
	{
		this.#ctx = Dom.playfield.getContext(`2d`);
		Dom.playfield.height = 400;
		Dom.playfield.width = 400;
		
		//set up button listeners
		Dom.fireButtons.forEach(el => el.addEventListener(`click`, this.#controller.fire.bind(this.#controller)));
		Dom.mainmenuForm.addEventListener(`submit`, this.#controller.startGame.bind(this.#controller));
	}

	
	getPlayers()
	{
		return Object.values(Dom.nameInputs).map(el => el.value);
	}

	
	showMessage(msg)
	{
		alert(msg);
	}
}

export { View }