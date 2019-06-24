var shapes = [];
var shapesNum = 600;

function setup() {
  createCanvas(1200, 400);
  colorMode(HSB, 150, 200, 120, 200);

  for (var i = 0; i < shapesNum; i++) {
    shapes.push(new Shape(i));
  }

}

function draw() {
  blendMode(BLEND);
  background(0);

  blendMode(ADD);
  for (var i = 0; i < shapesNum; i++) {
    shapes[i].display();
    shapes[i].move();

  }
}

function Shape(index) {
  this.x = 0;
  this.y = 0;
  this.index = index;
  this.t = 180;
  this.tSpeed = random(0.1, 2);
  this.or = random(20, 200);
  this.r = this.or;
  this.rSpeed = 0.2;
  this.hue = random(300);
  this.s = random(10, 25);
  if (this.index < shapesNum / 2) {
    this.sign = 3;
  } else {
    this.sign = -3;
  }

  this.display = function() {
    noStroke();
    fill(this.hue, 80, 90, 60);
    ellipse(this.x, this.y, this.s, this.s);
  }

  this.move = function() {
    this.x = width / 2 + this.sign * this.r * cos(radians(this.t));
    this.y = (height - this.or) + this.r * sin(radians(this.t));

    this.t += this.tSpeed;
    if (this.shapes) {
      this.r--;
      if (this.r > 0) {
        this.r = 0;
        this.shapes = false;
      }
    } else {
      this.r++;
      if (this.r > this.or) {
        this.r = this.or;
        this.shapes = true;
      }
    }

    if (mouseIsPressed) {
      this.t = 10;
      this.r = this.or;
    }
  }
}