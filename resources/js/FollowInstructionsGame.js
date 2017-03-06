var WIDTH = 800;
var HEIGHT = 600;

var IMG_WIDTH = 100;
var IMG_HEIGHT = 100;

// Declare objects
var eggs, flour, milk, bowl, spoon, cake;

var targetObject = "eggs"; //change to be randomized
var objectList = ["eggs", "flour", "milk"];
var numCorrect = 0;

var stir = false;
var i = 200;
var forwards = true;

var moveEggsBack = false;
var moveFlourBack = false;
var moveMilkBack = false;
var cakeFadeIn = false;

//store initial starting locations
var eggsX = WIDTH - IMG_WIDTH - 40;
var flourX = WIDTH - IMG_WIDTH * 3;
var milkX = WIDTH - IMG_WIDTH * 4 - 20;
var ingredientsY = 50;

var misses = 0;

var stage = new PIXI.Container(),
    renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);
document.body.appendChild(renderer.view);

//Use Pixi's built-in `loader` object to load an image
PIXI.loader
  .add(["resources/images/flour.png",
      "resources/images/eggs.png",
      "resources/images/milk.png",
      "resources/images/kitchen_background.png",
      "resources/images/bowl.png",
      "resources/images/steps_background.png",
      "resources/images/shelf.png",
      "resources/images/spoon.png",
      "resources/images/cake.png"
    ])
  .load(setup);

//This `setup` function will run when the image has loaded
function setup() {

  addImages();
  //addText();

  animate();
}

function addText() {
  var message = new Text(
    "Cake",
    {fontFamily: "Arial", fontSize: 32, fill: "blue"}
  );

  message.x = 50;
  stage.addChild(message);
}

function addImages() {
  //Create the `eggs` sprite from the texture
  eggs = new PIXI.Sprite(
    PIXI.loader.resources["resources/images/eggs.png"].texture
  );

  //Change the sprite's position
  eggs.position.set(eggsX, ingredientsY);
  eggs.width = IMG_WIDTH;
  eggs.height = IMG_HEIGHT;

  eggs.interactive = true;
  eggs.buttonMode = true;

  //pointer events for touch AND mouse
    eggs
        .on('pointerdown', onDragStart)
        .on('pointerup', onEggsDragEnd)
        .on('pointerupoutside', onEggsDragEnd)
        .on('pointermove', onDragMove);


  flour = new PIXI.Sprite(
    PIXI.loader.resources["resources/images/flour.png"].texture
  );

  flour.position.set(flourX, ingredientsY);
  flour.width = IMG_WIDTH;
  flour.height = IMG_HEIGHT;

  flour.interactive = true;
  flour.buttonMode = true;

  //pointer events for touch AND mouse
  flour
      .on('pointerdown', onDragStart)
      .on('pointerup', onFlourDragEnd)
      .on('pointerupoutside', onFlourDragEnd)
      .on('pointermove', onDragMove);


  milk = new PIXI.Sprite(
    PIXI.loader.resources["resources/images/milk.png"].texture
  );

  milk.position.set(milkX, ingredientsY - 10);
  milk.width = IMG_WIDTH;
  milk.height = IMG_HEIGHT;

  milk.interactive = true;
  milk.buttonMode = true;

  //pointer events for touch AND mouse
  milk
      .on('pointerdown', onDragStart)
      .on('pointerup', onMilkDragEnd)
      .on('pointerupoutside', onMilkDragEnd)
      .on('pointermove', onDragMove);

  bowl = new PIXI.Sprite(
    PIXI.loader.resources["resources/images/bowl.png"].texture
  );

  bowl.position.set(WIDTH / 2 + 30, HEIGHT - IMG_HEIGHT * 2);
  bowl.width = IMG_WIDTH * 3;
  bowl.height = IMG_HEIGHT;

  cake = new PIXI.Sprite(
    PIXI.loader.resources["resources/images/cake.png"].texture
  );

  cake.position.set(WIDTH / 2 + 30, HEIGHT - IMG_HEIGHT * 4);
  cake.width = IMG_WIDTH * 3;
  cake.height = IMG_HEIGHT * 2;
  cake.visible = false;

  spoon = new PIXI.Sprite(
    PIXI.loader.resources["resources/images/spoon.png"].texture
  );

  spoon.position.set(WIDTH / 2 + 30, HEIGHT - IMG_HEIGHT * 2.5);
  spoon.width = IMG_WIDTH;
  spoon.height = IMG_HEIGHT;
  spoon.visible = false;

  var kitchen_background = new PIXI.Sprite(
    PIXI.loader.resources["resources/images/kitchen_background.png"].texture
  );

  kitchen_background.width = WIDTH;
  kitchen_background.height = HEIGHT;

  var steps_background = new PIXI.Sprite(
    PIXI.loader.resources["resources/images/steps_background.png"].texture
  );

  steps_background.position.set(10, 10);
  steps_background.width = IMG_WIDTH * 3;
  steps_background.height = IMG_HEIGHT * 4;

    var shelf = new PIXI.Sprite(
    PIXI.loader.resources["resources/images/shelf.png"].texture
  );

  shelf.position.set(WIDTH / 2 - 150, HEIGHT / 2 - 200);
  shelf.width = IMG_WIDTH * 6;
  shelf.height = IMG_HEIGHT;


  //Add sprites to the stage
  stage.addChild(kitchen_background);

  stage.addChild(steps_background);

  stage.addChild(shelf);

  stage.addChild(eggs);

  stage.addChild(flour); 

  stage.addChild(milk);

  stage.addChild(spoon);

  stage.addChild(bowl);

  stage.addChild(cake);
}

function onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onEggsDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;

    if (hitTestObjects(eggs, bowl)) {
      if (targetObject == "eggs") {
        //switch object
        eggs.visible = false;
        numCorrect++;
        if (numCorrect >= objectList.length) {
          console.log("You made a cake!");
        } else {
          targetObject = objectList[numCorrect];
          //animate spoon
          stir = true;
        }
      } else {
        //hit the bowl, but was not the right object
        misses++;
        moveEggsBack = true;
      }
    }
}

function onFlourDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;

    if (hitTestObjects(flour, bowl)) {
      if (targetObject == "flour") {
        //animate success
        //switch object
        flour.visible = false;
        numCorrect++;
        if (numCorrect >= objectList.length) {
          console.log("You made a cake!");
          //make cake appear

        } else {
          targetObject = objectList[numCorrect];
          stir = true;
        }
      } else {
        misses++;
        moveFlourBack = true;
      }
    }
}

function onMilkDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;

    if (hitTestObjects(milk, bowl)) {
      if (targetObject == "milk") {
        //animate success
        //switch object
        milk.visible = false;
        numCorrect++;
        if (numCorrect >= objectList.length) {
          console.log("You made a cake!");
          cakeFadeIn = true;
        } else {
          targetObject = objectList[numCorrect];
          stir = true;
        }
      } else {
        misses++;
        moveMilkBack = true;
      }
    }
}

function onDragMove() {
    if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x - IMG_WIDTH / 2;
        this.y = newPosition.y - IMG_HEIGHT / 2;
    }
}

function animate() {
    requestAnimationFrame(animate);

    if (stir) {
      spoon.visible = true;
      if (i > 0) {
        if (forwards) {
          spoon.x += 3;
          if (spoon.x + IMG_WIDTH + 5 >= bowl.x + IMG_WIDTH * 3) {
            forwards = false;
            spoon.scale.x *= -1;
          }
        } else {
          spoon.x -= 3;
          if (spoon.x - IMG_WIDTH - 5 <= bowl.x) {
            forwards = true;
            spoon.scale.x *= -1;
          }
        }
        i--;
      } else {
        spoon.visible = false;
        stir = false;
        i = 200;
      }
    }

    if (moveFlourBack) {
      var done = false;
      if (flour.x + 5 <= flourX) {
        flour.x += 5;
      } else if (flour.x - 5 >= flourX) {
        flour.x -= 5;
      } else {
        flour.x = flourX
        done = true;
      }

      if (flour.y + 5 <= ingredientsY) {
        flour.y += 5;
        done = false;
      } else if (flour.y - 5 >= ingredientsY) {
        flour.y -= 5;
        done = false;
      } else {
        flour.y = ingredientsY;
        done &= true;
      }

      if (done) {
        moveFlourBack = false;
      }
    }

    if (moveEggsBack) {
      var done = false;
      if (eggs.x + 5 <= eggsX) {
        eggs.x += 5;
      } else if (eggs.x - 5 >= eggsX) {
        eggs.x -= 5;
      } else {
        eggs.x = eggsX
        done = true;
      }

      if (eggs.y + 5 <= ingredientsY) {
        eggs.y += 5;
        done = false;
      } else if (eggs.y - 5 >= ingredientsY) {
        eggs.y -= 5;
        done = false;
      } else {
        eggs.y = ingredientsY;
        done &= true;
      }

      if (done) {
        moveEggsBack = false;
      }
    }

    if (moveMilkBack) {
      var done = false;
      if (milk.x + 5 <= milkX) {
        milk.x += 5;
      } else if (milk.x - 5 >= milkX) {
        milk.x -= 5;
      } else {
        milk.x = milkX
        done = true;
      }

      if (milk.y + 5 <= ingredientsY - 10) {
        milk.y += 5;
        done = false;
      } else if (milk.y - 5 >= ingredientsY - 10) {
        milk.y -= 5;
        done = false;
      } else {
        milk.y = ingredientsY;
        done &= true;
      }

      if (done) {
        moveMilkBack = false;
      }
    }

    if (cakeFadeIn) {
      if (!cake.visible) {
        cake.visible = true;
        spoon.visible = false;
        cake.alpha = 0.025;
      } else {
        cake.alpha += 0.025;
      }
      bowl.alpha -= 0.05;
    }

    //Render the stage   
    renderer.render(stage);
}

function hitTestObjects(r1, r2) {

  //Define the variables we'll need to calculate
  var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occuring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
};