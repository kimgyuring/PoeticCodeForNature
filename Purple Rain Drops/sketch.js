var d = [];

function setup() {
  createCanvas(800, 800);
  background(200,120,200,30);
  for (var i = 0; i < 100; i++) {
    d.push(new Drop(random(0, 800), random(0, 800), random(2, 4)));
  }
}

function draw() {
  fill(170,100,140,10);
  rect(0, 0, 800);
  for (var i = 0; i < d.length; i++) {
    d[i].displ();
  }
}

function Drop(x, y, sp) {
  var x1 = x;
  var y1 = y;
  var x2;
  var y2;
  var s = sp;
  var vel;

  this.displ = function() {
    var mx = mouseX / 100;
    if (mx <= 0) {
      mx = 0.05;
    }
    y1 = y1 + s * mx;
    x2 = x1;
    y2 = y1 + 50;

    stroke(220,120,180,20);
    line(x1, y1, x2, y2);

    if (y1 >= 800 - 100) {
      stroke(200,120,200,50);
      ellipse(x1, 825 - random(30, 55), random(25, 100), 5);
      x1 = random(0, 800);
      y1 = -60;
    }
  }
}