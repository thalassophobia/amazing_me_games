var app = new PIXI.Application(800, 600, { antialias: true });
document.body.appendChild(app.view);

app.stage.interactive = true;

var square = new PIXI.Graphics();
var circle = new PIXI.Graphics();
var rectWidth = 100;
var rectHeight = 100;
var circleRadius = 50;

//Draws a dragable square
function drawSquare(x, y) {
    square.lineStyle(2, 0x0000FF, 1);
    square.beginFill(0x0000FF, 1);
    square.drawRect(x, y, rectWidth, rectHeight);
    square.endFill();

    square.interactive = true;
    square.buttonMode = true;

    //pointer events for touch AND mouse
    square
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onRectDragMove);

    // square.x = x;
    // square.y = y;
}

//Draws a dragable circle
function drawCircle(x, y) {
    circle.lineStyle(0);
    circle.beginFill(0xFF0000, 1);
    circle.drawCircle(x, y, circleRadius);
    circle.endFill();

    circle.interactive = true;
    circle.buttonMode = true;

    //pointer events for touch AND mouse
    circle
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onCircleDragMove);

    // circle.x = x;
    // circle.y = y;
}

drawCircle(150, 300);
drawSquare(100, 100);

app.stage.addChild(square);
app.stage.addChild(circle)

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

function onRectDragMove() {
    if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x - rectWidth * 1.5;
        this.y = newPosition.y - rectHeight * 1.5;
    }
}

function onCircleDragMove() {
    if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x - circleRadius * 3;
        this.y = newPosition.y - circleRadius * 6;
    }
}

animate();

function animate() {
    requestAnimationFrame(animate);
}
