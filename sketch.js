var canavas;
var database;

var drawing = []

function setup() {
    canvas = createCanvas(400, 400);
    canvas.parent('canvas');
    database = firebase.database()
    background(51)
    var clearbutton = select('#clearbutton');

    clearbutton.mousePressed(clearDrawing);

}

var db_drawing = []

function mouseDragged() {

    var point = {
        x: mouseX,
        y: mouseY
    }
    drawing.push(point);
    var drawingRef = database.ref('Drawing')
    drawingRef.set({
        "d": drawing
    })
}

function draw() {
    readData()
    beginShape();
    stroke(255);
    strokeWeight(4);
    noFill();
    for (var i = 0; i < db_drawing.length; i++) {
        vertex(db_drawing[i].x, db_drawing[i].y);
        endShape();
    }

}

function readData() {
    database.ref('/').on('value', (data) => {
        db_drawing = data.val().d
    })
}

function clearDrawing() {
     db_drawing = []
     var drawingRef = database.ref('Drawing')
     drawingRef.set({
         "d": []
     })
 }

function clearDrawing() {
    db_drawing = [];
    var adaRef = database.ref('Drawing');
    adaRef.remove()
}