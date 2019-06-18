"use strict";

function setContent(id, text){
    document.getElementById(id).innerHTML = text;
}

function getAcronym(){
    let string = prompt('Enter phrase');

    // .split separates the string with parameter [space] into an array
    // "Hello World".split(' ') ==> ["Hello", "World"]
    let split = string.split(' ');

    let acronym = [];
    let j = 0;

    // check for every index of array: if length > 0, store first char of that index in acronym
    for(let i = 0; i < split.length; i++){
        if(split[i].length > 0){
            acronym[j] = split[i].charAt(0);
            j++;
        }
    }
    
    // acronym.join('') combines everything in that array in one string with [nothing] as parameter
    // ['a', 'b', 'c'].join('') ==> "abc"
    let msg = string + " becomes " + acronym.join('').toLocaleUpperCase();
    setContent("printAcronym", msg);    
}

function getCross(){
    let size = 0;
    while(!(size % 2)){
        size = +prompt("Enter odd number");
    }
    let msg = "";
    
    // round down to get middle
    let mid = Math.floor(size / 2);
    
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            // middle case
            if(i === mid && j === mid){
                msg += "+";
            }else if(j === mid){
                msg += "|";
            }else if(i === mid){
                msg += "-";
            }else{
                msg += " ";
            }
        }
        msg += "\n";
    }

    setContent("printCross", msg);
}