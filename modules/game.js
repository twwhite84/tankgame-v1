// game.js -- game state/behaviour
import { Landscape } from './landscape.js';
import { Player } from './player.js';

class Game
{
	#currentPlayer;
	#landscape;
	#players = [];
	
	
	addPlayer(playerName)
	{
		//player one field must be filled
		if (playerName.length == 0 && this.#players.length == 0)
			throw new Error(`Player 1 must be entered. Additional players optional.`)
		
		//skip subsequent unentered fields
		else if (playerName.length == 0)
			return
		
		else
		{
			let player = new Player();
			player.setName(playerName);
			player.setColour(this.#players.length + 1);
			this.#players.push(player);
		}
	}
	
	
	getPlayers()
	{
		return this.#players;
	}
	
	
	setPlayers(players)
	{
		players.forEach(playerName => this.addPlayer(playerName));
		this.setCurrentPlayer(1);
	}
	
	
	testPixelSet()
	{
		let pixelSet = [];
		for (let i = 0; i < 500; i++)
		{
			pixelSet.push({x: i, y: i});
		}
		
		return pixelSet;
	}
	
	
	getCurrentPlayer()
	{
		return this.#currentPlayer;
	}
	
	
	setCurrentPlayer(index)
	{
		this.#currentPlayer = this.#players[index-1];
	}
	
	
	makeLandscape(ctxWidth, ctxHeight)
	{
		this.#landscape = new Landscape(ctxWidth, ctxHeight);
		this.#landscape.generatePoints(5);
	}
	
	
	getLandscape()
	{
		return this.#landscape;
	}
}

export { Game }