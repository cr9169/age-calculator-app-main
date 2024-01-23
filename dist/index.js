"use strict";
function isValidDate(day, month, year) {
    if (year < 1 || month < 1 || month > 12 || day < 1) {
        return false;
    }
    const daysInMonth = [
        31,
        year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ];
    if (day > daysInMonth[month - 1]) {
        return false;
    }
    const inputDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    if (inputDate > currentDate) {
        return false;
    }
    return true;
}
function calculateAge(day, month, year) {
    if (!isValidDate(day, month, year)) {
        console.error("Invalid date or date is in the future");
        return null;
    }
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
    if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }
    return { years, months, days };
}
const age = calculateAge(24, 1, 2024);
console.log(age);
//# sourceMappingURL=index.js.map