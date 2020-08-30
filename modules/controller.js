// controller.js -- request handler, informs game and view
import { View } from './view.js';
import { Game } from './game.js';
import { Landscape } from './landscape.js';

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
      this.#view.clearCanvas();
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
    let game = this.#game;
    let view = this.#view;

    try 
    {
      if (game == null) throw Error(`No game in progress.`);

      let angles = view.getAngleInputs();
      let powers = view.getPowerInputs();
      game.setCurrentShot(angles, powers);

      let shot = game.getCurrentShot();
      let shotpath = shot.getShotpath();

      //first callback
      let playExplosion = () =>
      {
        let coordinates = shotpath[shotpath.length - 1];
        view.plotExplosion(coordinates, roundOver);
      }

      //last callback
      let roundOver = () =>
      {
        view.clearCanvas();
        game.getLandscape().deformLandscape(shotpath);

        //drop the player position to match new landscape
        view.plotPlayers(game.getPlayers());
        view.plotLandscape(game.getLandscape());

        let hitStatus = shot.getHitStatus();
        console.log(`hit: ${hitStatus}`);
        game.cyclePlayer();
        view.setCurrentPlayer(game.getCurrentPlayer());
        game.setRandomWind();
        view.setWind(game.getWind());
      }

      view.plotShot(shot, playExplosion);
    }

    catch (error)
    { view.showMessage(error); }
  }

}

export { Controller }