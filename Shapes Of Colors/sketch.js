function setup() {
  createCanvas(600, 600);
}
var r,g,b;

var xx, yy, aa, bb, cc, dd, ee, ff, gg, hh;

var count = 0;

var end = 180;

  function draw() {
  if(count<end){
    r = random(255);
    g = random(255);
    b = random(255);
    xx = random(255);
    yy = random(255);
    aa = random(600);
    bb = random(600);
    cc = random(600);
    dd = random(600);
    ee = random(600);
    ff = random(600);
    gg = random(600);
    hh = random(600);

    count += 1;
  }
  if(count == end ){
      fill(255);
     }

  fill(r, g, b);

  if(count == 1){
    background(r,g,b);
  }

  if(count %10 == 1){
    arc(aa, bb, cc, dd, 0+ee, HALF_PI+ff);
  }

  if(count %10 == 2){
    ellipse(aa, bb, cc, dd);
  }

  if(count %10 == 3){
    circle(aa, bb, cc);
  }

  if(count %10 == 4){
    line(aa, bb, cc, dd);
  }

  if(count %9 == 5){
    point(aa, bb);
  }

  if(count %10 == 6){
    quad(aa, bb, cc, dd, ee, ff, gg, hh);
  }
  if(count %10 == 7){
    rect(aa, bb, cc, dd, ee);
  }

  if(count %10 == 8){
    square(aa, bb, cc, dd, ee, ff, gg);
  }

  if(count %10 == 9){
    triangle(aa, bb, cc, dd, ee, ff);
  }}