class Player
{
	#name;
	#colour;
	#hitpoints;
	#position;
	
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
		let colourIndex = [`red`, `blue`];
		this.#colour = colourIndex[colour];
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
}

export { Player };