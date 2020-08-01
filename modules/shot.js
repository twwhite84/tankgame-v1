class Shot
{
	//default test values, override in practice
	// #launcherX = Math.round(canvas.width * 300/1000);
	// #launcherY = Math.round(canvas.height * 300/1000);
	// #initAngleDeg = 45;
	// #initVelocity = 100;
	// #rateGrav = -5;
	// #rateWind = -1.7;
	// #ctx;
	#player;
	#angle;
	#power;
	
	constructor(data)
	{
		// this.#player = shotDetails.currentPlayer;
		this.#angle = data.angle;
		this.#power = data.power;
		this.#player = data.player;
	}
	

	//testing method only
	getDetails()
	{
		return [this.#player, this.#angle, this.#power];
	}
}

export { Shot };