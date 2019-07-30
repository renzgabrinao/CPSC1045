"use strict";
let ctx;
let canvas;
let arraySize = 9;
let gameArray = new Array(arraySize);
const tileHeight = 100;
// canvas dimensions 900 x 900
let canvasHeight = 900;
let canvasWidth = 900;

let aiCoords = {
    x: 0,
    y: 0
}

let directions = {
    north: 0,
    east: 1,
    south: 2,
    west: 3
}

function setup(){
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    
    setBoard();
    
    // click on canvas to fill squares
    canvas.addEventListener("click", function (e){
        buildTower(e);
    });
}

/*-------------------------------------AI--------------------------------------------*/
function startRobot(){
    let robot = createRobot(2, aiCoords);
    setInterval(function (){
        robot.move();
    }, 250);
}

/*  
    Create a robot that:
    -Has coordinates,
    -Moves with direction
        ~Based on the direction, check left
        ~if theres a wall, turn right, check again
        ~else, turn left, then move
*/
function createRobot(startingDirection, startingCoords){
    return {
        direction: startingDirection,
        coordinates: startingCoords,
        faceLeft: function() {

            this.direction = this.direction - 1;
            if (this.direction < 0) this.direction = 3;
        },

        faceRight: function() {           

            this.direction = this.direction + 1;
            if (this.direction > 3) this.direction = 0;
        },

        move: function (){

            this.faceLeft();
            let xCoord = this.coordinates.x;
            let yCoord = this.coordinates.y;

            // get the coordinates of the wall in front of robot
            switch(this.direction){
                case directions.north:
                    yCoord -= 1;
                    break;
                case directions.east:
                    xCoord += 1;
                    break;
                case directions.south:
                    yCoord += 1;
                    break;
                case directions.west:
                    xCoord -= 1;
                    break;
                default:
                    break;
            }

            let frontCoords = { x: xCoord, y: yCoord };

            // loop while there is a wall, when false then move to the free spot
            while(isWall(frontCoords)){
                this.faceRight();
                switch(this.direction){
                    case directions.north:
                        yCoord -= 1;
                        break;
                    case directions.east:
                        xCoord += 1;
                        break;
                    case directions.south:
                        yCoord += 1;
                        break;
                    case directions.west:
                        xCoord -= 1;
                        break;
                    default:
                        break;
                }
                // update the coordinates of the wall
                frontCoords = { x: xCoord, y: yCoord };
            }
            this.forward(frontCoords.x, frontCoords.y);
        },

        forward: function (x, y){
            this.coordinates = {
                x: x,
                y: y
            };
            // draw robot on canvas with updated coords
            if(this.coordinates.x === 8 && this.coordinates.y === 8){
                alert("You lost!");
                return false;                   
            }else{
                drawAi(this.coordinates, "blue");
                drawLines();
            }
        }
    }
}

// check if there is a wall or not
function isWall(coords){
    let isIndexInbound = function(index){
        return index >= 0 && index < 9;
    }
    return !isIndexInbound(coords.x) || !isIndexInbound(coords.y) || gameArray[coords.x][coords.y] === "black";
}

function drawAi(coords, color){
    gameArray[coords.x][coords.y] = color;
    ctx.save();
    
    ctx.fillStyle = color;
    ctx.fillRect(coords.x * tileHeight, coords.y * tileHeight, tileHeight, tileHeight);
    ctx.restore();
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
    return openTilesArr;
}

/*-----------------------------------------------------------------------------------*/

function buildTower(event){
    // get mouse coordinates from canvas
    let coords = convertToCoords(event.clientX, event.clientY);

    // update gameArray with coordinates from click
    if(gameArray[coords.x][coords.y] === "red"){
        alert("You can't build there!");    
    }else if(gameArray[coords.x][coords.y] === "white"){
        gameArray[coords.x][coords.y] = "black";
    }else if(gameArray[coords.x][coords.y] === "black"){
        gameArray[coords.x][coords.y] = "white";
    }

    // update board
    for(let i = 0; i < arraySize; i++){
        for(let j = 0; j < arraySize; j++){
            ctx.save();
            for(let k = 0; k < tileHeight; k++){
                if(gameArray[i][j] === "black"){
                    ctx.fillStyle = "black";
                    ctx.fillRect((i*tileHeight), (j*tileHeight), tileHeight, k)
                }else if(gameArray[i][j] === "white"){
                    ctx.fillStyle = "white";
                    ctx.fillRect((i*tileHeight), (j*tileHeight), tileHeight, k);
                }
            ctx.restore();
            }
        }
    drawLines();       
    }
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
            if(i === 8 && j === 8){
                // set end goal
                gameArray[i][j] = "red";
                ctx.fillStyle = gameArray[i][j];
                ctx.fillRect((i*tileHeight), (j*tileHeight), tileHeight, tileHeight);
            }else{
                gameArray[i][j] = "white";
            }
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

