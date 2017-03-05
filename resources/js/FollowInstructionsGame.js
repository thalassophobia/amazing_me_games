var WIDTH = 800;
var HEIGHT = 600;

var IMG_WIDTH = 100;
var IMG_HEIGHT = 100;

// Declare objects
var eggs, flour, milk;

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
      "resources/images/shelf.png"
    ])
  .load(setup);

//This `setup` function will run when the image has loaded
function setup() {

  //Create the `eggs` sprite from the texture
  eggs = new PIXI.Sprite(
    PIXI.loader.resources["resources/images/eggs.png"].texture
  );

  //Change the sprite's position
  eggs.position.set(WIDTH - IMG_WIDTH - 40, 50);
  eggs.width = IMG_WIDTH;
  eggs.height = IMG_HEIGHT;

  eggs.interactive = true;
  eggs.buttonMode = true;

  //pointer events for touch AND mouse
    eggs
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);


  flour = new PIXI.Sprite(
    PIXI.loader.resources["resources/images/flour.png"].texture
  );

  flour.position.set(WIDTH - IMG_WIDTH * 3 - 5, 50);
  flour.width = IMG_WIDTH;
  flour.height = IMG_HEIGHT;

  flour.interactive = true;
  flour.buttonMode = true;

  //pointer events for touch AND mouse
  flour
      .on('pointerdown', onDragStart)
      .on('pointerup', onDragEnd)
      .on('pointerupoutside', onDragEnd)
      .on('pointermove', onDragMove);


  milk = new PIXI.Sprite(
    PIXI.loader.resources["resources/images/milk.png"].texture
  );

  milk.position.set(WIDTH - IMG_WIDTH * 4 - 20, 40);
  milk.width = IMG_WIDTH;
  milk.height = IMG_HEIGHT;

  milk.interactive = true;
  milk.buttonMode = true;

  //pointer events for touch AND mouse
  milk
      .on('pointerdown', onDragStart)
      .on('pointerup', onDragEnd)
      .on('pointerupoutside', onDragEnd)
      .on('pointermove', onDragMove);

  var bowl = new PIXI.Sprite(
    PIXI.loader.resources["resources/images/bowl.png"].texture
  );

  bowl.position.set(WIDTH / 2 + 30, HEIGHT - IMG_HEIGHT * 2);
  bowl.width = IMG_WIDTH * 3;
  bowl.height = IMG_HEIGHT;

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

  stage.addChild(bowl);

  animate();
}

function onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
}

function onDragMove() {
    if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x - IMG_WIDTH * 1.5;
        this.y = newPosition.y - IMG_HEIGHT * 1.5;
    }
}

function animate() {
    requestAnimationFrame(animate);

    //Render the stage   
    renderer.render(stage);
}