import { Game } from './game.js';

//this module contains methods for the view

class UI
{
	#DOMElements;
	#playfieldSize;
	
	constructor()
	{
		this.#DOMElements =
		{
			canvas:		document.getElementById(`playfield`),
			ctx:			document.getElementById(`playfield`).getContext(`2d`),
			fireBtn:	document.querySelectorAll(`.fire-btn`).forEach(el => el.addEventListener(`click`, this.fireButton)),
			startBtn:	document.getElementById(`mainmenu-start-btn`).addEventListener(`click`, this.startButton)
		}
		
		//value of 400 seems to work best across various screens, not too pixelly/blurry
		this.#DOMElements.canvas.width = this.#playfieldSize;
		this.#DOMElements.canvas.height = this.#playfieldSize;
	}
	
	getDOMElements()
	{
		return this.#DOMElements;
	}
	
	fireButton()
	{
		console.log(`fire button should call a firing method on the game class`);
	}
	
	startButton()
	{
		document.getElementById('mainmenu').style.display = 'none';
		console.log(`start button should call something on the game class`);
		let p1 = document.getElementById('mainmenu-player-one').value;
		let p2 = document.getElementById('mainmenu-player-two').value;
		let currentGame = new Game(p1, p2);
		currentGame.testLoop(this.#playfieldSize);
	}
	
	plotPixel(x, y)
	{
		y = canvas.height - y;
		let myImageData = ctx.createImageData(1, 1);
		for (let i = 0; i <=3; i++)
		{
			myImageData.data[i] = 255;
		}
		this.#DOMElements[ctx].putImageData(myImageData, Math.round(x), Math.round(y));
	}
}

export { UI }