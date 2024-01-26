import { dateTemplate } from "./types";
import { Validator } from "./Validator";

export class Calc {
  static calculateAge(
    day: number,
    month: number,
    year: number
  ): dateTemplate | string[] | null {
    if (!Validator.ValidateDate(day, month, year).length) {
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

    return Validator.ValidateDate(day, month, year);
  }
}
