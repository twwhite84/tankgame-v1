// game.js -- game state/behaviour
import { View } from './view.js';
import { Landscape } from './landscape.js';

class Game
{
	#currentPlayer;
	#landscape;
	#players;
	
	
	setPlayers(players)
	{
		if (!players.every(player => player.length > 0))
			throw `Please complete all player fields`
		
		else
		{
			this.#players = players;
			this.#currentPlayer = this.#players[0];
		}
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