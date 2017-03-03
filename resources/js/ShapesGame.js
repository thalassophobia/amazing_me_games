var app = new PIXI.Application(800, 600, { antialias: true });
document.body.appendChild(app.view);

app.stage.interactive = true;

var square = new PIXI.Graphics();
var rectWidth = 100;
var rectHeight = 100

//Draws a dragable square
function drawSquare(x, y) {
    square.lineStyle(2, 0x0000FF, 1);
    square.beginFill(0x0000FF, 1);
    square.drawRect(100, 100, rectWidth, rectHeight);
    square.endFill();

    square.interactive = true;
    square.buttonMode = true;

    //pointer events for touch AND mouse
    square
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);

    square.x = x;
    square.y = y;
}
drawSquare(0, 0);

app.stage.addChild(square);

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
        this.x = newPosition.x - rectWidth * 1.5;
        this.y = newPosition.y - rectHeight * 1.5;
    }
}

animate();

function animate() {
    requestAnimationFrame(animate);
}
// draw a circle
// graphics.lineStyle(0);
// graphics.beginFill(0xFFFF0B, 0.5);
// graphics.drawCircle(470, 200,100);
// graphics.endFill();
