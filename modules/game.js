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
  #playfieldWidth = 0;
  #playfieldHeight = 0;

  constructor(canvasDimensions)
  {
    this.#playfieldWidth = canvasDimensions.width;
    this.#playfieldHeight = canvasDimensions.height;
  }

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
      let player = new Player(this);
      player.setName(playerName);
      player.setColour(this.#players.length + 1);
      player.setRandomPosition(this.#landscape.getAllpoints());
      player.setWidth(this.#playfieldHeight / 25);
      player.setHeight(this.#playfieldHeight / 25); //intentional -- i want a square tank
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


  getCurrentPlayer() 
  {
    return this.#currentPlayer;
  }


  setCurrentPlayer(playerNumber) 
  {
    let index = playerNumber - 1;
    this.#currentPlayer = this.#players[index];
  }


  makeLandscape(keypointQuantity = 1) 
  {
    this.#landscape = new Landscape(this.#playfieldWidth, this.#playfieldHeight);
    this.#landscape.generatePoints(keypointQuantity);
  }


  getLandscape() 
  {
    return this.#landscape;
  }


  setCurrentShot(angles, powers) 
  {
    //input validation
    let angleFail = true;
    let powerFail = true;
    let error = "";
    let validatedAngle = 0;
    let validatedPower = 0;

    angles.forEach(function (angle)
    {
      if (typeof angle == "number" && isNaN(angle) == false)
      {
        angleFail = false;
        validatedAngle = angle;
      }
    });

    powers.forEach(function (power)
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
        players: this.#players,
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