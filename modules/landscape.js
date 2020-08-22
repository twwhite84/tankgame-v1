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
    let quadrantIV = [];
    let radius = 20;

    function degreesToRadians(degrees)
    {
      let radians = degrees * (Math.PI / 180);
      return radians;
    }

    //quadrant IV
    for (let i = 0; i <= 90; i++)
    {
      let coordinates = {};
      coordinates.x = Math.cos(degreesToRadians(i)) * radius;
      coordinates.y = Math.sin(degreesToRadians(i)) * radius;
      quadrantI.push(coordinates);
    }

    //points i need to alter
    let start = matchpoint.x - 20;
    let end = matchpoint.x + 20;
    let mySlice = this.#allpoints.slice(start, end);

    //
    console.log(mySlice);

  }
}

export { Landscape }