"use strict";
let ctx;

// canvas size is 400 x 400
function setup() {
	let canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");	
}

function pattern1(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 400, 400);
    ctx.save();

    for(let i = 50; i <= 350; i += 100){
        drawObject(i, 50, 1, 1);
    }

    ctx.restore();
}

function pattern2(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 400, 400);
    ctx.save();

    for(let i = 50; i <= 350; i += 100){
        for(let j = 50; j <= 350; j += 100){
            drawObject(i, j, 1, 1);
        }
    }

    ctx.restore();
}

function pattern3(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 400, 400);
    
    ctx.save();
    ctx.translate(200, 200);
    
    for(let i = 0; i < 4; i++){
        drawObject(100, 0, 1, 1);
        ctx.rotate(90 * Math.PI/180);
    }

    ctx.restore();
}

function pattern4(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 400, 400);
    
    ctx.save();
    ctx.translate(200, 200);

    let distance = 75;
    for(let i = 0; i < 2; i++){
        for(let j = 0; j < 4; j++){
            if(i === 0){
                // draw regular version [scale(1, 1)]
                drawObject(distance, 0, 1, 1);
                ctx.rotate(90 * Math.PI/180);
            }else{
                // draw flipped version [scale(-1, 1)]
                drawObject(distance, 0, -1, 1);
                ctx.rotate(90 * Math.PI/180);
            }
        }
        distance += 125;
    }

    ctx.restore();
}

function pattern5(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 400, 400);
    
    ctx.save();
    ctx.translate(50, 50);

    for(let i = 0; i < 4; i++){
        drawObject(0, 0, 1, 1);
        if(i === 0){
            ctx.rotate(90 * Math.PI/180);
            ctx.translate(0, -100);
        }else if(i === 1){
            ctx.rotate(90 * Math.PI/180);
            ctx.translate(-100, 0);
        }else if(i === 2){
            ctx.rotate(90 * Math.PI/180);
            ctx.translate(0, 100);
        }
    }

    ctx.restore();
}

// draw car
function drawObject(x, y, scaleW, scaleH){
    ctx.save();
    ctx.translate(x - 25, y);
    ctx.scale(scaleW, scaleH);

    // car body
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 50, 20);
    ctx.fillRect(10, -20, 30, 20);
    
    //wheel
    ctx.beginPath();
    ctx.arc(10, 20, 7, 0, 2*Math.PI);
    ctx.arc(40, 20, 7, 0, 2*Math.PI);
    ctx.fill();
    
    // window
    ctx.fillStyle = "white";
    ctx.fillRect(14, -19, 25, 16);
    
    //inner wheel
    ctx.beginPath();
    ctx.arc(10, 20, 5, 0, 2*Math.PI);
    ctx.arc(40, 20, 5, 0, 2*Math.PI);
    ctx.fill();
    
    // front lights
    ctx.beginPath();
    ctx.arc(47, 5, 2, 0, 2*Math.PI);
    ctx.fill();
    
    ctx.restore();
}
