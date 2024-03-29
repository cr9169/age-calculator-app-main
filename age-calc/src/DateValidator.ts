export class DateValidator {
  private _day: number;
  private _month: number;
  private _year: number;
  private stringDay: string;
  private stringMonth: string;
  private stringYear: string;
  private currentDate: Date;
  private inputDate: Date;
  private possibleErrors: Map<number, string>;

  constructor(day: number, month: number, year: number) {
    this._day = day;
    this._month = month;
    this._year = year;

    this.stringDay = day || day === 0 ? day.toString() : "";
    this.stringMonth = month || month === 0 ? month.toString() : "";
    this.stringYear = year || year === 0 ? year.toString() : "";

    this.currentDate = new Date();
    this.inputDate = new Date(year, month - 1, day);
    this.possibleErrors = new Map([
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
    return (
      this._year % 4 === 0 && (this._year % 100 !== 0 || this._year % 400 === 0)
    );
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

    if (this.stringDay === "") return this.possibleErrors.get(0)!;

    if (this._day < 1) return this.possibleErrors.get(2)!;

    if (this._day > daysInMonth[this._month - 1])
      return this.possibleErrors.get(1)!;

    if (this.isDateInTheFuture() && this.isFutureByDays())
      return this.possibleErrors.get(5)!;

    return null;
  }

  validateMonth(): string | null {
    if (this.stringMonth === "") return this.possibleErrors.get(0)!;

    if (this._month < 1 || this._month > 12) {
      return this.possibleErrors.get(3)!;
    }

    if (this.isDateInTheFuture() && this.isFutureByMonths())
      return this.possibleErrors.get(6)!;

    return null;
  }

  validateYear(): string | null {
    if (this.stringYear === "") return this.possibleErrors.get(0)!;

    const yearError =
      this._year < 1
        ? 4
        : this._year > this.currentDate.getFullYear()
        ? 7
        : null;

    if (yearError) return this.possibleErrors.get(yearError)!;

    if (this.isDateInTheFuture() && this.isFutureByYears())
      return this.possibleErrors.get(7)!;

    return null;
  }

  get day(): number {
    return this._day;
  }

  set day(value: number) {
    this._day = value;
  }

  get month(): number {
    return this._month;
  }

  set month(value: number) {
    this._month = value;
  }

  get year(): number {
    return this._year;
  }

  set year(value: number) {
    this._year = value;
  }
}
