// view.js -- UI handler
import { colourTable } from './colourtable.js';
import { dom } from './dom.js';

class View
{
	#controller
	#ctx;
	#ctxWidth = 1000;
	#ctxHeight = 1000;
	
	constructor(controller)
	{
		this.#controller = controller;
		
		//a few visual appearance things to take care of
		this.#ctx = dom.playfield.getContext(`2d`);
		dom.playfield.width = this.#ctxWidth;
		dom.playfield.height = this.#ctxHeight;
		for (let i = 0; i < dom.playerLabels.length; i++)
		{
			dom.playerLabels[i].style.color = colourTable[i+1];
			dom.playerLabels[i].style.visibility = `visible`;
		}
		
		//set up button listeners
		dom.fireButtons.forEach(el => el.addEventListener(`click`, this.#controller.fire.bind(this.#controller)));
		dom.mainmenuForm.addEventListener(`submit`, this.#controller.startGame.bind(this.#controller));
		dom.messageboxOKButton.addEventListener(`click`, this.#controller.messageboxOK.bind(this.#controller));
	}

	
	getPlayerNames()
	{
		return Object.values(dom.nameInputs).map(el => el.value);
	}

	
	toggleMainmenu()
	{
		if (dom.mainmenuForm.style.display != `none`)
			dom.mainmenuForm.style.display = `none`
		
		else if (dom.mainmenuForm.style.display == `none`)
			dom.mainmenuForm.style.display = `grid`;
	}
	
	
	toggleMessagebox()
	{
		if (dom.messagebox.style.display == `none` || dom.messagebox.style.display == ``)
			dom.messagebox.style.display = `block`
		
		else dom.messagebox.style.display = `none`;
	}
	
	
	updateMessagebox(message)
	{
		dom.messageboxText.innerText = message;
	}
	
	
	showMessage(message)
	{
		this.updateMessagebox(message);
		this.toggleMessagebox();
	}

	
	plotPixel(x, y)
	{
		y = dom.playfield.height - y;
		let myImageData = this.#ctx.createImageData(1, 1);
		for (let i = 0; i <=3; i++)
		{
			myImageData.data[i] = 255;
		}
		this.#ctx.putImageData(myImageData, Math.round(x), Math.round(y));
	}
	
	
	plotSet(pixelSet)
	{
		pixelSet.forEach(el => this.plotPixel(el.x, el.y));
	}
	

	plotLandscape(landscape)
	{
		let keypoints = landscape.getKeypoints();
		let landscapePath = new Path2D();
		landscapePath.moveTo(keypoints[0].x, keypoints[0].y);
		for (let i=1; i <= keypoints.length-1; i++)
		{
			landscapePath.lineTo(keypoints[i].x, keypoints[i].y);
		}
		landscapePath.closePath();
		let gradient = this.#ctx.createLinearGradient(0,0,0,this.#ctxHeight);
		gradient.addColorStop(0, `darkgreen`);
		gradient.addColorStop(1, `white`);
		this.#ctx.fillStyle = gradient;
		this.#ctx.fill(landscapePath, 'nonzero');
	}
	
	
	plotPlayers(players, allpoints)
	{
		players.forEach(function(player)
		{
			let index = Math.round(Math.random() * this.#ctxWidth);
			let coordinate = allpoints[index];
			let x = Math.round(coordinate.x);
			let y = Math.round(coordinate.y);
			let icon = dom.tankImage[0];
			console.log(icon);
			// this.#ctx.drawImage(icon, x, y, 50, 50);
		}.bind(this));
	}
	
	
	setCurrentPlayer(currentPlayer)
	{
		dom.currentPlayerLabels.forEach(function(el) 
		{
			el.innerText = currentPlayer.getName();
			el.style.color = colourTable[currentPlayer.getColour()];
		});

		dom.currentPlayerLabels[1].style.textShadow = `1px 1px ${colourTable[currentPlayer.getColour()+4]}`;
	}
	
	
	getCtxWidth()
	{
		return this.#ctxWidth;
	}
	
	
	getCtxHeight()
	{
		return this.#ctxHeight;
	}
	
	
	getCtx()
	{
		return this.#ctx;
	}
}

export { View }