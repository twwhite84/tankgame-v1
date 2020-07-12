//main.js

import { UI } from './modules/UI.js';
import { Game } from './modules/game.js';

let dom =
{
	playfield:			document.getElementById(`playfield`),
	playfieldCtx:		document.getElementById(`playfield`).getContext(`2d`),
	buttons:
	{
		fire:
		{
			fireTB: 		document.getElementById(`topbar-fire-btn`),
			fireSB:			document.getElementById(`sidebar-fire-btn`)
		},
		
		start:				document.getElementById(`mainmenu-start-btn`),
	},
	
	inputs:
	{
		p1name:				document.getElementById(`mainmenu-pone-input`),
		p2name: 			document.getElementById(`mainmenu-ptwo-input`)
	},
	
	labels:
	{
		player:
		{
			currentTB:	document.getElementById(`topbar-player-current`),
			currentSB:	document.getElementById(`sidebar-player-current`)
		}
	}
	
}

//set up listeners
Object.keys(dom.buttons.fire).forEach(item => dom.buttons.fire[item].addEventListener(`click`, fire));
dom.buttons.start.addEventListener(`click`, start);

//create a UI object to handle updates to view
let ui = new UI(dom);

function start()
{
	console.log(`start button was clicked`);
	let game = new Game(dom.inputs.p1name.value, dom.inputs.p2name.value);
	ui.updateCurrentPlayer(game.getCurrentPlayer());
}


function fire()
{
	console.log(`a fire button was clicked`);
}

