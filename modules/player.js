class Player
{
	#name = ``;
	#colour = 0;
	#hitpoints = 100;
	#position = { x: 0, y: 0 };
	
	setName(name)
	{
		this.#name = name;
	}

	
	getName()
	{
		return this.#name;
	}

	
	setColour(colour)
	{
		this.#colour = colour;
	}
	

	getColour()
	{
		return this.#colour;
	}
	
	
	setHitpoints(hitpoints)
	{
		this.#hitpoints = hitpoints;
	}
	
	
	getHitpoints()
	{
		return this.#hitpoints;
	}
	
	setRandomPosition(allpoints)
	{
		let index = Math.round(Math.random() * allpoints.length);
		let coordinate = allpoints[index];
		let x = Math.round(coordinate.x);
		let y = Math.round(coordinate.y);
		this.#position = { x: x, y: y };
	}
	
	getPosition()
	{
		return this.#position;
	}
}

export { Player };