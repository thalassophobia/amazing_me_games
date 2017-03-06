var screenWidth = 800;
var screenHeight = 800;
var app=new PIXI.Application(screenWidth,screenHeight,{antialias: true, backgroundColor:0x1099bb});
document.body.appendChild(app.view);

PIXI.loader.add("resources/js/images/200px-1.png").add("resources/js/images/200px-2.png").add("resources/js/images/200px-3.png").add("resources/js/images/200px-4.png");

// var puzzleTexture1=PIXI.Texture.fromImage("resources/js/images/Picture1.png");
// var puzzleTexture2=PIXI.Texture.fromImage("resources/js/images/Picture2.png");
// var puzzleTexture3=PIXI.Texture.fromImage("resources/js/images/Picture3.png");
// var puzzleTexture4=PIXI.Texture.fromImage("resources/js/images/Picture4.png");

var puzzleTexture1=PIXI.Texture.fromImage("resources/js/images/200px-1.png");
var puzzleTexture2=PIXI.Texture.fromImage("resources/js/images/200px-2.png");
var puzzleTexture3=PIXI.Texture.fromImage("resources/js/images/200px-3.png");
var puzzleTexture4=PIXI.Texture.fromImage("resources/js/images/200px-4.png");




var square1 = new PIXI.Graphics();
var sqrWidth = 200;

createPuzzleBackground();

// drawSquare(325, (screenHeight-sqrWidth*2)/2, square1);
// drawSquare(325 + sqrWidth , (screenHeight-sqrWidth*2)/2, square1);
// drawSquare(325, (screenHeight-sqrWidth*2)/2 + sqrWidth, square1);
// drawSquare(325 + sqrWidth, (screenHeight-sqrWidth*2)/2 + sqrWidth, square1);

var numArr = [0,1,2,3];
var counter = 0;


  piece1 = createInteractivePuzzlePiece(puzzleTexture1);
  piece2 = createInteractivePuzzlePiece(puzzleTexture2);
  piece3 = createInteractivePuzzlePiece(puzzleTexture3);
  piece4 = createInteractivePuzzlePiece(puzzleTexture4);

  
  function drawSquare(x, y, sqr) {
    
    sqr.lineStyle(2, 0xFF3300, 1);
    sqr.beginFill(4, 0x0000FF, 1);
    sqr.drawRect(x, y, sqrWidth, sqrWidth);
    sqr.endFill();
    app.stage.addChild(sqr);
  }

function createInteractivePuzzlePiece(texture){

    var rand = randomInt(0, 4-counter);
    var puzzlePiece = new PIXI.Sprite(texture);

    puzzlePiece.interactive=true;
    puzzlePiece.buttonMode=true;
    puzzlePiece.anchor.set(0.5);
    puzzlePiece.scale.set(0.5);
    puzzlePiece.on('pointerdown',onDragStart).on('pointerup',onDragEnd).on('pointerupoutside',onDragEnd).on('pointermove',onDragMove);
    puzzlePiece.x= 115;
    puzzlePiece.y= screenHeight*(1/8 + numArr[rand]*2/8);
    app.stage.addChild(puzzlePiece);
    numArr.splice(rand,1);
    counter++;
    return puzzlePiece;
}

function createPuzzleBackground(){
    var puzzlePiece1 = new PIXI.Sprite(puzzleTexture1);
    var puzzlePiece2 = new PIXI.Sprite(puzzleTexture2);
    var puzzlePiece3 = new PIXI.Sprite(puzzleTexture3);
    var puzzlePiece4 = new PIXI.Sprite(puzzleTexture4);
    
    puzzlePiece1.scale.set(0.5);
    puzzlePiece2.scale.set(0.5);
    puzzlePiece3.scale.set(0.5);
    puzzlePiece4.scale.set(0.5);


    puzzlePiece1.alpha = 0.4;
    puzzlePiece2.alpha = 0.4;
    puzzlePiece3.alpha = 0.4;
    puzzlePiece4.alpha = 0.4;

    puzzlePiece1.x= 325;
    puzzlePiece1.y= (screenHeight-sqrWidth*2)/2;
    puzzlePiece2.x= 325 + sqrWidth;
    puzzlePiece2.y= (screenHeight-sqrWidth*2)/2;
    puzzlePiece3.x= 325;
    puzzlePiece3.y= (screenHeight-sqrWidth*2)/2 + sqrWidth;
    puzzlePiece4.x= 325 + sqrWidth;
    puzzlePiece4.y= (screenHeight-sqrWidth*2)/2 + sqrWidth;

    app.stage.addChild(puzzlePiece1);
    app.stage.addChild(puzzlePiece2);
    app.stage.addChild(puzzlePiece3);
    app.stage.addChild(puzzlePiece4);

}

  function onDragStart(event){
    this.data=event.data;
    this.alpha=0.5;
    this.dragging=true;
  }

  function onDragEnd(){
    this.alpha=1;
    this.dragging=false;
    this.data=null;
  }

