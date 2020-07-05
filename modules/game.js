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
	
	test()
	{
		return `this is a test`;
	}
	
}

export { Game }