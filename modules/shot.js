class Shot
{
	//default test values, override in practice
	#launcherX = Math.round(canvas.width * 300/1000);
	#launcherY = Math.round(canvas.height * 300/1000);
	#initAngleDeg = 45;
	#initVelocity = 100;
	#rateGrav = -5;
	#rateWind = -1.7;
	#ctx;
	#player;
	
	constructor(ctx)
	{
		//need a reference to the canvas ctx
		
		
	}
	
	//shot validation belongs here, not in the view
	setAngle(angle)
	{
		let topbarAngleInput = dom.angleInputs[0];
		let sidebarAngleInput = dom.angleInputs[1];
		if (!sidebarAngleInput.value && !topbarAngleInput.value)
			throw new Error(`You need to enter an angle.`);
		
		else if (sidebarAngleInput.value && topbarAngleInput.value)
			throw new Error(`You have inputs in both view modes... I still have to fix this`);
		
		else if (sidebarAngleInput.value)
			return sidebarAngleInput.value;
		
		else if (topbarAngleInput.value)
			return topbarAngleInput.value;
	}
	
	
	setPower(power)
	{
		let topbarPowerInput = dom.powerInputs[0];
		let sidebarPowerInput = dom.powerInputs[1];
		if (!sidebarPowerInput.value && !topbarPowerInput.value)
			throw new Error(`You need to enter the power.`);
		
		else if (sidebarPowerInput.value && topbarPowerInput.value)
			throw new Error(`You have inputs in both view modes... I still have to fix this`);
		
		else if (sidebarPowerInput.value)
			return sidebarPowerInput.value;
		
		else if (topbarPowerInput.value)
			return topbarPowerInput.value;
	}
	
	
}