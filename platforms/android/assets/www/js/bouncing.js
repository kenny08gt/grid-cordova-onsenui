// Now some basic canvas stuff. Here we'll make a variable for the canvas and then initialize its 2d context for drawing
var canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d");
		var x = document.getElementById("myInput");
		var punteo=0;
		var palabras  = window.localStorage.getItem('palabras');
		var imagenes  = window.localStorage.getItem('imagenes');
		var listpalabras = new Array();
		var listimagenes = new Array();
		var listpasadas = new Array ();
		var iterador=0;
		var palabraactual;
		var imagen1;
		var imagen2;
		var palabra1;
		var palabra2;
		var buena = false;
		var Buildcorrecto = 0;

//

// Now setting the width and height of the canvas
var widthScreen = document.documentElement.clientWidth;

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
	x: W/2 - (((W*40)/100)/2),
	y: 50,

	// Velocity components
	vx: 0,
	vy: 0.5,
	w:  (W*30)/100,
	h:  (H*30)/100,
	r: 170,

	draw: function() {
		// Here, we'll first begin drawing the path and then use the arc() function to draw the circle. The arc function accepts 6 parameters, x position, y position, radius, start angle, end angle and a boolean for anti-clockwise direction.
		var img=document.getElementById("ball");
		var imgW = (W*30)/100;
		var imgH = (H*30)/100;
		ctx.drawImage(img,this.x , this.y,imgW,imgH);
	/*	ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();*/
	}
};
building = {
	x: 0,
	y: H-160,

	w:  (H*30)/100,
	h: (H*30)/100,
	// Velocity components
	vx: 0,
	vy: 1,

	draw: function() {
		// Here, we'll first begin drawing the path and then use the arc() function to draw the circle. The arc function accepts 6 parameters, x position, y position, radius, start angle, end angle and a boolean for anti-clockwise direction.
		var img=document.getElementById("building");
		var imgW = (W*30)/100;
		var imgH = (H*30)/100;
		ctx.drawImage(img,this.x, this.y,imgW,imgH);
	}
};

building2 = {
	x: 0,
	y: 0,

	w: (W*30)/100,
	h:  (H*30)/100,
	// Velocity components
	vx: 0,
	vy: 1,

	draw: function() {
		// Here, we'll first begin drawing the path and then use the arc() function to draw the circle. The arc function accepts 6 parameters, x position, y position, radius, start angle, end angle and a boolean for anti-clockwise direction.
		var img=document.getElementById("building2");
		var imgW = (W*30)/100;
		var imgH = (H*30)/100;
		ctx.drawImage(img,this.x, this.y,imgW,imgH);
	}
};

estrella = {
	x: W/2,
	y: H/2,

	draw: function() {
		// Here, we'll first begin drawing the path and then use the arc() function to draw the circle. The arc function accepts 6 parameters, x position, y position, radius, start angle, end angle and a boolean for anti-clockwise direction.
		var img=document.getElementById("estrella");
		ctx.drawImage(img,this.x, this.y,60,60);
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
	var DerBuild2 = building2.x + building2.w;
	var IzqBuild2 = building2.x;
	var SupBuild2= building2.y;
	var InfBuild2 = building2.y + building2.h;
	if(DerBuild> (IzqBall+10) &&  IzqBuild < (DerBall-10) && SupBuild < (InfBall-10)){
		 var valor = document.getElementById("building").value;
		 if(valor==palabraactual&&buena==false){
			 punteo++;
			 document.getElementById('puntuacion').innerHTML = punteo;
			 document.getElementById("building").src ="";
			 buena = true;
			 Buildcorrecto =1;
		 }
		 else if (valor != palabraactual){
		//	 document.getElementById('puntuacion').innerHTML = punteo--;
			 window.localStorage.setItem('puntuacion', punteo);
			 window.location = "loose.html";
		 }

		return false;

	}
	if(DerBuild2> (IzqBall+10) &&  IzqBuild2 < (DerBall-10) && SupBuild2 < (InfBall-10) && InfBuild2 > (SupBall+10) ){
		var valor = document.getElementById("building2").value;
		if(valor==palabraactual&& buena==false){
			punteo++;
			document.getElementById('puntuacion').innerHTML = punteo;
			document.getElementById("building2").src ="";
			buena = true;
			Buildcorrecto =2;
		}
		else if (valor != palabraactual){
	//		document.getElementById('puntuacion').innerHTML = punteo--;
			window.localStorage.setItem('puntuacion', punteo);
			window.location = "loose.html";
		}
	 return false;

	}
	else{
		return false;
	}


}
// A function that will update the position of the ball is also needed. Lets create one
function update() {
	var state=VerifyColission();
	//console.log(state);
	document.getElementById('palabra').innerHTML =palabraactual;
	if(Buildcorrecto!=1){
		document.getElementById("building").src=imagen1;
		document.getElementById("building").value = palabra1;
	}
	if (Buildcorrecto !=2){
		document.getElementById("building2").src=imagen2;
		document.getElementById("building2").value = palabra2;
	}

		clearCanvas();
		ball.draw();
		building.draw();
		building2.draw();


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

		if(ball.y -5 < 0) {
			// First, reposition the ball on top of the floor and then bounce it!
			ball.y = 5;
			//ball.vy *= -bounceFactor;
			// The bounceFactor variable that we created decides the elasticity or how elastic the collision will be. If it's 1, then the collision will be perfectly elastic. If 0, then it will be inelastic.
			console.log('top');
		}
		if(buena){
			estrella.y = estrella.y -5;
			estrella.draw();
		}
		if(building.x+50>0){
			building.x = building.x -2;
			building2.x = building2.x -2.5;
		}else{
			building.x=W;
			building2.x=W;
			estrella.y = H/2;
			buena = false;
			Buildcorrecto=0;
			consultarbd();
		}


}
function consultarbd (){
		listpalabras = palabras.split("&");
		var len = listpalabras.length-1;
		var i1 = Math.floor((Math.random()*len)); //Primer random de palabraactual
		palabraactual = listpalabras[i1];
		listimagenes = imagenes.split("&");
		var i2=i1;
		while(i2 == i1){
			i2 = Math.floor((Math.random()*len)); //Palabra incorrecta
		}
		var turno = Math.floor((Math.random()*2)); //Random 0 1
		if (turno ==0){
			imagen2 = listimagenes[i1];
			palabra2 = listpalabras[i1];
			imagen1 = listimagenes[i2];
			palabra1 = listpalabras[i2];
		}
		else{
			imagen2 = listimagenes[i2];
			palabra2 = listpalabras[i2];
			imagen1 = listimagenes[i1];
			palabra1 = listpalabras[i1];
		}


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
