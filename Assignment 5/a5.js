"use strict";
let ctx;

// canvas size is 400 x 400
function setup() {
	let canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");	

    //drawObject(200, 200);
    drawPattern1(50, 50);

}

function drawPattern1(x, y){
    
    ctx.save();

    for(let i = x; i <= 350; i += 100){
        drawObject(i, y);
    }

    ctx.restore();
}

function drawObject(x, y){

    ctx.save();

    ctx.translate(x - 25, y - 10);

    // // car wheels
    // ctx.fillStyle = "black";
    // ctx.arc(25, 20, 10, 0, 2*Math.PI);
    // ctx.arc(75, 20, 10, 0, 2*Math.PI);
    // ctx.fill();

    // // car body
    // ctx.fillStyle = "pink";
    // ctx.fillRect(0, 0, 100, 20); 
    // ctx.fillRect(20, -20, 60, 25);
    // ctx.fillStyle = "white";
    // ctx.fillRect(25, -20, 55, 15);

    // ctx.beginPath();
    // ctx.lineTo(25, -20);
    // ctx.lineTo(25, -5);
    // ctx.lineTo(80, -5);
    // ctx.stroke();

    // ctx.beginPath();
    // ctx.lineTo(0, 0);
    // ctx.lineTo(0, 20);
    // ctx.lineTo(100, 20);
    // ctx.lineTo(100, 0);
    // ctx.lineTo(80, 0);
    // ctx.lineTo(80, -20);
    // ctx.lineTo(20, -20);
    // ctx.lineTo(20, 0);
    // ctx.lineTo(80, 0);
    // ctx.lineTo(0, 0);
    // ctx.stroke();

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 50, 20);

    ctx.restore();
}
