"use strict";

let x = 0;
let y = 0;

const formatDollarAmount = (money) => {
    console.log(`$${money.toFixed(2)}`);
    
}

const addListItem = (id, text) => {
    const node = document.createElement("li");
    const newText = document.createTextNode(text);
    node.appendChild(newText);

    document.getElementById(id).innerHTML += node.innerHTML;
}