"use strict";

// read number of hours worked from the user
const calcHours = (hours, rate) => (hours <= 40) ? rate*hours : (rate*40) + ((hours - 40)*(rate*1.5));

const askHours = () => {
    const pay = +prompt("How many hours did you work?");
    pay = calcHours(pay)
}