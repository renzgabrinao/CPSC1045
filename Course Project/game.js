"use strict";
let arraySize = 9;
let ctx;
let gameArray = new Array(arraySize);

// canvas dimensions 900 x 900
let canvasHeight = 900;
let canvasWidth = 900;

function setup(){
    ctx = document.getElementById("myCanvas").getContext("2d");
    setBoard();

    // click on canvas to fill squares
    document.getElementById("myCanvas").addEventListener("click", function(event){
        // get mouse coordinates from canvas
        let coords = convertToCoords(event.clientX, event.clientY);

        // update gameArray with coordinates from click
        if(gameArray[coords.x][coords.y] === "white"){
            gameArray[coords.x][coords.y] = "black";
        }else{
            gameArray[coords.x][coords.y] = "white";
        }

        // update board
        for(let i = 0; i < arraySize; i++){
            for(let j = 0; j < arraySize; j++){
                ctx.save();
                if(gameArray[i][j] === "black"){
                    ctx.fillStyle = "black";
                }else{
                    ctx.fillStyle = "white";
                }
                ctx.fillRect((i*100), (j*100), 100, 100); 
                ctx.restore();
            }
        }
        drawLines();       
    })
}

// convert clientX and clientY to xy
function convertToCoords(clientX, clientY){
    let xFloor = Math.floor(clientX/100);
    let yFloor = Math.floor(clientY/100);
    return {
        x: clientX >= 900 ? xFloor - 1 : xFloor, 
        y: clientY >= 900 ? yFloor - 1 : yFloor
    };
}

function setBoard(){
    // set 2d array for gameboard
    for(let i = 0; i < gameArray.length; i++){
        gameArray[i] = new Array(arraySize);
    }

    // set coordinates for 2d array
    for(let i = 0; i < gameArray.length; i++){
        for(let j = 0; j < gameArray.length; j++){
            gameArray[i][j] = "white";
        }
    }
    drawLines();
}

function drawLines(){
    // draw lines on canvas
    for(let i = 0; i < canvasHeight; i += 100){
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvasWidth);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvasHeight, i);
        ctx.stroke();
        ctx.closePath();
    }

}

