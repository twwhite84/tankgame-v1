//this module has to do with GUI updates
class UI
{
	#dom;
	#p1;
	#p2;
	
	constructor(dom)
	{
			this.#dom = dom;
	}
	
	
	updatePlayers(p1, p2)
	{
		this.#p1 = p1;
		this.#p2 = p2;
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