"use strict";
let ctx;
let canvas;
let arraySize = 9;
let gameArray = new Array(arraySize);
const tileHeight = 100;
// canvas dimensions 900 x 900
let canvasHeight = 900;
let canvasWidth = 900;
let aiCoords = convertToCoords(0, 0);

function setup(){
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    setBoard();
    
    initializeAi();
    // click on canvas to fill squares
    canvas.addEventListener("click", function (e){
        buildTower(e);
    });
}

/*-------------------------------------AI--------------------------------------------*/

function drawAi(color){
    gameArray[aiCoords.x][aiCoords.y] = color;
    ctx.save();
    
    ctx.fillStyle = color;
    ctx.fillRect(aiCoords.x * tileHeight, aiCoords.y * tileHeight, tileHeight, tileHeight);
    ctx.restore();
    console.log(`${color} COORDS AT ${aiCoords.x}, ${aiCoords.y}`);
}

function initializeAi(){
    console.log(`Creating AI on (${aiCoords.x}, ${aiCoords.y})`);
    drawAi("blue");
    setInterval(function (){
        moveAi();
    }, 1000);
}

function moveAi(){
    console.log(`Moving AI`);
    let getRandomInt = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // get open tiles
    let openTilesArr = getOpenTiles(aiCoords);  // expecting array of coords of open tiles
    // pick random tile
    let newCoords = openTilesArr[getRandomInt(0, openTilesArr.length - 1)];
    // move
    drawAi("white");
    aiCoords = newCoords;
    drawAi("blue");
    drawLines();
}

function getOpenTiles(aiCoords){
    let openTilesArr = [];
    let isIndexInbound = function(index){
        return index >= 0 && index < 9;
    }
    for(let i = -1; i < 2; i++){
        for(let j = -1; j < 2; j++){
            let xCoord = aiCoords.x + i;
            let yCoord = aiCoords.y + j;
            
            if(isIndexInbound(xCoord) && isIndexInbound(yCoord) && gameArray[xCoord][yCoord] === "white"){
                openTilesArr.push({
                    x: xCoord,
                    y: yCoord
                });
            }
        }
    }
    console.log(openTilesArr);
    return openTilesArr;
}


/*-----------------------------------------------------------------------------------*/


function buildTower(event){
    // get mouse coordinates from canvas
    let coords = convertToCoords(event.clientX, event.clientY);
    console.log(`Clicked On ${coords.x} , ${coords.y}`);
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

            for(let k = 0; k < tileHeight; k++){
                if(gameArray[i][j] === "black"){
                    ctx.fillStyle = "grey";
                    setTimeout(function() {
                        ctx.fillStyle = "black";
                        ctx.fillRect((i*tileHeight), (j*tileHeight), tileHeight, k);
                    }, 100);
                } else if(gameArray[i][j] === "white"){
                    ctx.fillStyle = "white";
                    ctx.fillRect((i*tileHeight), (j*tileHeight), tileHeight, k);
                }
            }
            ctx.restore();
        }
    }
    drawLines();       
}

// convert clientX and clientY to xy
function convertToCoords(clientX, clientY){
    let xFloor = Math.floor(clientX/tileHeight);
    let yFloor = Math.floor(clientY/tileHeight);
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
    for(let i = 0; i < canvasHeight; i += tileHeight){
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

