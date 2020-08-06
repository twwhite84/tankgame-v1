class Shot
{
  #angle;
  #gravity = -3;
  #landscape;
  #player;
  #power;
  #shotpath;
  #wind = 0;      //positive values push right, etc. 10 is practical maximum.


  constructor(shotDetails)
  {
    this.#angle = this.degToRad(shotDetails.angle);
    this.#power = shotDetails.power;
    this.#player = shotDetails.player;
    this.#landscape = shotDetails.landscape;

    this.makeShotpath();
  }


  //calculates the current position of the projectile for a given step
  makeShotpoint(step)
  {
    let initVelX = Math.cos(this.#angle) * this.#power;
    let initVelY = Math.sin(this.#angle) * this.#power;
    let velGrav = this.#gravity * step;
    let velWind = this.#wind * step;
    let crntVelX = initVelX + velWind;
    let crntVelY = initVelY + velGrav;
    let x = this.#player.getPosition().x + step * crntVelX;
    let y = this.#player.getPosition().y + step * crntVelY;

    return {
      x: Math.round(x),
      y: Math.round(y)
    }
  }


  //creates an array of coordinates by caling makeShotpoint for successive steps
  makeShotpath()
  {
    let collisionPoint = null;
    let done = false;
    let step = 0;
    let landpoints = this.#landscape.getAllpoints();
    let shotpath = [];

    while (!done)
    {
      let shotpoint = this.makeShotpoint(step);
      shotpath.push(shotpoint);

      //shot goes off side of screen -- maybe allow this at a later point
      if (shotpoint.x > (landpoints.length - 1) || shotpoint.x < 0) done = true;

      //shot hits the dirt, let it sink into the dirt a little bit
      else if (shotpoint.y < (landpoints[shotpoint.x - 1].y - 2)) done = true;

      //shot hits bottom of canvas
      else if (shotpoint.y < 0) done = true;

      //step can be adjusted to increase or decrease point density
      else step += 0.01;
    }

    this.#shotpath = shotpath;
  }


  degToRad(deg)
  {
    return deg * Math.PI / 180;
  }


  getShotpath()
  {
    return this.#shotpath;
  }

}

export { Shot };