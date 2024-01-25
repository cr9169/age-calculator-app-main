export type dateTemplate = { years: number; months: number; days: number };

export const isDateTemplate = (obj: any): obj is dateTemplate => {
  return (
    obj !== null &&
    typeof obj === "object" &&
    typeof obj.years === "number" &&
    typeof obj.months === "number" &&
    typeof obj.days === "number"
  );
};
