import { DOM } from './dom.js';

class Controller
{
	constructor()
	{
		
	}
	
	let ui = new UI();
	let game = new Game(ui);

	//button listeners
	dom.frmMenu.forEach(el => el.addEventListener(`submit`, frmSubmit));
	dom.btnFire.forEach(el => el.addEventListener(`click`, btnFire));


	function frmSubmit(event)
	{
		event.preventDefault();
		try { game.initGame(ui.getPlayerNames()) }
		catch(error) { console.log(error) };
	}


	function btnFire()
	{
		console.log(`fire not yet implemented`);
	}

}

export { Controller }