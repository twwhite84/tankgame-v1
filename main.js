//main.js

import { UI } from './modules/UI.js';
import { Game } from './modules/game.js';

let domURL = './dom.json';
let domOBJ = new XMLHttpRequest();
domOBJ.open('GET', domURL);
domOBJ.responseType = 'json';
domOBJ.send();
domOBJ.onload = function()
{
	
	let dom = domOBJ.response;

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


}