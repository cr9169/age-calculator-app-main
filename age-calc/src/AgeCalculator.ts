export class AgeCalculator {
  private birthDate: Date;

  constructor(day: number, month: number, year: number) {
    if (year < 100) {
      this.birthDate = new Date(year, month - 1, day);
      this.birthDate.setFullYear(year);
    } else {
      this.birthDate = new Date(year, month - 1, day);
    }
  }

  public calculateAge(): { days: number; months: number; years: number } {
    const today = new Date();
    let years = today.getFullYear() - this.birthDate.getFullYear();
    let months = today.getMonth() - this.birthDate.getMonth();
    let days = today.getDate() - this.birthDate.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    if (days < 0) {
      const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += previousMonth.getDate();
      months--;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    console.log(
      { years, months, days },
      today.getFullYear(),
      this.birthDate.getFullYear()
    );

    return { years, months, days };
  }
}
