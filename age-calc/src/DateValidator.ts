export class DateValidator {

  private day: number;
  private month: number;
  private year: number;
  private stringDay: string;
  private stringMonth: string;
  private stringYear: string;
  private currentDate: Date;
  private inputDate: Date;
  private possibleErrors: Map<number, string>;

  constructor(day: number, month: number, year: number) {
    this.day = day;
    this.month = month;
    this.year = year;
    
    this.stringDay = day.toString();
    this.stringMonth = month.toString();
    this.stringYear = year.toString();

    this.currentDate = new Date();
    this.inputDate = new Date(year, month - 1, day);
    this.possibleErrors =  new Map([
      [0, "This field is required"],
      [1, "Must be a valid date"],
      [2, "Must be a valid day"],
      [3, "Must be a vaild month"],
      [4, "Must be a valid year"],
      [5, "Day must be in the past"],
      [6, "Month must be in the past"],
      [7, "Year must be in the past"],
    ]);
  }

  isLeapYear(): boolean {
    return this.year % 4 === 0 && (this.year % 100 !== 0 || this.year % 400 === 0);
  }

  isDateInTheFuture(): boolean {
    return this.inputDate.getTime() > this.currentDate.getTime();
  }

  isFutureByDays(): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    this.inputDate.setHours(0, 0, 0, 0); 
    return this.inputDate.getTime() > today.getTime();
  }

  isFutureByMonths(): boolean {
    const today = new Date();

    if (this.inputDate.getFullYear() > today.getFullYear()) {
      return true;
    }
    if (this.inputDate.getFullYear() === today.getFullYear()) {
      return this.inputDate.getMonth() > today.getMonth();
    }
    return false;
  }

  isFutureByYears(): boolean {
    const currentYear = new Date().getFullYear();
    return this.inputDate.getFullYear() > currentYear;
  }

  validateDay(): string | null {
    const daysInMonth = [
      31,
      this.isLeapYear() ? 29 : 28,
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

    if (this.stringDay === "")
      return this.possibleErrors.get(0)!;

    if (this.day < 1)
      return this.possibleErrors.get(2)!;

    if (this.day > daysInMonth[this.month - 1]) 
      return this.possibleErrors.get(1)!

    if(this.isDateInTheFuture() && this.isFutureByDays())
      return this.possibleErrors.get(5)!;

    return null;
  }

  validateMonth(): string | null {
    if (this.stringMonth === "")
      return this.possibleErrors.get(0)!;

    if (this.month < 1 || this.month > 12) {
      return this.possibleErrors.get(3)!;
    }

    if(this.isDateInTheFuture() && this.isFutureByMonths())
      return this.possibleErrors.get(6)!;

    return null;
  }

  validateYear(): string | null {
    if (this.stringDay === "")
      return this.possibleErrors.get(0)!;

    const yearError =
      this.year < 1
        ? 4
        : this.year > this.currentDate.getFullYear()
        ? 7
        : null;

    if (yearError)
      return this.possibleErrors.get(yearError)!; 

    if(this.isDateInTheFuture() && this.isFutureByYears())
      return this.possibleErrors.get(7)!;

    return null;
  }
  }
