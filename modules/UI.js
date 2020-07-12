import { Dom } from './dom.js';

//this module has to do with view updates
class UI
{
	
	static updateCurrentPlayer(cp)
	{
		Dom.labels.player.currentTB.innerText = cp;
		Dom.labels.player.currentSB.innerText = cp;
		console.log(`test of static method`);
	}
	
	
	btnFire()
	{
		console.log(`fire button clicked`);
	}
	
	
	btnStart()
	{
		document.getElementById('mainmenu').style.display = 'none';
		let p1 = document.getElementById('mainmenu-player-one').value;
		let p2 = document.getElementById('mainmenu-player-two').value;
		let currentGame = new Game(p1, p2);
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