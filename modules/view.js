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
		Dom.playfield.height = 500;
		Dom.playfield.width = 500;
		
		//set up button listeners
		Dom.fireButtons.forEach(el => el.addEventListener(`click`, this.#controller.fire.bind(this.#controller)));
		Dom.mainmenuForm.addEventListener(`submit`, this.#controller.startGame.bind(this.#controller));
	}

	
	getPlayerNames()
	{
		return Object.values(Dom.nameInputs).map(el => el.value);
	}

	
	showMessage(msg)
	{
		alert(msg);
	}
	
	
	toggleMainmenu()
	{
		if (Dom.mainmenuForm.style.display != `none`)
			Dom.mainmenuForm.style.display = `none`
		
		else if (Dom.mainmenuForm.style.display == `none`)
			Dom.mainmenuForm.style.display = `grid`;
	}
	
	
	plotPixel(x, y)
	{
		y = Dom.playfield.height - y;
		let myImageData = this.#ctx.createImageData(1, 1);
		for (let i = 0; i <=3; i++)
		{
			myImageData.data[i] = 255;
		}
		this.#ctx.putImageData(myImageData, Math.round(x), Math.round(y));
	}
	
	
	plotSet(pixelSet)
	{
		pixelSet.forEach(el => this.plotPixel(el.x, el.y));
	}
	
	
	showCurrentPlayer(currentPlayer)
	{
		Dom.currentPlayerLabels.forEach(el => el.innerText = currentPlayer);
	}
}

export { View }