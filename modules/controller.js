// controller.js -- request handler, informs game and view
import { View } from './view.js';
import { Game } from './game.js';

class Controller
{
	#Game;
	#View;
	
	constructor()
	{
		this.#View = new View(this);
	}


	startGame()
	{
		event.preventDefault();
		console.log(`startGame not yet implemented`);
	}


	fire()
	{
		console.log(`fire not yet implemented`);
	}

}

export { Controller }