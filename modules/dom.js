// dom.js
export const dom =
{
	angleInputs:					document.getElementsByClassName(`inp-angle`),
	fireButtons:					document.querySelectorAll(`.btn-fire`),
	startButtons:					document.querySelectorAll(`.btn-start`),
	mainmenuForm:					document.getElementById(`mainmenu-form`),
	messagebox:						document.getElementById(`messagebox`),
	messageboxText:				document.getElementById(`messagebox-textarea`),
	messageboxOKButton:		document.getElementById(`messagebox-ok`),
	nameInputs:						document.querySelectorAll(`.inp-player`),
	currentPlayerLabels:	document.querySelectorAll(`.lbl-currentplayer`),
	windLabels:						document.querySelectorAll(`.lbl-wind`),
	playerLabels:					document.querySelectorAll(`.lbl-player`),
	playfield:						document.getElementById(`playfield`),
	powerInputs:					document.getElementsByClassName(`inp-power`)
}