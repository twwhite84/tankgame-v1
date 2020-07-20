// game.js -- game state/behaviour
import { View } from './view.js';
import { Landscape } from './landscape.js';
import { Player } from './player.js';

class Game
{
	#currentPlayer;
	#landscape;
	#players = [];
	
	
	addPlayer(playerName)
	{
		//need at least one player, entered for player one
		if (playerName.length == 0 && this.#players.length == 0)
			throw `Player One is required, additional players optional`;
		
		//and its ok if thats the only player for this game
		else if (playerName.length == 0)
			return
		
		else
		{
			let player = new Player();
			player.setName(playerName);
			player.setColour(this.#players.length);
			this.#players.push(player);
		}
	}
	
	
	getPlayers()
	{
		return this.#players;
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
}

export { Game }