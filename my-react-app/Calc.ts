import { dateTemplate } from "../types";

export class Calc {
  static ValidateDate(day: number, month: number, year: number): string[] {
    const errors: string[] = [];
    const currentDate = new Date();
    const inputDate = new Date(year, month - 1, day);

    const yearError =
      year < 0
        ? "invalidYear"
        : year > currentDate.getFullYear()
        ? "futureYear"
        : null;

    if (yearError) errors.push(yearError);

    if (month < 1 || month > 12) {
      errors.push("invalidMonth");
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
    if (day < 1 || day > daysInMonth[month - 1]) {
      errors.push("invalidDay");
    }

    if (!errors.length && inputDate > currentDate) {
      if (inputDate.getFullYear() > currentDate.getFullYear())
        errors.push("futureDay");
      if (inputDate.getFullYear() > currentDate.getFullYear())
        errors.push("futureMonth");
      if (inputDate.getFullYear() > currentDate.getFullYear())
        errors.push("futureYear");
    }

    return errors;
  }

  static calculateAge(
    day: number,
    month: number,
    year: number
  ): dateTemplate | string[] | null {
    if (!Calc.ValidateDate(day, month, year).length) {
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

    return Calc.ValidateDate(day, month, year);
  }
}
