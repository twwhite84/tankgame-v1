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
    allpoints.push(keypoints[keypoints.length - 1]);
    return allpoints;
  }


  getAllpoints() { return this.#allpoints; }

  getKeypoints() { return this.#keypoints; }

  getCtxWidth() { return this.#ctxWidth; }

  getCtxHeight() { return this.#ctxHeight; }


  deformLandscape(shotpath)
  {
    //1. get explosion point
    let landpoints = this.#allpoints;
    let explosionpoint = shotpath[shotpath.length - 1];
    let radius = 20;
    let resolution = 10000;   //too high, takes ages. too low, misses intercepts
    let circlepoints = [];
    let interceptpoints = [];

    //2. calculate points of circle about explosionpoint
    for (let i = 0; i < resolution; i++)
    {
      let x = Math.cos((i / resolution) * (2 * Math.PI)) * radius;
      let y = Math.sin((i / resolution) * (2 * Math.PI)) * radius;
      circlepoints.push({ "x": explosionpoint.x + x, "y": explosionpoint.y + y });
    }

    //3. find 2 points that intersect with landscape
    landpoints.forEach(landpoint =>
    {
      circlepoints.forEach(circlepoint =>
      {
        if (landpoint.x == Math.round(circlepoint.x))
        {
          //shots are allowed to sink into ground by 2px, see shot class
          if (landpoint.y < (circlepoint.y + 1) && landpoint.y > (circlepoint.y - 4))
          {
            interceptpoints.push(landpoint);
          }
        }
      })
    });


    //4. remove section of landscape between 2 points

    //filter out duplicate entries
    let duplicatesRemoved = [];
    interceptpoints.forEach(interceptpoint =>
    {
      let duplicates = false;
      duplicatesRemoved.forEach(duplicatepoint =>
      {
        if (interceptpoint.x == duplicatepoint.x && interceptpoint.y == duplicatepoint.y) duplicates = true;
      });
      if (duplicates == false) duplicatesRemoved.push(interceptpoint);
    });

    let ordered = [];

    for (let i = 0; i < duplicatesRemoved.length; i++)
    {
      let slice = duplicatesRemoved.slice(i, duplicatesRemoved.length);

      //with the slice find the highest number, and unshift it to ordered
      let start = 0;
      slice.forEach(entry =>
      {
        if (entry.x > start) start = entry;
      });
      ordered.push(start);
    }

    //get the lowest and highest values from the ordered array
    if (ordered.length != 0)
    {
      console.log(`${ordered[0].x}, ${ordered[0].y}`);
      console.log(`${ordered[ordered.length-1].x}, ${ordered[ordered.length-1].y}`);
      let first = ordered[0];
      let last = ordered[ordered.length-1];
      let difference = last.x - first.x;
      console.log(difference);
      for (let i = first.x; i < difference; i++)
      {
        // this.#allpoints[i] = ordered[i];
        //NEED TO MAP CALCULATED CIRCLEPOINTS BACK TO ALLPOINTS
        //DIVIDE CIRCLEPOINTS INTO THE NUMBER OF X UNITS I NEED AND USE RELEVANT Y POSITIONS

        //

      }
    }
    

    //5. write portion of circle back to landscape
  }
}

export { Landscape }