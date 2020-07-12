//main.js -- CONTROLLER CLASS
import { Dom } from './modules/dom.js';
import { Game } from './modules/game.js';
import { UI } from './modules/ui.js';

//button listeners
Dom.btnFire.forEach(el => el.addEventListener(`click`, fire));
Dom.btnStart.forEach(el => el.addEventListener(`click`, start));


function start()
{
	//check if user has entered names
	let p1 = Dom.inpP1Name[0].value;
	let p2 = Dom.inpP2Name[0].value;
	if (p1 == `` || p2 == ``)
	{
		alert(`Please enter names for both players`);
	}
	else
	{
		//add names to the game
		let game = new Game(p1, p2);
		
		//clear the menu

	}
	
	
	
	//just draw a random line across screen for now
}


function fire()
{
	//is a game in progress?
	
	//has user entered valid input?
	
	//create a new shot
	
	//calculate trajectory and stuff
	
	//will it hit anything? update game accordingly
	
	//draw the shot
}