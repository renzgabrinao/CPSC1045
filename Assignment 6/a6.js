"use strict";

let ctx;
let colors = ['red','green','blue','purple','yellow','orange','pink'];
let peopleArray = initializeArray();

function setup() {
	ctx = document.getElementById("myCanvas").getContext("2d");
	draw();
}

// return random int between low and high
function randomInteger(low, high){
	return Math.floor(Math.random() * (high - low + 1) + low);
}

/*------------------Make Array------------------*/

// make 2d array
function initializeArray(){
	let peopleArray = new Array (2);
	
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
	return peopleArray;
}

/*------------------Draw People on Canvas------------------*/

function isAdult(item){
	return item === 0;
}

function getColor(arr, index){
	return arr[0][index];
}

function draw(){
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, 400, 200);

	ctx.save();

	let xDistance = 0;

	for(let i = 0; i < peopleArray[0].length; i++){
		if(isAdult(peopleArray[1][i])){
			xDistance += 40;
		}else{
			xDistance += 20;
		}
		drawPerson(xDistance, 200, getColor(peopleArray, i), peopleArray[1][i]);
	}
	ctx.restore();
}

/*------------------Draw Person------------------*/

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
	// translate so starting point is the left hand of the person
	ctx.translate(x - halfWidth,y);

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

/*--------------------Button Functions------------------*/

function addPeople(){
	let userInput = document.getElementById("numOfPeople");
	let addMore = userInput.value;

	for(let i = 0; i < addMore; i++){
		let colorIndex = randomInteger(0, colors.length - 1); 
		// 1-push new color
		peopleArray[0].push(colors[colorIndex]);
		// 2-push child/adult
		peopleArray[1].push(randomInteger(0, 1));
	}
	draw();
}

function reversePeople(){
	for(let i = 0; i < peopleArray[1].length; i++){
		if(peopleArray[1][i]){
			peopleArray[1][i] = 0;
		}else{
			peopleArray[1][i] = 1;
		}
	}
	draw();
}

function addChildBetween(){
	for(let i = 0; i < peopleArray[1].length; i++){
		let colorIndex = randomInteger(0, colors.length - 1); 
		if((peopleArray[1][i] === 0) && (peopleArray[1][i + 1] === 0)){
			// add color between
			peopleArray[0].splice((i + 1), 0, colors[colorIndex]);
			// add child between
			peopleArray[1].splice((i + 1), 0, 1); 
		}
	}
	draw();
}

function removeAdults(){
	for(let i = 0; i < peopleArray[1].length; i++){
		if(peopleArray[1][i] === 0){
			peopleArray[0].splice(i, 1);
			peopleArray[1].splice(i, 1);
		}
	}
	draw();
}

