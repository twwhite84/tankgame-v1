// controller.js -- request handler, informs game and view
import { View } from './view.js';
import { Game } from './game.js';

class Controller 
{
  #view;
  #game;

  constructor() 
  {
    this.#view = new View(this);
  }


  startGame() 
  {
    event.preventDefault();
    try 
    {
      let canvasDimensions =
      {
        width: this.#view.getCanvas().width,
        height: this.#view.getCanvas().height
      }

      this.#game = new Game(canvasDimensions);

      this.#game.makeLandscape(5);
      this.#view.plotLandscape(this.#game.getLandscape());

      //player setup and display
      let playerNames = this.#view.getPlayerNames();

      this.#game.setPlayers(playerNames);
      this.#view.setCurrentPlayer(this.#game.getCurrentPlayer());
      this.#view.plotPlayers(this.#game.getPlayers());

      this.#view.toggleMainmenu();
    }

    catch (error) 
    {
      this.#view.clearCanvas();
      this.#view.showMessage(error);
    }
  }


  messageboxOK() 
  {
    this.#view.toggleMessagebox();
  }


  fire() 
  {
    try 
    {
      if (this.#game == null) throw Error(`No game in progress.`);

      let angles = this.#view.getAngleInputs();
      let powers = this.#view.getPowerInputs();

      this.#game.setCurrentShot(angles, powers);
      let shot = this.#game.getCurrentShot();
      let shotpath = shot.getShotpath();
      this.#view.plotSet(shotpath, function ()
      {
        //do below after firing animation completes
        let hitResult = shot.getHitStatus();
        if (hitResult == true) console.log(`HIT!!!`);
        
        this.#view.plotExplosion(shotpath[shotpath.length-1]);
        this.#game.cyclePlayer();
        this.#view.setCurrentPlayer(this.#game.getCurrentPlayer());

      }.bind(this));
    }

    catch (error) 
    { this.#view.showMessage(error); }
  }

}

export { Controller }