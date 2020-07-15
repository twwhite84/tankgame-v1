//ui.js -- VIEW CLASS
import { Dom } from './dom.js';

class UI
{
	#dom;
	#ctx;
	
	constructor()
	{
		this.#dom = Dom;
		this.#dom.playfield[0].height = 400;
		this.#dom.playfield[0].width = 400;
		
		//context for canvas specific to instance of ui
		this.#ctx = this.#dom.playfield[0].getContext(`2d`);
	}
	
	
	closeMenu()
	{
		this.#dom.divMenu[0].style.display = 'none';
	}
	
	
	getDom()
	{
		return this.#dom;
	}
	
	
	setCurrentPlayer(currentPlayer)
	{
	}
	
	
	getPlayerNames()
	{
		return Array.from(Dom.inpName).map((el)=>el.value);
	}
	
	
	plotPixel(x, y)
	{
		y = this.#dom.playfield[0].height - y;
		let myImageData = this.#ctx.createImageData(1, 1);
		for (let i = 0; i <=3; i++)
		{
			myImageData.data[i] = 255;
		}
		this.#ctx.putImageData(myImageData, Math.round(x), Math.round(y));
	}
	
	
	//test function to make sure context height/width is 1:1 with viewport
	testCanvas()
	{
		for (let i = 0; i <= 400; i++)
		{
			this.plotPixel(i, i);
		}
	}
}

export { UI }