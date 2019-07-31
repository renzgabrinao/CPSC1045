"use strict";
let ctx;
let canvas;

let arraySize = 11;
let gameArray = new Array(arraySize);
const tileHeight = 100;
let barriers = randomBarriers(10);

// canvas dimensions 1100 x 1100
let canvasHeight = 1100;
let canvasWidth = 1100;

let aiCoords = {
    x: 0,
    y: 0
}

let aiHealth = 10;

let directions = {
    north: 0,
    east: 1,
    south: 2,
    west: 3
}

function setup(){
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    
    setBoard(gameArray);
    
    // click on canvas to fill squares
    canvas.addEventListener("click", function (e){
        buildTower(e);
    });
}

/*-------------------------------------AI--------------------------------------------*/

function startRobot(){
    let robot = createRobot(directions.south, aiCoords, aiHealth);
    setInterval(function (){
        robot.move();
    }, 250);
}

/*  
    Create a robot that:
    -Has health
    -Has coordinates,
    -Moves with direction
        ~based on the direction, check left
        ~if theres a wall, turn right, check left again
        ~when left is free, move
*/
function createRobot(startingDirection, startingCoords, startingHealth){
    return {
        hp: startingHealth, 
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

            //loop while there is a wall, 
            //face right, then update x,yCoords and frontCoords
            //when false then move to the free spot
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
            
            //update health of ai
            let aiSurrounding = detectBarriers(this.coordinates);
            for(let i = 0; i < aiSurrounding.length; i++){
                if(aiSurrounding[i].color === "black"){
                    this.hp -= 1;
                }
            }
            console.log(`robot health at ${this.hp}`);
        },

        forward: function (x, y){
            // clear previous block
            drawAi(this.coordinates, "white");

            this.coordinates = {
                x: x,
                y: y
            };

            // draw robot on canvas with updated coords
            // if(this.hp < 0){
            //     setBoard(gameArrayCopy);
            // }

            if(this.coordinates.x === 10 && this.coordinates.y === 10){
                // reload webpage when lost
                location.reload(true);
                alert("You lost!");                
            }else{
                // move and draw ai on page with updated coords
                drawAi(this.coordinates, "blue");
                drawLines();
            }
        }
    }
}

// check if there is a wall or not
function isWall(coords){
    let isIndexInbound = function(index){
        return index >= 0 && index < 11;
    }
    return  !isIndexInbound(coords.x) || 
            !isIndexInbound(coords.y) ||
            gameArray[coords.x][coords.y] === "grey" ||
            gameArray[coords.x][coords.y] === "black";
}

function drawAi(coords, color){
    gameArray[coords.x][coords.y] = color;
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(coords.x * tileHeight, coords.y * tileHeight, tileHeight, tileHeight);
    ctx.restore();
}


function detectBarriers(aiCoords){
    let detectBarriers = [];
    let isIndexInbound = function(index){
        return index >= 0 && index < 11;
    }
    for(let i = -1; i < 2; i++){
        for(let j = -1; j < 2; j++){
            let xCoord = aiCoords.x + i;
            let yCoord = aiCoords.y + j;
            
            //push all the black blocks in array
            if( isIndexInbound(xCoord) && isIndexInbound(yCoord) && 
                gameArray[xCoord][yCoord] === "black"){
                detectBarriers.push({
                    x: xCoord,
                    y: yCoord,
                    color: "black"
                });
            }
            //check grey blocks
            if( isIndexInbound(xCoord) && isIndexInbound(yCoord) && 
                gameArray[xCoord][yCoord] === "grey"){
                detectBarriers.push({
                    x: xCoord,
                    y: yCoord,
                    color: "grey"
                });
            }
        }
    }
    return detectBarriers;
}

/*--------------------------------Board Setup------------------------------------*/

function buildTower(event){
    // get mouse coordinates from canvas
    let coords = convertToCoords(event.clientX, event.clientY);

    // update gameArray with coordinates from click
    if(gameArray[coords.x][coords.y] === "red"){
        alert("You can't build there!");
    }else if(gameArray[coords.x][coords.y] === "grey"){
        alert("You can't build there!");
    }else if(gameArray[coords.x][coords.y] === "blue"){
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
        x: clientX >= 1100 ? xFloor - 1 : xFloor, 
        y: clientY >= 1100 ? yFloor - 1 : yFloor
    };
}

function setBoard(gameArray){
    // set 2d array for gameboard
    for(let i = 0; i < gameArray.length; i++){
        gameArray[i] = new Array(arraySize);
    }

    // set coordinates for 2d array
    for(let i = 0; i < gameArray.length; i++){
        for(let j = 0; j < gameArray.length; j++){
            if(i === 10 && j === 10){
                // set end goal
                gameArray[i][j] = "red";
                ctx.fillStyle = gameArray[i][j];
                ctx.fillRect((i*tileHeight), (j*tileHeight), tileHeight, tileHeight);
            }else if(i === 0 && j === 0){
                // set start of robot
                gameArray[i][j] = "blue";
                ctx.fillStyle = gameArray[i][j];
                ctx.fillRect((i*tileHeight), (j*tileHeight), tileHeight, tileHeight);
            }else{
                gameArray[i][j] = "white";
            }
        }
    }
    
    // randomly generate barriers around the map between 1 - 10
    drawBarriers(barriers);
    drawLines();
}

// returns an array of objects of the barriers
function randomBarriers(numBarriers){
    let barrierList = [];
    while(numBarriers){
        let randX = Math.floor((Math.random() * gameArray.length-1) + 1);
        let randY = Math.floor((Math.random() * gameArray.length-1) + 1);
        if(randX === 0 && randY === 0){
            randX += 1;
            randY += 1;
        };
        if(randX === 10 && randY === 10){
            randX -= 1;
            randY -= 1;
        };
        barrierList.push({
            x: randX,
            y: randY,
            color: "grey"
        });
        numBarriers -= 1;
    }
    return barrierList;
}

// take in an array of objects and draw barriers randomly around the map
function drawBarriers(barriers){
    for(let i = 0; i < barriers.length; i++){
        gameArray[barriers[i].x][barriers[i].y] = barriers[i].color;
        ctx.fillStyle = barriers[i].color;
        ctx.fillRect((barriers[i].x*tileHeight), (barriers[i].y*tileHeight), tileHeight, tileHeight);
    }
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

