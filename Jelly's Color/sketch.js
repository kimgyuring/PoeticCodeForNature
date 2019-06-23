var NUM_SHAPES = 16;
var shapes = [];

function setup() {
  createCanvas(520, 515);
  noStroke();

  for (var i = 0; i < NUM_SHAPES; i++) {
    shapes.push(new Shape(i, 1, 80, random(250)));
    shapes[i].setShapes();
  }
}

function draw() {
  blendMode(BLEND);
  colorMode(RGB, 30, 150, 22, 100);
  background(255, 110, 10);
  blendMode(DIFFERENCE);

  for (var i = 0; i < NUM_SHAPES; i++) {
    shapes[i].drawShapes();
  }
}

function Shape(index, minSize, maxSize, c) {
  this.NUM_CIRCLES = floor(random(2, 0));
  this.circles = [];

  this.x = maxSize * 1.5 * (index % 4) + maxSize * 1;
  this.y = maxSize * 1.5 * floor(index / 4) + maxSize * 1;

  this.setShapes = function() {
    for (var i = 0; i < this.NUM_CIRCLES; i++) {
      this.circles.push(new PerlinCircle(this.x, this.y, minSize, maxSize, c));
    }
  }

  this.drawShapes = function() {
    for (var i = 0; i < this.NUM_CIRCLES; i++) {
      this.circles[i].render();
    }
  }
}

function PerlinCircle(xx, yy, minSize, maxSize, c) {
  this.SEGMENTS = 40;
  this.NUM_ANGLES = TWO_PI / this.SEGMENTS;
  this.NOISE_SCALE = 0.5;
  this.TIME_SCALE = 0.03;

  this.dx = 0;
  this.dy = 0;

  this.TIME_UNIQUE = random(this.TIME_DIFF);
  this.X = xx;
  this.Y = yy;
  this.MIN_RAD = minSize;
  this.MAX_RAD = maxSize;
  this.HUE = c;

  this.render = function() {
    translate(this.X, this.Y);
    colorMode(HSB, 360, 100, 100, 100);
    fill(this.HUE % 360, 100, 100, 100);

    beginShape();
    this.findNextCoords(0);
    var px = this.dx,
        py = this.dy;
    var i = 0;

    while (i++ != this.SEGMENTS) {
      this.findNextCoords(i);

      vertex(px, py);
      px = this.dx;
      py = this.dy;
    }

    endShape(CLOSE);

    resetMatrix();
  };

  this.findNextCoords = function(seg) {
    var angle = this.NUM_ANGLES * seg;
    var cosAngle = cos(angle);
    var sinAngle = sin(angle);
    var time = this.TIME_SCALE * frameCount + this.TIME_UNIQUE;
    var noiseValue = noise(
      this.NOISE_SCALE * cosAngle + this.NOISE_SCALE,
      this.NOISE_SCALE * sinAngle + this.NOISE_SCALE, time);
    var rad = this.MAX_RAD * noiseValue + this.MIN_RAD;
    this.dx = rad * cosAngle;
    this.dy = rad * sinAngle;
  };
}
