var scl = 10; 
var cols, rows; 
var zoff = 0; 
var points = []; 

function setup () {
  createCanvas (300, 500);
  
  for(var p = 0; p < 1000; p++){ 
  points[p] = new Particle();
  
  background (245);
  }
}
 
function draw() {
  flowfield();
  Particle();
  
  for(var p = 0; p < 1000; p++){
    points[p].follow(flowfield);
    points[p].update();
    points[p].display();
  }
}

function flowfield(){ 
  cols = width / scl; 
  rows = height / scl; 
  Flowfield = new Array (cols * rows); 
  var yoff = 0; 
  for (var y = 0; y < rows; y++) { 
    var xoff = 0;
    for (var x = 0; x < cols; x++){
      var index = x + y * cols;
      var angle = noise (xoff, yoff, zoff) * PI; 
      var v = p5.Vector.fromAngle(angle);
      flowfield[index] = v
      
      xoff += 0.1; 
     }
     yoff += 0.1;
     zoff += 0.0002;
  }
}

function Particle() {
  this.position = createVector(0 & 255, random(height)); 
  this.velocity = createVector(0 , 0);
  this.acceleration = createVector(0 , 0);
  this.maxspeed = 1;
  this.r = 200;
  this.b = 20;
 
    Particle.prototype.update = function() { 
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0); 
  }
  
 Particle.prototype.follow = function (vectors) { 
   
    var x = floor(this.position.x / scl);
    var y = floor(this.position.y / scl);
    var index = x + y * cols;
    var force = vectors[index]; 
    this.applyForce(force);
  }
    this.applyForce = function(force) {
    this.acceleration.add(force);
  }
  
  Particle.prototype.display = function() {
    strokeWeight (1);
    point(this.position.x, this.position.y);
    stroke(this.r, 20, this.b, 8);
   
    this.r = this.r +2
    if (this.r > 200) {
      this.r = 0
    }
    this.b = this.b-1
    if (this.b < 0) {
      this.b = 200
    }
  }
}