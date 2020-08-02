class Shot
{
	#angle;
	#gravity = -5;
	#landscape;
	#player;
	#power;
	#wind = 0;
	
	
	constructor(shotDetails)
	{
		//instance fields replace shotData object literal
		this.#angle			= shotDetails.angle;			//replaces initAngleDeg
		this.#power			= shotDetails.power;			//replaces initVelocity
		this.#player		= shotDetails.player;			//accessors replace launcherX and launcherY
		this.#landscape	= shotDetails.landscape;	//not sure if this is necessary yet?
	}
	
	
	//REWRITE ALL OF THE BELOW WITH NEW VARIABLE NAMES
	getShotPoint(step, shotData)
	{
		let initAngleRad	= degToRad(shotData.initAngleDeg);
		let initVelocityX	= Math.cos(initAngleRad) * shotData.initVelocity;
		let initVelocityY	= Math.sin(initAngleRad) * shotData.initVelocity;
		let velocityGrav	= shotData.rateGrav * step;
		let velocityWind	= shotData.rateWind * step;
		let finalVelocityX	= initVelocityX + velocityWind;
		let finalVelocityY	= initVelocityY + velocityGrav;
		let finalX			= shotData.launcherX + step * finalVelocityX;
		let finalY			= shotData.launcherY + step * finalVelocityY;

		return
		{
			"x": Math.round(finalX),
			"y": Math.round(finalY)
		}
	}


	getShotPath()	//initially this took above shotData as shotData
	{
		let step						= 0;
		let shotPath				= [];
		let collisionPoint;
		let done						= false;
	
		while(!done)
		{
			let shotPoint = getShotPoint(step, shotData);
			shotPath.push(shotPoint);
		let pointCheck = ctx.getImageData(shotPoint.x, canvas.height - shotPoint.y, 1, 1);

		//goes below the floor
		if (shotPoint.y < 0) {
			done = true;
		}
		
		//collision detection point
		else {
			let rgbaSum = 0;
			
			pointCheck.data.forEach(element => {
				rgbaSum += element;
			});
			
			if (rgbaSum > 0) {
				collisionPoint = {
					"x": shotPoint.x,
					"y": shotPoint.y
				};
				done = true;
			}
		}
		
		step += 0.04;
	}
	
	return {
		"shotPath": shotPath,
		"collisionPoint": collisionPoint
	}

	}

//testing method only
	getDetails()
	{
		return [this.#player, this.#angle, this.#power, this.#landscape];
	}
	
	
	degToRad(deg)
	{
		return deg * Math.PI / 180;
	}
	
}

export { Shot };