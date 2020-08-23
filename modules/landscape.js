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
    return allpoints;
  }


  getAllpoints() { return this.#allpoints; }

  getKeypoints() { return this.#keypoints; }

  getCtxWidth() { return this.#ctxWidth; }

  getCtxHeight() { return this.#ctxHeight; }


  deformLandscape(matchpoint)
  {
    let radius = 20;

    //points i need to alter
    let start = matchpoint.x - 20;
    let end = matchpoint.x + 21;
    let landslice = this.#allpoints.slice(start, end);


    //going positive along x, bottom-right half of circle
    let circleQuadIII = [];
    let circleQuadIV = [];
    for (let i = 0; i < radius + 1; i++)
    {
      circleQuadIII.unshift(-(Math.sin(Math.acos(i / radius))) * radius);
      circleQuadIV.push(-(Math.sin(Math.acos(i / radius))) * radius);
    }

    let alteredPoints = [];
    for (let i = 0; i < circleQuadIII.length; i++)
    {
      let x = landslice[i].x;
      let y = landslice[i].y + circleQuadIII[i];
      let newpoint = { "x": x, "y": y };
      alteredPoints.push(newpoint);
    }

    for (let i = 1; i < circleQuadIII.length; i++)
    {
      let x = landslice[radius + i].x;
      let y = landslice[radius + i].y + circleQuadIV[i];
      let newpoint = { "x": x, "y": y };
      alteredPoints.push(newpoint);
    }


    //write alterpoints back into allpoints
    let j = 0;
    for (let i = start; i < end; i++)
    {
      this.#allpoints[i] = alteredPoints[j];
      j++;
    }

    console.log(this.#allpoints.slice(start, end));
  }
}

export { Landscape }