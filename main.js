import { Game } from './modules/game.js';
import { UI } from './modules/UI.js';

//set up event listeners
let ui = new UI();
console.log(ui.getDOMElements());

// function start()
// {
	// let playerOne = document.getElementById(`mainmenu-player-one`).value;
	// let playerTwo = document.getElementById(`mainmenu-player-two`).value;
	
	// document.getElementById('mainmenu').style.display = 'none';
	
	// console.log(`P1: ${playerOne}`);
	// console.log(`P2: ${playerTwo}`);
	
	// document.getElementById('topbar-player-current').innerText = playerOne;
	// document.getElementById(`sidebar-player-current`).innerText = playerOne;
	
	// let newGame = new Game(playerOne, playerTwo);
	// console.log(newGame.getCurrentPlayer());
	// console.log(newGame.currentPlayer);
	
	// newGame.testLoop();
// }