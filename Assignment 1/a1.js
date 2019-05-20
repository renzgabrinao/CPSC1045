	
function nosesAndFeet() {	
	//use the outputParagraph variable to access the div element
	let outputParagraph = document.getElementById("output");

	//Ask the user to enter the number of people and number of pets	
	const people = Number(prompt('How many people live at your home?'));
	const pets = Number(prompt("How many pets live at your home?"));

	//Calculate the number of noses/feet
	const noses = people + pets;
	const feet = (4 * pets) + (2 * people); 
	//Display the output	
	//outputParagraph.innerHTML = "The people and pets at your home have a total of " + noses + " noses and " + feet + " feet.";
	outputParagraph.innerHTML = `The people and pets at your home have a total of ${noses} noses and ${feet} feet.`;
}