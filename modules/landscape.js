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
    let newYPoints = [];
    let interceptpoints = [];

    //2. calculate points of circle about explosionpoint
    // for (let i = 0; i < 360; i++)
    // {
    //   let x = explosionpoint.x + (Math.cos(i * (Math.PI / 180)) * radius);
    //   let y = explosionpoint.y + (Math.sin(i * (Math.PI / 180)) * radius);
    //   circlepoints.push({ "x": x, "y": y });
    // }


    let landscapeIndex = landpoints.findIndex(element => element.x == explosionpoint.x);
    console.log(landscapeIndex);

    if (landscapeIndex != -1)
    {

      let deltaY = landpoints[landscapeIndex].y - landpoints[landscapeIndex - 1].y;
      let deltaX = landpoints[landscapeIndex].x - landpoints[landscapeIndex - 1].x;
      let tangent = Math.atan(deltaY / deltaX);


      for (let i = 0; i < radius; i++)
      {
        //y is altered by relative circular position plus offset of hillside slope
        let y =
          (
            Math.sin(Math.acos(i / radius)) * radius
          )

          +
          (
            Math.sin(Math.atan(tangent)) * (i / radius) * radius
          );

        newYPoints.push(y);
      }

      //3. find 2 points that intersect with landscape
      // landpoints.forEach(landpoint =>
      // {
      //   circlepoints.forEach(circlepoint =>
      //   {
      //     if (landpoint.x < (circlepoint.x + 1) && landpoint.x > (circlepoint.x - 1))
      //     {
      //       if (landpoint.y > (circlepoint.y - 1) && landpoint.y < (circlepoint.y + 1))
      //       {
      //         interceptpoints.push(landpoint);
      //       }

      //     }
      //   })
      // });


      //4. remove section of landscape between 2 points
      let j = 0;
      for (let li = landscapeIndex + 20; li < landscapeIndex + 40; li++)
      {
        this.#allpoints[li].y -= newYPoints[j];
        j++;
      }

      j = 19;
      for (let li = landscapeIndex; li < landscapeIndex + 20; li++)
      {
        this.#allpoints[li].y -= newYPoints[j];
        j--;
      }


    }
    //5. write portion of circle back to landscape
  }
}

export { Landscape }