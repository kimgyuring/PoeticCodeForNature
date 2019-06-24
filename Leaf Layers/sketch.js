var draw_x=0;
var draw_y=0;
var easing = .1;

function setup() {
	createCanvas(800,800);
	background(250,100,20,30);
	
}
var i=0
function draw() {
	
	var targetX=mouseX;
	var dx = targetX - draw_x;
	draw_x += dx * easing;
	
	var targetY = mouseY;
	var dy = targetY - draw_y;
	draw_y += dy * easing;

	var angle = atan2(mouseX- height/3, mouseX- width/3);
	
	
	translate(draw_x,draw_y);
	
	var a = atan2(mouseY- height/2, mouseX - width/2);
	rotate(a);
	
	var degs = degrees(a);

	
	c = color(200, random(5,200,100),100, random(0,5));
	fill(c);
	
	
	
	var degs2 = degrees(a);
	degs2= map(degs2, -90, 90, 180 ,360, true);
	degs2 = int(degs2);	
	
	
	noStroke();
	var radius = 2;
		if(i==0){
		beginShape();}
	
	if (i>0 && i < 50) {
		
			var x = cos(radians(i*90))*radius;
			var y = sin (radians(i*90)) *radius;
			vertex(x,y);
			vertex(x+10,y+10);
			quadraticVertex(240, 690, 560, 160);
			bezierVertex(460, 351, y, 58, 6, 999);
		endShape (CLOSE);
		}
	
	
	i = i+1; 
	
	if (i >=50){
		
		i=0;
		}
	
}