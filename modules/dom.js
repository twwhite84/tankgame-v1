export const Dom =
{
	playfield:			document.getElementById(`playfield`),
	playfieldCtx:		document.getElementById(`playfield`).getContext(`2d`),
	buttons:
	{
		fire:
		{
			fireTB: 		document.getElementById(`topbar-fire-btn`),
			fireSB:			document.getElementById(`sidebar-fire-btn`)
		},
		
		start:				document.getElementById(`mainmenu-start-btn`),
	},
	
	inputs:
	{
		p1name:				document.getElementById(`mainmenu-pone-input`),
		p2name: 			document.getElementById(`mainmenu-ptwo-input`)
	},
	
	labels:
	{
		player:
		{
			currentTB:	document.getElementById(`topbar-player-current`),
			currentSB:	document.getElementById(`sidebar-player-current`)
		},
		
		wind:
		{
			windTB:			document.getElementById(`topbar-wind-label`),
			windSB:			document.getElementById(`sidebar-wind-label`)
		}
	}
}