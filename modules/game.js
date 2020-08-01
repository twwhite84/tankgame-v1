// game.js -- game state/behaviour
import { Landscape } from './landscape.js';
import { Player } from './player.js';

class Game
{
	#currentPlayer;
	#landscape;
	#players = [];
	#shot;
	
	
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
			player.setRandomPosition(this.#landscape.getAllpoints());
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
	
	
	makeShot(shotDetails)
	{
		//validation
		let angleFail = true;
		let powerFail = true;
		let error = "";
		let angle;
		let power;
		
		for (let i = 0; i < shotDetails.angle.length; i++)
		{
			if (typeof shotDetails.angle[i] == "number" && !isNaN(shotDetails.angle[i]))
			{
				angleFail = false;
				angle = shotDetails.angle[i];
			}
			
			if (typeof shotDetails.power[i] == "number" && !isNaN(shotDetails.power[i]))
			{
				if (shotDetails.power[i] > 100) error += "Power cannot be over 100. ";
				else
				{
					powerFail = false;
					power = shotDetails.power[i];	
				}
			}
		}
		
		if (angleFail || powerFail)
		{
			error += "Please check your input.";
			throw Error(error);
		}			
		
		else
		{
			console.log(shotDetails);
			console.log(`player ${shotDetails.currentPlayer.getName()} is making a new shot.`);
			console.log(`power and angle input seems ok.\nangle is ${angle}\npower is ${power}`);
		}
	}
	
}

export { Game }