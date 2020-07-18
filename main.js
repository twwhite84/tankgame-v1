//main.js -- CONTROLLER CLASS
import { Game } from './modules/game.js';
import { UI } from './modules/ui.js';

let ui = new UI();
let dom = ui.getDom();
let game = new Game(ui);

//button listeners
dom.btnStart.forEach(el => el.addEventListener(`click`, btnStart));
dom.frmMenu.forEach(el => el.addEventListener(`submit`, frmSubmit));
dom.btnFire.forEach(el => el.addEventListener(`click`, btnFire));


function btnStart()
{
	try { game.initGame(ui.getPlayerNames()) }
	catch(error) { console.log(error) };
}


function frmSubmit(event)
{
	btnStart();
	event.preventDefault();
}


function btnFire()
{
	console.log(`fire not yet implemented`);
}