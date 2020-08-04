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

			//landscape setup and display
			let ctxWidth = this.#view.getCtxWidth();
			let ctxHeight = this.#view.getCtxHeight();
			this.#game.makeLandscape(ctxWidth, ctxHeight);
			this.#view.plotLandscape(this.#game.getLandscape());

			//player setup and display
			let playerNames = this.#view.getPlayerNames();
			this.#game.setPlayers(playerNames);
			this.#view.setCurrentPlayer(this.#game.getCurrentPlayer());
			this.#view.plotPlayers(this.#game.getPlayers());

			this.#view.toggleMainmenu();
		}

		catch (error) 
		{
			this.#view.clearCanvas();
			this.#view.showMessage(error);
		}
	}


	messageboxOK() 
	{
		this.#view.toggleMessagebox();
	}


	fire() 
	{
		try 
		{
      if (this.#game == null) throw Error(`No game in progress.`);

			let shotDetails =
			{
				angles: this.#view.getAngleInputs(),
				powers: this.#view.getPowerInputs(),
			}

			this.#game.setCurrentShot(shotDetails);
      this.#view.plotSet(this.#game.getCurrentShot().getShotpath());
     
      //---------------------------------------------------------------//
      //bunch of other stuff needs to happen here before cycling player//
      //---------------------------------------------------------------//

      this.#game.cyclePlayer();
      this.#view.setCurrentPlayer(this.#game.getCurrentPlayer());
		}

		catch (error) 
		{
			this.#view.showMessage(error);
		}
	}

}

export { Controller }