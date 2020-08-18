// view.js -- UI handler
import { colourTable } from './colourtable.js';
import { dom } from './dom.js';

class View
{
  #canvas;
  #controller;
  #ctx;

  constructor(controller)
  {
    this.#controller = controller;
    this.#canvas = dom.playfield;
    this.#ctx = this.#canvas.getContext(`2d`);
    this.#canvas.width = this.#canvas.clientWidth;    //'width' is like internal resolution
    this.#canvas.height = this.#canvas.clientHeight;  //and client the container size on page

    for (let i = 0; i < dom.playerLabels.length; i++)
    {
      dom.playerLabels[i].style.color = colourTable[i + 1];
      dom.playerLabels[i].style.visibility = `visible`;
    }

    //set up button listeners
    dom.fireButtons.forEach(el => el.addEventListener(`click`, this.#controller.fire.bind(this.#controller)));
    dom.mainmenuForm.addEventListener(`submit`, this.#controller.startGame.bind(this.#controller));
    dom.messageboxOKButton.addEventListener(`click`, this.#controller.messageboxOK.bind(this.#controller));
  }


  getPlayerNames()
  {
    return Object.values(dom.nameInputs).map(nameInput => nameInput.value);
  }


  toggleMainmenu()
  {
    if (dom.mainmenuForm.style.display != `none`)
      dom.mainmenuForm.style.display = `none`

    else if (dom.mainmenuForm.style.display == `none`)
      dom.mainmenuForm.style.display = `grid`;
  }


  toggleMessagebox()
  {
    if (dom.messagebox.style.display == `none` || dom.messagebox.style.display == ``)
      dom.messagebox.style.display = `block`

    else dom.messagebox.style.display = `none`;
  }


  updateMessagebox(message)
  {
    dom.messageboxText.innerText = message;
  }


  showMessage(message)
  {
    this.updateMessagebox(message);
    this.toggleMessagebox();
  }

  plotExplosion(coordinates)
  {
    let x = coordinates.x;
    let y = dom.playfield.height - coordinates.y;
    let colours = [`red`, `yellow`, `white`];
    let initTime = Date.now();

    function drawFrame(timestamp)
    {
      console.log(timestamp);
      frameID = window.requestAnimationFrame(drawFrame);
    }

    let frameID = window.requestAnimationFrame(drawFrame);
  }


  plotPoint(x, y, colour = 0)
  {
    y = dom.playfield.height - y;
    this.#ctx.fillStyle = colourTable[colour];
    this.#ctx.fillRect(Math.round(x), Math.round(y), 3, 3);
  }

  //can access dom and this.#ctx, but can i access the above method instead of repeating it?
  plotSet(shotpath, cb)
  {
    let index = 0;
    let newFrame;

    function drawFrame()
    {
      if (index > (shotpath.length - 1)) 
      {
        newFrame = window.cancelAnimationFrame(newFrame);
        console.log(`explosion routine should begin now`);
        console.log(this);
        this.#view.plotExplosion(shotpath[shotpath.length-1]);
        cb();
      }
      else
      {
        let y = dom.playfield.height - shotpath[index].y;
        let x = shotpath[index].x;
        this.#ctx.fillStyle = `white`;
        this.#ctx.fillRect(Math.round(x), Math.round(y), 3, 3);
        index += 10;
        newFrame = window.requestAnimationFrame(drawFrame.bind(this));
      }

    }

    newFrame = window.requestAnimationFrame(drawFrame.bind(this));

  }


  plotLandscape(landscape)
  {
    this.#ctx.save();
    this.#ctx.translate(0, this.#canvas.height);
    this.#ctx.scale(1, -1);
    let keypoints = landscape.getKeypoints();
    let landscapePath = new Path2D();
    landscapePath.moveTo(keypoints[0].x, keypoints[0].y);
    for (let i = 1; i <= keypoints.length - 1; i++)
    {
      landscapePath.lineTo(keypoints[i].x, keypoints[i].y);
    }
    landscapePath.closePath();
    let gradient = this.#ctx.createLinearGradient(0, 0, 0, this.#canvas.height);
    gradient.addColorStop(0, `darkgreen`);
    gradient.addColorStop(1, `white`);
    this.#ctx.fillStyle = gradient;
    this.#ctx.fill(landscapePath, 'nonzero');
    this.#ctx.restore();
  }


  plotPlayers(players)
  {
    let tankcuts = [{ right: 0, left: 64 }, { right: 128, left: 192 }, { right: 256, left: 320 }, { right: 384, left: 448 }];
    let tanksprite = new Image();
    tanksprite.src = `../assets/tank-sprite.png`;
    tanksprite.onload = function ()
    {
      players.forEach(function (player)
      {
        let srcX = tankcuts[player.getColour() - 1]['right'];
        let srcY = 0;
        let srcW = 64;
        let srcH = 64;
        let dstX = player.getPosition().x;
        let dstY = (this.#canvas.height) - player.getPosition().y;
        let dstW = player.getWidth();
        let dstH = player.getHeight();
        let offY = dstH / 3;

        player.updateRotation();
        let rotationRad = player.getRotation();
        let rotationDeg = rotationRad * (180 / Math.PI);

        this.#ctx.save();
        this.#ctx.translate(dstX, dstY);              //move top-left corner (0,0) of canvas to player position
        this.#ctx.rotate(-rotationRad);               //rotate canvas
        this.#ctx.translate(-dstW / 2, -dstH / 2 - offY);   //move rotated canvas to image center
        this.#ctx.drawImage(tanksprite, srcX, srcY, srcW, srcH, 0, 0, dstW, dstH);
        this.#ctx.restore();

      }.bind(this));
    }.bind(this);
  }


  setCurrentPlayer(currentPlayer)
  {
    dom.currentPlayerLabels.forEach(function (label) 
    {
      label.innerText = currentPlayer.getName();
      label.style.color = colourTable[currentPlayer.getColour()];
    });

    dom.currentPlayerLabels[1].style.textShadow = `1px 1px ${colourTable[currentPlayer.getColour() + 4]}`;
  }


  getCanvas()
  {
    return this.#canvas;
  }


  clearCanvas()
  {
    this.#ctx.fillStyle = `black`;
    this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
  }


  getAngleInputs()
  {
    let myOutput = [];
    let myInputs = dom.angleInputs;
    for (let i = 0; i < myInputs.length; i++)
    {
      myOutput.push(parseInt(myInputs[i].value));
    }
    return myOutput;
  }


  getPowerInputs()
  {
    let myOutput = [];
    let myInputs = dom.powerInputs;
    for (let i = 0; i < myInputs.length; i++)
    {
      myOutput.push(parseInt(myInputs[i].value));
    }
    return myOutput;
  }
}

export { View }