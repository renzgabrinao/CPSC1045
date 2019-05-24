"use strict";

let expenses = 0;
let income = 0;

let formatDollarAmount = (money) => `$${money.toFixed(2)}`;

let addListItem = (id, text) => {
    let node = document.createElement("li");
    let newText = document.createTextNode(text);
    node.appendChild(newText);

    document.getElementById(id).innerHTML += node.innerHTML + "<br />";
}

let updateTotals = () => {
    document.getElementById("expTotal").innerHTML = formatDollarAmount(expenses);
    document.getElementById("incTotal").innerHTML = formatDollarAmount(income);
    document.getElementById("total").innerHTML = formatDollarAmount(12 * (income - expenses));
}

let addIncome = () => {
    let item = prompt("What item to add?");
    let money = +prompt("How much?");
    addListItem("income", `${formatDollarAmount(money)}: ${item}`)
    income += money;
    updateTotals();
}

let addExpense = () => {
    let item = prompt("What item to add?");
    let money = +prompt("How much?");
    addListItem("expenses", `${formatDollarAmount(money)}: ${item}`)
    expenses += money;
    updateTotals();
}