class Player
{
  #rotation = 0;
  #colour = 0;
  #game;
  #health = 100;
  #height = 0;
  #name = ``;
  #position = { x: 0, y: 0 };
  #width = 0;

  constructor(game)
  {
    if (typeof game === undefined) throw Error;
    else this.#game = game;
  }

  getColour() { return this.#colour; }
  setColour(colour) { this.#colour = colour; }

  getHealth() { return this.#health; }
  setHealth(health) { this.#health = health; }

  getHeight() { return this.#height; }
  setHeight(height) { this.#height = height; }

  getName() { return this.#name; }
  setName(name) { this.#name = name; }

  getPosition() { return this.#position; }
  setPosition(x, y) { this.#position.x = x; this.#position.y = y; }

  getRotation() { return this.#rotation; }
  setRotation(rotation) { this.#rotation = rotation; }

  getWidth() { return this.#width; }
  setWidth(width) { this.#width = width; }

  setRandomPosition(allpoints)
  {
    let index = Math.round(Math.random() * allpoints.length);
    let coordinate = allpoints[index];
    let x = Math.round(coordinate.x);
    let y = Math.round(coordinate.y);
    this.#position = { x: x, y: y };
  }

  updateRotation()
  {
    let allpoints = this.#game.getLandscape().getAllpoints();
    let x = this.#position.x;
    let y = this.#position.y;
    let obj = { "x": x, "y": y };
    let index = allpoints.findIndex(element => element.x === obj.x);
    if (index > 0)
    {
      let prevPoint = allpoints[index - 1];
      let nextPoint = allpoints[index + 1];
      let deltaX = nextPoint.x - prevPoint.x;
      let deltaY = nextPoint.y - prevPoint.y;
      let rotRad = Math.atan(deltaY/deltaX);
      this.#rotation = rotRad;
    }
    
  }

}

export { Player };