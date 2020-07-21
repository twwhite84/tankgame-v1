// controller.js -- request handler, informs game and view
import { View } from './view.js';
import { Game } from './game.js';

class Controller
{
	#view;
	#game;
	
	constructor()
	{
		this.#view = new View(this);
	}


	startGame()
	{
		event.preventDefault();
		try
		{
			this.#game = new Game();
			this.#game.setPlayers(this.#view.getPlayerNames());
			this.#view.toggleMainmenu();
			this.#view.setCurrentPlayer(this.#game.getCurrentPlayer());
			let ctxWidth = this.#view.getCtxWidth();
			let ctxHeight = this.#view.getCtxHeight();
			this.#game.makeLandscape(ctxWidth, ctxHeight);
			this.#view.plotLandscape(this.#game.getLandscape());
		}
		
		catch(error)
		{
			this.#view.showMessage(error);
			console.log(error);
		}
	}
	
	
	messageboxOK()
	{
		this.#view.toggleMessagebox();
	}


	fire()
	{
		console.log(`fire not yet implemented`);
	}

}

export { Controller }