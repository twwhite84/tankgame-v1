//game.js -- MODEL CLASS
class Game
{
	#playerOne;
	#playerTwo;
	#currentPlayer;
	#ui;
	
	constructor(ui)
	{
		this.#ui = ui;
	}
	
	
	getCurrentPlayer()
	{
		return this.#currentPlayer;
	}
	
	setCurrentPlayer(currentPlayer)
	{
		this.#currentPlayer = currentPlayer;
	}
	
	initGame()
	{
		//check if user has entered names
		console.log(this.#ui.getPlayerNames());
	
		//add names to the game
		
		//clear the menu

		//just draw a random line across screen for now
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