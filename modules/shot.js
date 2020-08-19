class Shot
{
  #armedPoint;
  #angle;
  #gravity = -3;
  #hit = false;
  #landscape;
  #player;
  #players;
  #power;
  #shotpath;
  #wind = 0;      //positive values push right, etc. 10 is practical maximum.


  constructor(shotDetails)
  {
    this.#angle = this.degToRad(shotDetails.angle);
    this.#power = shotDetails.power;
    this.#player = shotDetails.player;
    this.#players = shotDetails.players;
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
    let done = false;
    let step = 0;
    let stepsize = 0.01;
    let landpoints = this.#landscape.getAllpoints();
    let shotpath = [];
    let player = this.#player;
    let armed = false;
    let launchboxWidth = player.getWidth();
    let launchboxHeight = player.getHeight();
    let initX = player.getPosition().x;
    let initY = player.getPosition().y;

    function checkSafeToArm(shotpoint)
    {
      if (shotpoint.x > (initX + launchboxWidth)) return true;
      if (shotpoint.x < (initX - launchboxWidth)) return true;
      if (shotpoint.y > (initY + launchboxHeight)) return true;
      if (shotpoint.y < (initY - launchboxHeight)) return true;
      return false;
    }

    function checkPlayerHit(players, shotpoint)
    {
      let hitCriteria = 0;
      let hitDetected = false;
      players.forEach(function (target)
      {
        if (shotpoint.x < (target.getPosition().x + ((target.getWidth() -1)/ 2))
          && shotpoint.x > (target.getPosition().x - ((target.getWidth() -1)/ 2)))
          hitCriteria += 1;

        if (shotpoint.y < (target.getPosition().y + ((target.getHeight() -1)/ 2))
          && shotpoint.y > (target.getPosition().y - ((target.getHeight() -1)/ 2)))
          hitCriteria += 1;

        if (hitCriteria == 2) hitDetected = true;
        else hitCriteria = 0;
      })

      return hitDetected;
    }

    while (!done)
    {
      let shotpoint = this.makeShotpoint(step);
      shotpath.push(shotpoint);

      //shot only arms itself after leaving firing player's proximity
      if (armed == false && checkSafeToArm(shotpoint))
      {
        armed = true;
        this.#armedPoint = shotpoint;
        step += stepsize;
      }

      //BRANCHING CONDITIONS
      //shot goes off side of screen -- maybe allow this at a later point
      if (shotpoint.x > (landpoints.length - 1) || shotpoint.x < 0) done = true;

      //shot hits the dirt, let it sink into the dirt a little bit
      else if (shotpoint.y < (landpoints[shotpoint.x].y - 2)) done = true;

      //shot hits bottom of canvas
      else if (shotpoint.y < 0) done = true;

      //shot hits any player after arming, including self
      else if (checkPlayerHit(this.#players, shotpoint) == true && armed == true) 
      {
        this.#hit = true;
        done = true;
      }

      //step can be lowered to increase resolution and vice-versa.
      //this is independent of how accurately that gets rendered to canvas though.
      //to adjust number of these points that get rendered, see plotShotpath in View.
      else step += stepsize;
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

  getHitStatus()
  {
    return this.#hit;
  }

  getArmedPoint()
  {
    return this.#armedPoint;
  }

  getPlayer()
  {
    return this.#player;
  }
}

export { Shot };