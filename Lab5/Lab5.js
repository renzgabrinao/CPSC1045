"use strict";
let ctx;

// canvas size is 1000 x 1000
function setup() {
	let canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");	
	
    drawTreeLoop(500, 500, 0, 8);
}

// (x, y) => center point at bottom of tree
function drawTree(x, y){

    ctx.save();
    
    ctx.translate(x, y);

    ctx.fillStyle = "brown";
    ctx.fillRect(0, 0, 20, 50);

    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(10, 18, 20, 0, 2* Math.PI);
    ctx.fill();

    ctx.restore();
}

// (x, y)   => center point at bottom of tree
// r        => distance from center to the base
// count    => number of trees in a circle
function drawTreeCircle(x, y, r, count){

    ctx.save();
    ctx.translate(x, y);
    
    for(let i = 0; i < count; i++){
        drawTree(0, -r);
        ctx.rotate(2 * Math.PI / count);
    }

    ctx.restore();   
}

function drawTreeLoop(x, y, r, count){

    for(let i = count; i <= 100; i += count){
        drawTreeCircle(500, 500, r, i);
        r += 100;
    }
}