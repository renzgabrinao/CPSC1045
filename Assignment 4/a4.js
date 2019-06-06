"use strict";

function setContent(id, text){
    document.getElementById(id).innerHTML = text;
}

function getAcronym(){
    let string = prompt('Enter phrase');
    let split = string.split(' ');

    let acronym = [];
    let j = 0;
    for(let i = 0; i < split.length; i++){
        if(split[i].length > 0){
            acronym[j] = split[i].charAt(0);
            j++;
        }
    }


    setContent("printAcronym", `${string} becomes ${(acronym.join('')).toLocaleUpperCase()}`)
    

    
}