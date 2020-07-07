console.log('main.js loaded');

import { Game } from './modules/game.js';

document.getElementById('topbar-fire-btn').addEventListener('click', fire);
document.getElementById(`mainmenu-start-btn`).addEventListener('click', start);

function fire()
{
	console.log(`fire pressed`);
}

function start()
{
	let playerOne = document.getElementById(`mainmenu-player-one`).value;
	let playerTwo = document.getElementById(`mainmenu-player-two`).value;
	
	document.getElementById('mainmenu').style.display = 'none';
	
	console.log(`P1: ${playerOne}`);
	console.log(`P2: ${playerTwo}`);
	
	document.getElementById('topbar-player-current').innerText = playerOne;
	document.getElementById(`sidebar-player-current`).innerText = playerOne;
	
	let newGame = new Game(playerOne, playerTwo);
	console.log(newGame.getCurrentPlayer());
	console.log(newGame.currentPlayer);
	
	gameLoop();
}


function gameLoop()
{
	let canvas = document.getElementById(`playfield`);
	let ctx = canvas.getContext('2d');
}

