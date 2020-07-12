//main.js
import { Dom } from './modules/dom.js';
import { UI } from './modules/UI.js';
import { Game } from './modules/game.js';

//set up listeners
Object.keys(Dom.buttons.fire).forEach(item => Dom.buttons.fire[item].addEventListener(`click`, fire));
Dom.buttons.start.addEventListener(`click`, start);

//create a UI object to handle updates to view
let ui = new UI(Dom);


function start()
{
	console.log(`start button was clicked`);
	let game = new Game(Dom.inputs.p1name.value, Dom.inputs.p2name.value);
	ui.updateCurrentPlayer(game.getCurrentPlayer());
}


function fire()
{
	console.log(`a fire button was clicked`);
}