// game.js -- game state/behaviour
import { Landscape } from './landscape.js';
import { Player } from './player.js';
import { Shot } from './shot.js';

class Game
{
	#currentShot		= null;
	#currentPlayer	= null;
	#landscape			= null;
	#players 				= [];
	
	
	addPlayer(playerName)
	{
		//validation
		if (playerName.length == 0 && this.#players.length == 0)
			throw new Error(`Player 1 must be entered. Additional players optional.`)
		
		else if (playerName.length == 0)
			return
		
		//successful
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
	
	
	setCurrentShot(shotDetails)
	{
		//input validation
		let fail						= false;
		let error						= "";
		let validatedAngle	= 0;
		let validatedPower	= 0;
		
		for (let i = 0; i < shotDetails.angle.length; i++)
		{
			if ( typeof shotDetails.angle[i] != "number" )
			{
				error += "Input for angle must be numeric. ";
				fail = true;
			}

			else if ( shotDetails.angle[i] == NaN )
				break

			else validatedAngle = shotDetails.angle[i];
		}

		for (let i = 0; i < shotDetails.power.length; i++)
		{
			if ( typeof shotDetails.power[i] != "number" )
			{
				error += "Input for power must be numeric. ";
				fail = true;
			}

			else if ( shotDetails.power[i] > 100 || shotDetails.power[i] < 0 )
			{
				error += "Power must be between 0 and 100. ";
				fail = true;
			}

			else if ( shotDetails.power[i] == NaN )
				break;

			else validatedPower = shotDetails.power[i];
		}

		
		
		if (fail)
		{
			error += "Please check your input.";
			throw Error(error);
		}			
		
		//following successful validation
		else
		{
			console.log(`input has been validated`);
			let validated =
			{
				angle: validatedAngle,
				power: validatedPower,
				player: this.#currentPlayer,
				landscape: this.#landscape
			}
			
			this.#currentShot = new Shot(validated);
		}
	}
	
	getCurrentShot()
	{
		return this.#currentShot;
	}
	
}

export { Game }