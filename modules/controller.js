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
    try 
    {
      if (this.#game == null) throw Error(`No game in progress.`);

      let angles = this.#view.getAngleInputs();
      let powers = this.#view.getPowerInputs();

      this.#game.setCurrentShot(angles, powers);
      let shot = this.#game.getCurrentShot();
      this.#view.plotShot(shot, playExplosion.bind(this));

      //after bullet animation, play explosion animation
      function playExplosion()
      {
        let shotpath = shot.getShotpath();
        let coordinates = shotpath[shotpath.length-1];
        this.#view.plotExplosion(coordinates, roundOver.bind(this));
      }

      //after explosion, figure out what game does next
      function roundOver()
      {
        this.#view.clearCanvas();
        

        //landscape update should go here
        
        //get the last point in the shotpath
        //THIS SHOULD ALL GO IN ANOTHER FUNCTION BTW!!!
        let shot = this.#game.getCurrentShot();
        let shotpath = shot.getShotpath();
        let explosionpoint = shotpath[shotpath.length-1];
        let landscape = this.#game.getLandscape();
        let landpoints = landscape.getAllpoints();
        let matchpoint = landpoints.filter(point => point.x == explosionpoint.x);

        //check the impact angle
        let deltaY = shotpath[shotpath.length-1].y - shotpath[shotpath.length-10].y;
        let deltaX = shotpath[shotpath.length-1].x - shotpath[shotpath.length-10].x;
        let angleOfImpactRad = Math.atan(deltaY/deltaX);
        let angleOfImpact = angleOfImpactRad * (180/Math.PI);

        if (!(matchpoint.length === 0 || matchpoint.y === 0))
        {
          landscape.deformLandscape(matchpoint[0], angleOfImpact);
        }

        //drop the player position to match new landscape
        this.#view.plotPlayers(this.#game.getPlayers());
        this.#view.plotLandscape(this.#game.getLandscape());

        
        

        let hitStatus = shot.getHitStatus();
        console.log(`hit: ${hitStatus}`);
        this.#game.cyclePlayer();
        this.#view.setCurrentPlayer(this.#game.getCurrentPlayer());
        this.#game.setRandomWind();
        this.#view.setWind(this.#game.getWind());
      }
    }

    catch (error)
    { this.#view.showMessage(error); }
  }

}

export { Controller }