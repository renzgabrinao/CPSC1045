"use strict";

let expenses = 0;
let income = 0;

const formatDollarAmount = (money) => `$${money.toFixed(2)}`;

const addListItem = (id, text) => {
    const node = document.createElement("li");
    const newText = document.createTextNode(text);
    node.appendChild(newText);

    document.getElementById(id).innerHTML += node.innerHTML + "<br />";
}

const updateTotals = () => {
    document.getElementById("expTotal").innerHTML = formatDollarAmount(expenses);
    document.getElementById("incTotal").innerHTML = formatDollarAmount(income);
    document.getElementById("total").innerHTML = formatDollarAmount(12 * (income - expenses));
}

const addIncome = () => {
    const item = prompt("What item to add?");
    const money = +prompt("How much?");
    addListItem("income", `${formatDollarAmount(money)}: ${item}`)
    income += money;
    updateTotals();
}

const addExpense = () => {
    const item = prompt("What item to add?");
    const money = +prompt("How much?");
    addListItem("expenses", `${formatDollarAmount(money)}: ${item}`)
    expenses += money;
    updateTotals();
}