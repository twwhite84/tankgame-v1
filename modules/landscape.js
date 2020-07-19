// landscape.js
class Landscape
{
	#allpoints = [];
	#keypoints = [];
	#canvasWidth;
	#canvasHeight;
	#ui;
	
	
	constructor(ui)
	{
		this.#ui = ui.getDom();
		this.#canvasWidth = this.#ui.playfield[0].width - 1;
		this.#canvasHeight = this.#ui.playfield[0].height - 1;
	}
	
	
	
	generatePoints(numPoints)
	{
		this.#keypoints = this.generateKeypoints(numPoints);
		this.#allpoints = this.generateAllpoints(this.#keypoints);
	}
	
	
	
	getAllpoints()
	{
		return this.#allpoints;
	}
	
	
	
	generateKeypoints(numPoints)
	{
		let xArray		= [];
		let yArray		= [];
		let keypoints	= [];

		for (let i = 0; i < numPoints; i++)
		{
			let x = Math.round(Math.random() * this.#canvasWidth);
			let y = Math.round(Math.random() * this.#canvasHeight);
			xArray.push(x);
			yArray.push(y);
		}
	
		xArray = xArray.sort((a,b)=>a-b);
		
		for (let i = 0; i < numPoints; i++)
		{
			keypoints.push({"x": xArray[i], "y": yArray[i]});
		}
		
		keypoints.unshift({"x": 0, "y": 0});
		keypoints.push({"x": this.#canvasWidth-10, "y": 0});
		
		return keypoints;
	}
	
	
	
	generateAllpoints(keypoints)
	{
		let climbRate			= null;
		let kpIndex				= 0;
		let differenceX		= 0;
		let differenceY		= 0;
		let xElapsed			= 0;
		let allpoints 		= [];
	
		for (let column = 0; column <= this.#canvasWidth; column++)
		{
			if (column == keypoints[kpIndex].x)
			{
				allpoints.push({"x": column, "y": keypoints[kpIndex].y});
				if (kpIndex < keypoints.length - 1)
				{
					kpIndex++;
				}
				else continue;
				climbRate = null;
				xElapsed = 0;
			}
			else
			{
				if (climbRate == null)
				{
					differenceX = keypoints[kpIndex].x - keypoints[kpIndex-1].x;
					differenceY = keypoints[kpIndex].y - keypoints[kpIndex-1].y;
					climbRate = differenceY / differenceX;
					xElapsed = 1;
					allpoints.push({"x": column, "y": keypoints[kpIndex-1].y + climbRate * xElapsed});
					xElapsed++;
				}
				else
				{
					allpoints.push({"x": column, "y": keypoints[kpIndex-1].y + climbRate * xElapsed});
					xElapsed++;
				}
			}
		}
	return allpoints;
}
	
}

export { Landscape }