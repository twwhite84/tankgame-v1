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
		this.#View.initView();
	}


	startGame()
	{
		event.preventDefault();
		try
		{
			let players = this.#View.getPlayers();
			console.log(players)
			this.#Game = new Game();
			this.#Game.setPlayers(players[0], players[1]);	
		}
		
		catch(error)
		{
			this.#View.showMessage(error);
		}
	}


	fire()
	{
		console.log(`fire not yet implemented`);
	}

}

export { Controller }