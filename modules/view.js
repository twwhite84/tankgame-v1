// view.js -- UI handler
import { colourTable } from './colourtable.js';
import { dom } from './dom.js';

class View
{
	#controller
	#ctx;
	
	constructor(controller)
	{
		this.#controller = controller;
		
		//a few visual appearance things to take care of
		this.#ctx = dom.playfield.getContext(`2d`);
		dom.playfield.height = 500;
		dom.playfield.width = 500;
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
	
	
	setCurrentPlayer(currentPlayer)
	{
		dom.currentPlayerLabels.forEach(function(el) 
		{
			el.innerText = currentPlayer.getName();
			el.style.color = colourTable[currentPlayer.getColour()];
		});

		let shadow = currentPlayer.getColour() + 4;
		// console.log(shadow);
		dom.currentPlayerLabels[1].style.textShadow = `1px 1px ${colourTable[currentPlayer.getColour()+4]}`;
	}
}

export { View }