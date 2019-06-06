"use strict";

function setContent(id, newText){
	document.getElementById(id).innerHTML = newText;
}

function teenCanIVote() {
	let  age = prompt("Enter your age:");
	if(age < 0){
		setContent("teenOutput", `You entered a negative number`);
	}else if(age < 13){
		setContent("teenOutput", `You will be a teenager in ${13 - age} years.`);
	}else if(age <= 19){
		setContent("teenOutput", `You are a teenager!`);
	}else if(age > 19){
		setContent("teenOutput", `Your last were a teenager ${age - 19} years ago.`);
	}else{
		setContent("teenOutput", `You did not enter a number.`);
	}
}

function yesNo(str){
	let ans = prompt(str);
	// if yes, return 1 otherwise return 0
	if(ans[0].toLowerCase() === "y"){
		return true;
	}else{
		return false;
	}
}

function askSiblings() {
	let oldSib = +yesNo("Do you have any older siblings?");
	let youngSib = +yesNo("Do you have any younger siblings?");

	if(oldSib && youngSib){
		setContent("siblingOutput", "You are the middle child.")

	}else if(oldSib && !youngSib){
		setContent("siblingOutput", "You are the youngest child.")

	}else if(!oldSib && youngSib){
		setContent("siblingOutput", "You are the oldest child.")

	}else{
		setContent("siblingOutput", "You are the only child.")
	}

}

function milkAdviceClick() {

	let msg = "";
	let condition = +yesNo("Is the milk expired?");

	if(condition){
		msg += "Your milk has expired, ";
		let smellBad = +yesNo("Does it smell bad?");

		if(!smellBad){
			msg += " smells ok,"
			let lumpy = +yesNo("Pour some out. Is it lumpy?");
			if(!lumpy){
				msg += " the milk is not lumpy. It should be okay to drink.";
			}else{
				msg += " It's probably yogurt at this point. Have a taste.";
			}

		}else{
			msg += " and it smells bad. You should throw it away.";
		}

	}else{
		msg += " Milk is okay to drink!";
	}
	setContent("milkOutput", msg);
}