var isOccupied = [false, false, false, false];
var occupiedBy = [0, 0, 0, 0];
var range = 30;

  function onDragMove(){
    if(this.dragging){

      var newPosition=this.data.getLocalPosition(this.parent);

      if (newPosition.x< (325+ this.width/2+range) 
            && newPosition.x > (325+ this.width/2-range) 
            && newPosition.y < ((screenHeight-sqrWidth*2)/2 + this.height/2 + range) 
            && newPosition.y > ((screenHeight-sqrWidth*2)/2 + this.height/2 - range) 
            && (occupiedBy[0] == 0
            || ((this == piece1 && occupiedBy[0] == 1) || (this == piece2 && occupiedBy[0] == 2)
              || (this == piece3 && occupiedBy[0] == 3) || (this == piece4 && occupiedBy[0] == 4)))) {

        if (this == piece1){
          occupiedBy[0] = 1;
        } else if (this == piece2){
          occupiedBy[0] = 2;
        } else if (this == piece3){
          occupiedBy[0] = 3;
        } else {
          occupiedBy[0] = 4;
        }

        this.x = 325+ this.width/2;
        this.y = (screenHeight-sqrWidth*2)/2 + this.height/2;


      } else if (newPosition.x < (325 + sqrWidth + this.width/2+range) 
            && newPosition.x > (325 + sqrWidth + this.width/2-range) 
            && newPosition.y < ((screenHeight-sqrWidth*2)/2 + this.height/2 + range) 
            && newPosition.y > ((screenHeight-sqrWidth*2)/2+ this.height/2 - range)
            && (occupiedBy[1] == 0
            || ((this == piece1 && occupiedBy[1] == 1) || (this == piece2 && occupiedBy[1] == 2)
              || (this == piece3 && occupiedBy[1] == 3) || (this == piece4 && occupiedBy[1] == 4)))) {

        if (this == piece1){
          occupiedBy[1] = 1;
        } else if (this == piece2){
          occupiedBy[1] = 2;
        } else if (this == piece3){
          occupiedBy[1] = 3;
        } else {
          occupiedBy[1] = 4;
        }

        this.x = 325 + sqrWidth + this.width/2;
        this.y = (screenHeight-sqrWidth*2)/2 + this.height/2;


      } else if (newPosition.x< (325 + this.width/2+range) 
            && newPosition.x > (325 + this.width/2-range) 
            && newPosition.y < ((screenHeight-sqrWidth*2)/2 + sqrWidth + this.height/2 + range) 
            && newPosition.y > ((screenHeight-sqrWidth*2)/2 + sqrWidth + this.height/2 - range)
            && (occupiedBy[2] == 0
            || ((this == piece1 && occupiedBy[2] == 1) || (this == piece2 && occupiedBy[2] == 2)
              || (this == piece3 && occupiedBy[2] == 3) || (this == piece4 && occupiedBy[2] == 4)))) {

        if (this == piece1){
          occupiedBy[2] = 1;
        } else if (this == piece2){
          occupiedBy[2] = 2;
        } else if (this == piece3){
          occupiedBy[2] = 3;
        } else {
          occupiedBy[2] = 4;
        }

        this.x = 325 + this.width/2;
        this.y = (screenHeight-sqrWidth*2)/2 + sqrWidth + this.height/2;


      } else if (newPosition.x< (325 + sqrWidth + this.width/2+range) 
            && newPosition.x > (325 + sqrWidth + this.width/2-range) 
            && newPosition.y < ((screenHeight-sqrWidth*2)/2 + sqrWidth + this.height/2 + range) 
            && newPosition.y > ((screenHeight-sqrWidth*2)/2 + sqrWidth + this.height/2 - range)
            && (occupiedBy[3] == 0
            || ((this == piece1 && occupiedBy[3] == 1) || (this == piece2 && occupiedBy[3] == 2)
              || (this == piece3 && occupiedBy[3] == 3) || (this == piece4 && occupiedBy[3] == 4)))) {

        if (this == piece1){
          occupiedBy[3] = 1;
        } else if (this == piece2){
          occupiedBy[3] = 2;
        } else if (this == piece3){
          occupiedBy[3] = 3;
        } else {
          occupiedBy[3] = 4;
        }

        this.x = 325 + sqrWidth + this.width/2;
        this.y = (screenHeight-sqrWidth*2)/2 + sqrWidth + this.height/2;

      } else {

        if (this == piece1 && occupiedBy.indexOf(1) > -1) {
          occupiedBy[occupiedBy.indexOf(1)] = 0;
        } else if (this == piece2 && occupiedBy.indexOf(2) > -1){
          occupiedBy[occupiedBy.indexOf(2)] = 0;
        } else if (this == piece3 && occupiedBy.indexOf(3) > -1){
          occupiedBy[occupiedBy.indexOf(3)] = 0;
        } else if (this == piece4 && occupiedBy.indexOf(4) > -1) {
          occupiedBy[occupiedBy.indexOf(4)] = 0;
        }

        if (newPosition.y< this.height/2){
           this.y = this.height/2;
        } else if (newPosition.y > screenHeight - this.height/2) {
          this.y = screenHeight - this.height/2;
        } else {
          this.y = newPosition.y;
        }

        if (newPosition.x < this.width/2){
          this.x = this.width/2;
        } else if (newPosition.x > (screenWidth-this.width/2)) {
         this.x = (screenWidth-this.width/2);
        } else {
            this.x=newPosition.x;
        }
      }

      if (occupiedBy[0] == 1 && occupiedBy[1] == 2 && occupiedBy[2] == 3 && occupiedBy[3] == 4) {
          youWin();
      }
    }
  }
  
function youWin() {
  var message = new PIXI.Text(
  "YOU WIN",
  {fontFamily: "Arial", fontSize: 60, fill: "pink"}
  );

  message.position.set(screenWidth/2-(message.width)/2, 0);
  app.stage.addChild(message);
}

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
