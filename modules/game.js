//game.js -- MODEL CLASS
import { UI } from './ui.js';

class Game
{
	#playerOne;
	#playerTwo;
	#currentPlayer;
	
	constructor(p1, p2)
	{
		this.#playerOne = p1;
		this.#playerTwo = p2;
		this.#currentPlayer = p1;
	}
	
	getCurrentPlayer()
	{
		return this.#currentPlayer;
	}
	
	setCurrentPlayer(currentPlayer)
	{
		this.#currentPlayer = currentPlayer;
	}
	
	newGame()
	{
		UI.updateCurrentPlayer(this.#currentPlayer);
	}
	
	testLoop(size)
	{
		// need to tell it where my UI is. maybe redo this and call from main?
		for (let i = 0; i <= size; i++)
		{
			plotPixel(i, i);
		}
	}
	
}

export { Game }