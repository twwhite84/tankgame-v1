// game.js -- game state/behaviour
import { View } from './view.js';
import { Landscape } from './landscape.js';

class Game
{
	#currentPlayer;
	#landscape;
	#playerOne;
	#playerTwo;
	
	
	setPlayers(p1, p2)
	{
		if (p1.length == 0 || p2.length == 0)
		{
			throw `Please enter player names`;
		}
		
		else
		{
			this.#playerOne = p1;
			this.#playerTwo = p2;
		}
	}
	
	
	// initGame(playerNames)
	// {
		// check if user has entered names
		// playerNames.forEach(function(item) {
			// if (item.length == 0)
			// {
				// throw `Please fill all name fields.`;
			// }				
		// });
		
		// add names to the game
		// this.#playerOne = playerNames[0];
		// this.#playerTwo = playerNames[1];
		// this.#currentPlayer = this.#playerOne;
		
		// clear the menu
		// this.#ui.closeMenu();

		// just draw a random line across screen for now
		// this.#ui.testCanvas();
		
		// generate a landscape
		// this.#landscape = new Landscape(this.#ui);
		// this.#landscape.generatePoints(5);
		// this.#landscape.getAllpoints().forEach(function(item)
		// {
			// this.#ui.plotPixel(item.x, item.y);
			// console.log(item);
		// });
		
		
		
	// }
}

export { Game }