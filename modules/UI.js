//ui.js -- VIEW CLASS
import { Dom } from './dom.js';

class UI
{
	#uiDom;
	#ctx;
	
	constructor()
	{
		this.#uiDom = Dom;
		this.#uiDom.playfield[0].height = 400;
		this.#uiDom.playfield[0].width = 400;
		
		//context for canvas specific to instance of ui
		this.#ctx = this.#uiDom.playfield[0].getContext(`2d`);
	}
	
	//should i add separate getter/setter methods for everything?
	
	
	closeMenu()
	{
		this.#uiDom.divMenu[0].style.display = 'none';
	}
	
	
	//probably will replace this with individual getters/setters
	getDom()
	{
		return this.#uiDom;
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
		y = this.#uiDom.playfield[0].height - y;
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