export class AgeCalculator {
  private birthDate: Date;

  constructor(day: number, month: number, year: number) {
    this.birthDate = new Date(year, month - 1, day);
  }

  public calculateAge(): number {
    const today = new Date();
    let age = today.getFullYear() - this.birthDate.getFullYear();
    const m = today.getMonth() - this.birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < this.birthDate.getDate())) {
      age--;
    }

    return age;
  }
}