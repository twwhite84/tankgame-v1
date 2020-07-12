//main.js
import { Dom } from './modules/dom.js';
import { UI } from './modules/UI.js';
import { Game } from './modules/game.js';

//set up listeners
Object.keys(Dom.buttons.fire).forEach(item => Dom.buttons.fire[item].addEventListener(`click`, fire));
Dom.buttons.start.addEventListener(`click`, start);


function start()
{
	console.log(`start button was clicked`);
	let game = new Game(Dom.inputs.p1name.value, Dom.inputs.p2name.value);
	
}


function fire()
{
	console.log(`a fire button was clicked`);
}