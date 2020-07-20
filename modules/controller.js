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
		try
		{
			this.#Game = new Game();
			this.#View.getPlayerNames().forEach(playerName => this.#Game.addPlayer(playerName));
			this.#View.toggleMainmenu();
			this.#Game.setCurrentPlayer(1);
			this.#View.showCurrentPlayer(this.#Game.getCurrentPlayer().getName());
			this.#View.plotSet(this.#Game.testPixelSet());
		}
		
		catch(error)
		{
			this.#View.showMessage(error);
		}
	}
	
	
	messageboxOK()
	{
		this.#View.toggleMessagebox();
	}


	fire()
	{
		console.log(`fire not yet implemented`);
	}

}

export { Controller }