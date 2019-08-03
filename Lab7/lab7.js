"use strict";
let ctx;

let cheesePos = {
	x: undefined,
	y: undefined
};

let mikeyPos = {
	x: 300,
	y: 300
};

let distance;


function setup() {
	ctx = document.getElementById("surface").getContext("2d");
	
	// draw mouse and chese on click
	document.getElementById("surface").addEventListener("click", function(event){
		cheesePos.x = event.offsetX;
		cheesePos.y = event.offsetY;
		draw(cheesePos.x, cheesePos.y);
	})

	document.getElementById("surface").addEventListener("onkeydown", moveMouse, false);
}

function moveMouse(e){
	let keyPress = e.key;
	switch(keyPress){
		case "ArrowLeft":
				// left
				mikeyPos.x -= 10;
		case "ArrowUp":
				// up
				mikeyPos.y -= 10;
		case "ArrowRight":
				// right
				mikeyPos.x += 10;
		case "ArrowDown":
				// down
				mikeyPos.y += 10;
	}
	draw();
	distance = Math.sqrt((xCoord - mikeyPos.x)**2 + (yCoord - mikeyPos.y)**2);
}

//Draws Mikey and the cheese at the correct positions. 
//NO OTHER FUNCTION SHOULD CALL drawCheese or drawMikey
function draw(){
	ctx.clearRect(0, 0, 600, 600);
	drawMikey(mikeyPos.x, mikeyPos.y);
	drawCheese(cheesePos.x, cheesePos.y);
}



//Draws a wedge of cheese at the given coordinates
function drawCheese(x,y) {
	ctx.save();
	ctx.translate(x,y);
	
	ctx.beginPath();
	ctx.fillStyle="yellow";
	ctx.lineTo(-30,20);
	ctx.lineTo(20,0);
	ctx.lineTo(-30,-20);
	ctx.lineTo(-30,20);	
	ctx.fill();
	
	ctx.fillStyle="orange";
	ctx.beginPath();
	ctx.arc(2,1,4,0,2*Math.PI);
	ctx.fill();
	
	ctx.beginPath();	
	ctx.arc(-18,6,4,0,2*Math.PI);	
	ctx.fill();
	
	ctx.beginPath();	
	ctx.arc(-10,-5,4,0,2*Math.PI);		
	ctx.fill();
	
	ctx.beginPath();	
	ctx.arc(-24,-6,4,0,2*Math.PI);		
	ctx.fill();	
	ctx.restore();
}

//Draws Mikey mouse at x,y with the given rotation
function drawMikey(x,y) {
	ctx.save();
	ctx.translate(x,y);
	
	ctx.beginPath();
	ctx.arc(0,0,2,0,2*Math.PI);
	ctx.fill();
	
	ctx.beginPath();
	ctx.lineTo(0,0);
	ctx.lineTo(-20,10);
	ctx.lineTo(-20,-10);
	ctx.lineTo(0,0);
	ctx.stroke();
	ctx.fillStyle="white";
	
	ctx.beginPath();
	ctx.arc(-20,-10,5,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();
	
	ctx.beginPath();
	ctx.arc(-20,10,5,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();	
	
	ctx.fillStyle="black";
	ctx.beginPath();
	ctx.arc(-14,-4,2,0,2*Math.PI);
	ctx.fill();	
	
	ctx.beginPath();
	ctx.arc(-14,4,2,0,2*Math.PI);
	ctx.fill();	

	ctx.beginPath();
	ctx.lineTo(-4,-2);
	ctx.lineTo(-4,-10);
	ctx.lineTo(-4,-2);
	ctx.lineTo(0,-8);
	ctx.lineTo(-4,-2);
	ctx.stroke();
	
	ctx.beginPath();
	ctx.lineTo(-4,2);
	ctx.lineTo(-4,10);
	ctx.lineTo(-4,2);
	ctx.lineTo(0,8);
	ctx.lineTo(-4,2);
	ctx.stroke();	
	ctx.restore();
}
