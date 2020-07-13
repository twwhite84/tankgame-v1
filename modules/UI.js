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
	
	
	updateCurrentPlayer(currentPlayer)
	{
		// Dom.labels.player.currentTB.innerText = currentPlayer;
		// Dom.labels.player.currentSB.innerText = currentPlayer;
	}
	
	
	getPlayerNames()
	{
		return Dom.inpName;
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