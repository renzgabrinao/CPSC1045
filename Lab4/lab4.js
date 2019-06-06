"use strict";

function setContent(id, text){
    document.getElementById(id).innerHTML = text;
}

function enterNonNegativeNumber(){
    let check = -1;
    check = +prompt("Enter a non-negative number.");

    while (check < 0 || isNaN(check)){
        if(check < 0){
            check = +prompt("You entered a negative number, try again.");
        }else{
            check = +prompt("You did not enter a number, try again.");
        }
    } 
    return check;
}

// ask for initial value, increment, and number of times to repeatString
// ex. startVal = 10, incrementVal = 4, repeat = 5. Output ==> 10 14 18 22 26 30
function incrementInput(){
    let startVal = +prompt("Enter starting value.")
    let incrementVal = +prompt("Enter increment value.")
    let timesInc = +prompt("Enter number of times to increment");

    let msg = "";
    for(let i = 0; i <= timesInc; i++){
        msg += startVal + " ";
        startVal += incrementVal;
    }
    setContent("incValue", msg);
}

// ask for string input and number of times to repeat
// ex. str = "red", repeat = 3. ==> "redredred"
function repeatString(){
    let text = prompt("Enter text");
    let multiplier = enterNonNegativeNumber();

    let newText = "";
    let i;
    for(i = 0; i < multiplier; i++){
        newText += text;
    }
    return newText;
}

function printRepeatedStr(){
    let str = repeatString();
    setContent("stringRep", str);
}

/*
input - size of X
process - print cross with size of x
out - let size = 5, then => X   X
                             X X
                              X
                             X X
                            X   X                     
*/

function printX(){
    let xWidth = +prompt("Enter Size of X");
    let stringX = "";
    for(let rows = 1; rows <= xWidth; rows++){
        for(let columns = 1; columns <= xWidth; columns++){
            if(rows == columns || ((xWidth + 1) - rows) == columns){
                stringX += "X";
            }else{
                stringX += " ";
            }     
        }
        stringX += "\n"; // enter to next line after each iteration of the column loop
    }
    return stringX;
}

// prints cross on HTML page and how many times
function printManyX(){
    let originalX = printX();
    let multiplier = +prompt("How many Xs do you want on top of another?");
    let newX= "";

    for(let i = 0; i < multiplier; i++){
        newX += originalX;
    }
    setContent("challengeMe", newX);
}