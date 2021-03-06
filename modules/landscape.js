// landscape.js
class Landscape
{
  #allpoints = [];
  #keypoints = [];
  #ctxWidth;
  #ctxHeight;

  constructor(ctxWidth, ctxHeight)
  {
    this.#ctxWidth = ctxWidth;
    this.#ctxHeight = ctxHeight;
  }


  generatePoints(keypointQuantity)
  {
    this.#keypoints = this.generateKeypoints(keypointQuantity);
    this.#allpoints = this.generateAllpoints(this.#keypoints);
  }


  generateKeypoints(keypointQuantity)
  {
    let xArray = [];
    let yArray = [];
    let keypoints = [];

    for (let i = 0; i < keypointQuantity; i++)
    {
      let x = Math.round(Math.random() * this.#ctxWidth);
      let y = Math.round(Math.random() * this.#ctxHeight);
      xArray.push(x);
      yArray.push(y);
    }

    xArray = xArray.sort((a, b) => a - b);

    for (let i = 0; i < keypointQuantity; i++)
    {
      keypoints.push({ "x": xArray[i], "y": yArray[i] });
    }

    keypoints.unshift({ "x": 0, "y": 0 });
    keypoints.push({ "x": this.#ctxWidth, "y": 0 });

    return keypoints;
  }


  generateAllpoints(keypoints)
  {
    let climbRate = null;
    let kpIndex = 0;
    let differenceX = 0;
    let differenceY = 0;
    let xElapsed = 0;
    let allpoints = [];

    for (let column = 0; column < this.#ctxWidth; column++)
    {
      if (column == keypoints[kpIndex].x)
      {
        allpoints.push({ "x": column, "y": keypoints[kpIndex].y });
        if (kpIndex < keypoints.length - 1)
        {
          kpIndex++;
        }
        else continue;
        climbRate = null;
        xElapsed = 0;
      }
      else
      {
        if (climbRate == null)
        {
          differenceX = keypoints[kpIndex].x - keypoints[kpIndex - 1].x;
          differenceY = keypoints[kpIndex].y - keypoints[kpIndex - 1].y;
          climbRate = differenceY / differenceX;
          xElapsed = 1;
          allpoints.push({ "x": column, "y": keypoints[kpIndex - 1].y + climbRate * xElapsed });
          xElapsed++;
        }
        else
        {
          allpoints.push({ "x": column, "y": keypoints[kpIndex - 1].y + climbRate * xElapsed });
          xElapsed++;
        }
      }
    }
    allpoints.push(keypoints[keypoints.length-1]);
    return allpoints;
  }


  getAllpoints() { return this.#allpoints; }

  getKeypoints() { return this.#keypoints; }

  getCtxWidth() { return this.#ctxWidth; }

  getCtxHeight() { return this.#ctxHeight; }


  deformLandscape(matchpoint, angleOfImpact)
  {
    //rewrite this function so angleOfImpact is perpendicular to
    //the digging.

    //doing this will require taking a slice of a full circle
    //from 90 deg one side of angleOfImpact to 90 deg other side

    let radius = 20;

    //points i need to alter
    let start = matchpoint.x - radius;
    let end = matchpoint.x + radius;
    let landslice = this.#allpoints.slice(start, end);


    //going positive along x, bottom-right half of circle
    let quadI = [];
    let quadII = [];
    let quadIII = [];
    let quadIV = [];

    //acos gives us angle from position along x-axis
    //sineing it then gives relative y position
    for (let i = 0; i < radius; i++)
    {
      quadI.unshift(+(Math.sin(Math.acos(i / radius))) * radius);
      quadII.push(+(Math.sin(Math.acos(i / radius))) * radius);
      quadIII.unshift(-(Math.sin(Math.acos(i / radius))) * radius);
      quadIV.push(-(Math.sin(Math.acos(i / radius))) * radius);
    }

    

    //maybe change this function to always dig perpendicular to slope?
    //or else focus the digging along angle of projectile at the time?
    //can i get the angle of the projectile at time of impact from shot?
    let alteredPoints = [];

    for (let i = 0; i < quadIII.length; i++)
    {
      let x = landslice[i].x;
      let y = landslice[i].y + quadIII[i];
      let newpoint = { "x": x, "y": y };
      alteredPoints.push(newpoint);
    }

    for (let i = 0; i < quadIII.length; i++)
    {
      let x = landslice[radius + i].x;
      let y = landslice[radius + i].y + quadIV[i];
      let newpoint = { "x": x, "y": y };
      alteredPoints.push(newpoint);
    }

    /////////////////////////////////////////////////

    let angleRounded = Math.round(angleOfImpact);
    let angleSliceStart = angleRounded - 90;
    let angleSliceEnd = angleRounded + 90;
    let entries = [];



    for (let i = angleSliceStart; i < angleSliceEnd; i++)
    {
      //need function to slide along radius possible math.atan

      let result = { "x": Math.cos(i) * radius, "y": Math.sin(i) * radius };

      entries.push(result);
    }

    console.log(entries);

    ////////////////////////////////////////////////////

    //write altered points back into allpoints
    let j = 0;
    for (let i = start; i < end; i++)
    {
      this.#allpoints[i] = alteredPoints[j];
      j++;
    }

  }
}

export { Landscape }