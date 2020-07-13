//main.js -- CONTROLLER CLASS
import { Game } from './modules/game.js';
import { UI } from './modules/ui.js';

let ui = new UI();
let game = new Game(ui);

//button listeners
ui.getDom().btnStart.forEach(el => el.addEventListener(`click`, btnStart));
ui.getDom().btnFire.forEach(el => el.addEventListener(`click`, btnFire));


function btnStart()
{
	game.initGame();
}


function btnFire()
{
	console.log(`fire not yet implemented`);
}