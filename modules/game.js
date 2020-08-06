// game.js -- game state/behaviour
import { Landscape } from './landscape.js';
import { Player } from './player.js';
import { Shot } from './shot.js';

class Game 
{
  #currentPlayer = null;
  #landscape = null;
  #currentShot = [];
  #players = [];
  #playerDimensions;

  addPlayer(playerName) 
  {
    //validation
    if (playerName.length == 0 && this.#players.length == 0)
      throw new Error(`Player 1 must be entered. Additional players optional.`)

    else if (playerName.length == 0)
      return

    //successful
    else 
    {
      let player = new Player();
      player.setName(playerName);
      player.setColour(this.#players.length + 1);
      player.setRandomPosition(this.#landscape.getAllpoints());
      this.#players.push(player);
    }
  }


  getPlayers() 
  {
    return this.#players;
  }


  setPlayers(players) 
  {
    players.forEach(playerName => this.addPlayer(playerName));
    this.setCurrentPlayer(1);
  }


  testPixelSet() 
  {
    let pixelSet = [];
    for (let i = 0; i < 500; i++) 
    {
      pixelSet.push({ x: i, y: i });
    }

    return pixelSet;
  }


  getCurrentPlayer() 
  {
    return this.#currentPlayer;
  }


  setCurrentPlayer(playerNumber) 
  {
    let index = playerNumber - 1;
    this.#currentPlayer = this.#players[index];
  }


  makeLandscape(ctxWidth, ctxHeight) 
  {
    this.#landscape = new Landscape(ctxWidth, ctxHeight);
    this.#landscape.generatePoints(5);
  }


  getLandscape() 
  {
    return this.#landscape;
  }


  setCurrentShot(shotDetails) 
  {
    //input validation
    let angleFail = true;
    let powerFail = true;
    let error = "";
    let validatedAngle = 0;
    let validatedPower = 0;

    shotDetails.angles.forEach(function (angle)
    {
      if (typeof angle == "number" && isNaN(angle) == false)
      {
        angleFail = false;
        validatedAngle = angle;
      }
    });

    shotDetails.powers.forEach(function (power)
    {
      if (typeof power == "number" && isNaN(power) == false)
      {
        if (power > 100 || power < 0)
          error += `Power must be between 0 and 100. `;

        else
        {
          powerFail = false;
          validatedPower = power;
        }
      }
    });

    if (angleFail) error += `Please check angle input. `;
    if (powerFail) error += `Please check power input. `;
    if (angleFail || powerFail) throw Error(error);

    //validation successful
    else
    {
      let validated =
      {
        angle: validatedAngle,
        power: validatedPower,
        player: this.#currentPlayer,
        landscape: this.#landscape
      }
      this.#currentShot = new Shot(validated);
    }
  }


  cyclePlayer()
  {
    let currentPlayer = this.getCurrentPlayer();
    let players = this.getPlayers();
    let currentPlayerNumber = players.indexOf(currentPlayer) + 1;

    //set currentplayer to the next player in players
    if ((currentPlayerNumber + 1) > players.length)
      this.setCurrentPlayer(1);

    else this.setCurrentPlayer(currentPlayerNumber + 1);
  }


  getCurrentShot() 
  {
    return this.#currentShot;
  }
}

export { Game }