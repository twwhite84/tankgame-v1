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
	
	
	initGame(playerNames)
	{
		//check if user has entered names
		playerNames.forEach(function(item) {
			if (item.length == 0)
			{
				throw `Please fill all name fields.`;
			}				
		});
		
		//add names to the game
		this.#playerOne = playerNames[0];
		this.#playerTwo = playerNames[1];
		this.#currentPlayer = this.#playerOne;
		
		//clear the menu
		this.#ui.closeMenu();

		//just draw a random line across screen for now
		this.#ui.testCanvas();
		
	}
}

export { Game }