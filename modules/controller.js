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
			this.#Game = new Game();
			this.#View.getPlayerNames().forEach(playerName => this.#Game.addPlayer(playerName));
			console.log(this.#Game.getPlayers());
			// this.#View.toggleMainmenu();
			// this.#View.showCurrentPlayer(this.#Game.getCurrentPlayer());
			// this.#View.plotSet(this.#Game.testPixelSet());
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