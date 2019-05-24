/*-----------------------------------------------

Renz Gabrinao
100324156
CPSC 1045
Lab 2
May 22, 2019

------------------------------------------------*/
"use strict";

function nameAndAgeClicked() {
	let name = prompt("Enter a name");
	let age = prompt("Enter a number");
	let output = `${name} ${2018 - age}`;
	setContent("nameAndAgeOutput", output);
}	

function sumOfCubesClicked() {
	let num1 = prompt("Enter a number.");
	let num2 = prompt("Enter another number.");
	
	let output = `Sum if ${num1} cubed and ${num2} cubed is ${sumOfCubes(num1, num2)}.`;
	setContent("sumOfCubesOutput", output);
}

function setContent(idElem, replaceElem){
	document.getElementById(idElem).innerHTML = replaceElem;
}

function sumOfCubes(num1, num2){
	return (num1 ** 3) + (num2 ** 3);
}

/*-----------------------------------------------------------------------------------*/

function farenToCelcClick(){
	let faren = +prompt("Enter Farenheit");
	let celc = farenToCelc(faren);
	let output = `${faren} degrees F is ${celc} degrees C`;
	setContent("temperatureOutput", output);
}

function celcToFarenClick(){
	let celc = +prompt("Enter Farenheit");
	let faren = celcToFaren(celc)
	let output = `${celc} degrees C is ${faren} degrees F`;
	setContent("temperatureOutput", output);
}

function farenToCelc(faren){
	return (faren - 32) * 5 / 9;
}

function celcToFaren(celc){
	return (celc * 9 /5) + 32;
}
