class Shot
{
	#angle;
	#gravity = -5;
	#landscape;
	#player;
	#power;
	#shotpath;
	#wind = 0;
	
	
	constructor(shotDetails)
	{
		this.#angle			= this.degToRad(shotDetails.angle);
		this.#power			= shotDetails.power;								
		this.#player		= shotDetails.player;								
		this.#landscape	= shotDetails.landscape;

		this.makeShotpath();
	}
	
	
	//calculates the current position of the projectile for a given step
	makeShotpoint(step)
	{
		let initVelX	= Math.cos(this.#angle) * this.#power;
		let initVelY	= Math.sin(this.#angle) * this.#power;
		let velGrav		= this.#gravity * step;
		let velWind		= this.#wind * step;
		let crntVelX	= initVelX + velWind;
		let crntVelY	= initVelY + velGrav;
		let x					= this.#player.getPosition().x + step * crntVelX;
		let y					= this.#player.getPosition().y + step * crntVelY;

		return {
			x: Math.round(x),
			y: Math.round(y)
		}
	}


	//creates an array of coordinates by caling makeShotpoint for successive steps
	makeShotpath()
	{
		let collisionPoint	= null;
		let done						= false;
		let step						= 0;
		let landscapePoints = this.#landscape.getAllpoints();
		let shotpath				= [];
	
		while(!done)
		{
			let shotpoint = this.makeShotpoint(step);
			shotpath.push(shotpoint);
			
			//COLLISION CHECKS -- VS LANDSCAPE
			
			//compare our newly generated shotpoint against landscape for collision
			// landscapePoints.forEach(function(landpoint)
			// {
				// if (shotpoint.y < landpoint.y)
				// {
					// console.log(`kaboom!`);
					// done = true;
				// }
			// });

			//if our point goes beneath the playfield then that ends trajectory
			if (shotpoint.y < 0)
			{
				done = true;
				console.log(`trajectory end`);
			}
			
			//collision detection point
			else
			{
				// let rgbaSum = 0;
				// pointCheck.data.forEach(element => rgbaSum += element);
			
				// if (rgbaSum > 0)
				// {
					// collisionPoint =
					// {
						// "x": shotPoint.x,
						// "y": shotPoint.y
					// };
					// done = true;
				// }
			}
		
			//step can be adjusted to increase or decrease density
			step += 0.04;
		}
	
		this.#shotpath = shotpath;
	}


	degToRad(deg)
	{
		return deg * Math.PI / 180;
	}
	
	
	getShotpath()
	{
		return this.#shotpath;
	}
	
}

export { Shot };