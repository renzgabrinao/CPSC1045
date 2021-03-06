"use strict";

let setContent = (id, replace) => document.getElementById(id).innerHTML = replace;

// read number of hours worked from the user
let calcHours = (hours, rate) => (hours <= 40) ? rate*hours : (rate*40) + ((hours - 40)*(rate*1.5));

// display pay on html
let askHours = () => {
    let hours = +prompt("How many hours did you work?");
    let rate = +prompt("How much do you get paid?");
    let pay = calcHours(hours, rate);

    if(hours >= 0){
        setContent("placePay", `In ${hours} hours you made $${pay}.`);
    }else{
        setContent("placePay", `You entered a negative number or did not enter a number.`);
    }
}


let errorMsg = (email) => {
    setContent("placeEmail", `${email} is a not a valid email.`);
}

/* validate email:
        must be in form of a@b.c
*/
let validateEmail = () => {
    let email = prompt("Enter email");
    email.trim();

    // indexOf('') => leftmost | lastIndexOf('') => rightmost
    let leftAtIndex = email.indexOf('@');
    let rightAtIndex = email.lastIndexOf('@');
    let leftDotIndex = email.indexOf('.');
    let rightDotIndex = email.lastIndexOf('.');
    
    if(leftAtIndex === 0 || leftAtIndex === -1) {
        errorMsg(email);
        return;
    }

    if(leftAtIndex !== rightAtIndex){
        errorMsg(email);
        return;
    }

    if(leftDotIndex !== rightDotIndex){
        errorMsg(email);
        return;
    }
    
    if(leftAtIndex > leftDotIndex){
        errorMsg(email);
        return;
    }

    setContent("placeEmail", `${email} is a valid email.`);
}
