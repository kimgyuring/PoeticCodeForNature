var lightParticles = [];
var lampParticles = [];
var maxLightLife = 50;
var maxLampLife = 50;

function Light(x, y, offset, parentAngle, pointSize) {

  this.pos = new p5.Vector(x, y);
  this.offset = offset;
  this.push = random(-100, -10);

  this.parentAngle = parentAngle;
  this.angle = random(-45, 45);
  this.angleRate = random(-2, 2);

  this.pointSize = pointSize
  this.alpha = random(10, 150);

  this.life = maxLightLife;
  this.lifeRate = random(0.4, 1.25);

  this.move = function() {
    this.life -= this.lifeRate;
    this.angle += this.angleRate;
  }

  this.display = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(radians(this.parentAngle));
    translate(this.offset, 0);
    rotate(radians(-this.parentAngle));

    rotate(radians(this.angle));
    translate(0, map(this.life, maxLightLife, 0, 0, this.push));
    scale(map(this.life, maxLightLife, 0, 1, 0));

    stroke(0, 0, 0, this.alpha);
    strokeWeight(this.pointSize);
    point(0, 0);

    pop();
  }
}

function Lamp(x, y) {

  this.pos = new p5.Vector(x, y);

  this.push = 100;

  this.vel = new p5.Vector(mouseX, mouseY);
  this.vel.sub(new p5.Vector(pmouseX, pmouseY));
  this.vel.mult(0.1);

  this.angle = random(0, 360);

  this.life = maxLampLife;
  this.lifeRate = random(0.35, 1);

  this.particles = [];
  for (var i = 0; i < 3; i++) {
    this.particles.push([new p5.Vector(random(-10, 10), random(-10, 10)), random(0, 50)]);
  }

  this.move = function() {
    this.life -= this.lifeRate;

    this.vel.y += 0.05;
    this.pos.add(this.vel);
  }

  this.spawn = function() {
    var offset = map(this.life, maxLampLife, 0, 0, this.push);

    var pointSize = random(25, 50) * map(this.life, maxLampLife, 0, 1, 0);

    lightParticles.push(new Light(this.pos.x, this.pos.y, offset, this.angle, pointSize));
  }

  this.display = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(radians(this.angle));
    translate(map(this.life, maxLampLife, 0, 0, this.push), 0);
    scale(map(this.life, maxLampLife, 0, 1, 0));


    for (var i = 0; i < this.particles.length; i++) {
      var particlePos = this.particles[i][0];
      var particleHue = this.particles[i][1];

      stroke(particleHue, 200, 255, 20);
      strokeWeight(200);
      point(particlePos.x, particlePos.y);

      stroke(this.particles[i][1], 155, 255, 70);
      strokeWeight(30);
      point(particlePos.x, particlePos.y);
    }

    pop();
  }
}


function setup() {
  createCanvas(700,700);

  colorMode(HSB, 280);

  background(255);
}


function draw() {
  background(255, lampParticles.length, 255);

  if (mouseIsPressed && mouseButton == LEFT) {
    lampParticles.push(new Lamp(mouseX, mouseY));
  }

  for (var i = lightParticles.length - 1; i > -1; i--) {
    lightParticles[i].move();
    lightParticles[i].display();

    if (lightParticles[i].life < 0) {
      lightParticles.splice(i, 1);
    }
  }

  for (var i = lampParticles.length - 1; i > -1; i--) {
    lampParticles[i].move();
    lampParticles[i].display();

    if (lampParticles[i].life < 0) {
      lampParticles.splice(i, 1);
    }
  }
}