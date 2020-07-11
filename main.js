//main.js

import { UI } from './modules/UI.js';
import { Game } from './modules/game.js';

let dom =
{
	canvas:			document.getElementById(`playfield`),
	ctx:				document.getElementById(`playfield`).getContext(`2d`),
	buttons:
	{
		fire:
		{
			fireTB: document.getElementById(`topbar-fire-btn`),
			fireSB:	document.getElementById(`sidebar-fire-btn`),
		},
		
		start:		document.getElementById(`mainmenu-start-btn`),
	},
	
	inputs:
	{
		p1name:		document.getElementById(`mainmenu-input-pone`),
		p2name: 	document.getElementById(`mainmenu-input-ptwo`)
	}
}

//set up listeners
let ui = new UI(dom);

let fireButtons = dom.buttons.fire;
Object.keys(fireButtons).forEach(function(item) { console.log(fireButtons[item] }));
// dom.buttons.fire.forEach(el=>el.addEventListener(`click`, fire));
// dom.buttons.startBtn.addEventListener(`click`, start);


function start()
{
	console.log(`a start button was clicked`);
	// ui.updatePlayers(dom.inputs.pOneName, dom.inputs.pTwoName);
}


function fire()
{
	console.log(`a fire button was clicked`);
}

