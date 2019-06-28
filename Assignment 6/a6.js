"use strict";

let ctx;
let colors = ['red','green','blue','purple','yellow','orange','pink'];

let peopleArray = new Array (2);

/*
	peopleArray => 	[color of each person]
					[child or adult]
*/

function setup() {
	ctx=document.getElementById("myCanvas").getContext("2d");
	
	// turn peopleArray into a 2d array
	let randSize = randomInteger(5, 10);
	for(let i = 0; i < 2; i++){
		peopleArray[i] = new Array (randSize);
	}

	// assign characteristics for each person
	// first row is column of colors
	// second row determines if child or adult
	for(let i = 0; i < 2; i++){
		for(let j = 0; j < randSize; j++){
			let colorIndex = randomInteger(0, colors.length - 1); 
			if(i === 0){
				peopleArray[i][j] = colors[colorIndex]; 
			}else{
				peopleArray[i][j] = randomInteger(0, 1);
			}
		}
	}
	
}


//Draws a person at position (x,y) which is bottom center
//color is a string setting the color
//if child is true, then a child is drawn (half sized person)
//An adult is 50 pixels tall, a child is 25
//An adult is 40 pixels wide, a child is 20
function drawPerson(x,y,color,child) {
	let height = 50;
	let halfWidth = 20;
	if (child) {
		height *= .5;
		halfWidth *= .5;
	}
	ctx.save();
	ctx.translate(x,y);
	ctx.strokeStyle=color;
	ctx.beginPath();
	ctx.lineTo(-halfWidth*.75,0);
	ctx.lineTo(0, -height/3);
	ctx.lineTo(halfWidth*.75,0);
	ctx.lineTo(0, -height/3);
	ctx.lineTo(0, -2*height/3);
	ctx.lineTo(0, -7*height/12);	
	ctx.lineTo(halfWidth,-2*height/3);
	ctx.lineTo(0, -7*height/12);	
	ctx.lineTo(-halfWidth,-2*height/3);		
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(0,-5*height/6,height/6,0,2*Math.PI);
	ctx.stroke();
	
	ctx.restore();
}

// return random int between low and high
function randomInteger(low, high){
	return Math.floor(Math.random() * (high - low + 1) + low);
}


