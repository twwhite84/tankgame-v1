//ui.js -- VIEW CLASS
import { Dom } from './dom.js';

class UI
{
	#dom;
	
	constructor()
	{
		this.#dom = Dom;
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
		y = canvas.height - y;
		let myImageData = ctx.createImageData(1, 1);
		for (let i = 0; i <=3; i++)
		{
			myImageData.data[i] = 255;
		}
		// this.#DOMElements[ctx].putImageData(myImageData, Math.round(x), Math.round(y));
	}
}

export { UI }