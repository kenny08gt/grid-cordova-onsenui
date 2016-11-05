// Now some basic canvas stuff. Here we'll make a variable for the canvas and then initialize its 2d context for drawing
var canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d");
		var x = document.getElementById("myInput");
		var punteo=0;
		var param  = window.localStorage.getItem('param');
//

// Now setting the width and height of the canvas

var W = 350,
		H = 450;

		H=$(document).height() -130;   // returns height of browser viewport
		W=$(document).width();   // returns width of browser viewport

// Applying these to the canvas element
canvas.height = H; canvas.width = W;

// First of all we'll create a ball object which will contain all the methods and variables specific to the ball.
// Lets define some variables first

var ball = {},
		gravity = 0.2,
		bounceFactor = 0.7;

// The ball object
// It will contain the following details
// 1) Its x and y position
// 2) Radius and color
// 3) Velocity vectors
// 4) the method to draw or paint it on the canvas

ball = {
	x: W/2,
	y: 50,

	// Velocity components
	vx: 0,
	vy: 1,
	w: 300,
	h: 170,
	r: 170,

	draw: function() {
		// Here, we'll first begin drawing the path and then use the arc() function to draw the circle. The arc function accepts 6 parameters, x position, y position, radius, start angle, end angle and a boolean for anti-clockwise direction.
		var img=document.getElementById("ball");
		ctx.drawImage(img,this.x, this.y,200,100);
	/*	ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();*/
	}
};
building = {
	x: 0,
	y: H-256,

	w: 80,
	h: 256,
	// Velocity components
	vx: 0,
	vy: 1,

	draw: function() {
		// Here, we'll first begin drawing the path and then use the arc() function to draw the circle. The arc function accepts 6 parameters, x position, y position, radius, start angle, end angle and a boolean for anti-clockwise direction.
		var img=document.getElementById("building");
		ctx.drawImage(img,this.x, this.y);
	/*	ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();*/
	}
};

// When we do animations in canvas, we have to repaint the whole canvas in each frame. Either clear the whole area or paint it with some color. This helps in keeping the area clean without any repetition mess.
// So, lets create a function that will do it for us.
function clearCanvas() {
	ctx.clearRect(0, 0, W, H);
}
function VerifyColission(){
	var DerBall = ball.x + ball.r;
	var IzqBall = ball.x;
	var SupBall= ball.y;
	var InfBall = ball.y;
	var DerBuild = building.x + building.w;
	var IzqBuild = building.x;
	var SupBuild= building.y;
	var InfBuild = building.y + building.h;
	if(DerBuild> IzqBall &&  IzqBuild < DerBall && SupBuild < InfBall){
		 document.getElementById('puntuacion').innerHTML =punteo++;
		return true;

	}
	else{
		return false;
	}


}
// A function that will update the position of the ball is also needed. Lets create one
function update() {
	var state=VerifyColission();
	//console.log(state);
//	  document.getElementById('palabra').innerHTML =param;
		clearCanvas();
		ball.draw();
		building.draw();
if(!state){
		// Now, lets make the ball move by adding the velocity vectors to its position
		if(ball.y<H){
			ball.y += ball.vy;
		}

		// Ohh! The ball is moving!
		// Lets add some acceleration
		if(ball.vy<100){
			ball.vy += gravity;
		}
		//Perfect! Now, lets make it rebound when it touches the floor
		if(ball.y + 60 > H) {
			// First, reposition the ball on top of the floor and then bounce it!
			ball.y = H - 60;
			//ball.vy *= -bounceFactor;
			// The bounceFactor variable that we created decides the elasticity or how elastic the collision will be. If it's 1, then the collision will be perfectly elastic. If 0, then it will be inelastic.
			console.log('fondo');
		}

		if(building.x+50>0){
			building.x--;
		}else{
			building.x=W;
		}
	}

}

function consultarbd() {
	alert("dentro");
	var db = window.sqlitePlugin.openDatabase({name: "pruebas.db", location: 2, createFromLocation: 1});
	db.transaction(CrearDB, errorDB);
}

function CrearDB(tx) {
		alert("dentro2");
		 document.getElementById('palabra').innerHTML ="helllllllo";
		 tx.executeSql('SELECT * FROM palabras WHERE categoria_padre=?', [param], ListarDB, error);
}

function ListarDB(tx, results) {
  var len = results.rows.length;
  var listado ='';
 for (var i=0; i<len; i++){
 }
  document.getElementById('palabra').innerHTML =results.rows.item(0).nombre;
}

function errorDB(tx, err) {
 alert("Error de insert: "+err);
}

function error(tx, err) {
 alert("Error de select: "+err);
}
// Now, the animation time!
// in setInterval, 1000/x depicts x fps! So, in this casse, we are aiming for 60fps for smoother animations.
setInterval(update, 1000/60);
consultarbd();

// This completes the tutorial here. Try experimenting with different values to get a better understanding.

// Also, try playing with the x-component of velocity ;)

$('#canvas').click(function(){
	//console.log("click ");
	ball.vy = 10 * -bounceFactor;
	ball.y=ball.y-5;
});
