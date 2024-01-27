import { ChangeEvent, useState } from "react";
import "./App.css";
import { Calc } from "./AgeCalculator";
import { isDateTemplate } from "./types";
import { containsSubstringIgnoreCase } from "./stringActions";

function App() {
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");

  const [dayError, setDayError] = useState<string>("");
  const [monthError, setMonthError] = useState<string>("");
  const [yearError, setYearError] = useState<string>("");

  const [daysAge, setDaysAge] = useState<string>("- -");
  const [monthsAge, setMonthsAge] = useState<string>("- -");
  const [yearsAge, setYearsAge] = useState<string>("- -");

  const [isInputOK, setIsInputOk] = useState<boolean>(true);
  const [isPressedButton, setIsPressedButton] = useState<boolean>(false);

  const handleDayChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDay(e.target.value);
  };

  const handleMonthChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMonth(e.target.value);
  };

  const handleYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
  };

  const resetOutputs = () => {
    setDayError("");
    setMonthError("");
    setYearError("");

    setDaysAge("- -");
    setMonthsAge("- -");
    setYearsAge("- -");

    setIsInputOk(true);
    setIsPressedButton(false);
  };

  const isOneDateFieldEmpty = () => {
    if (day === "" || month === "" || year === "") return true;
    return false;
  };

  const addOutput = (): void => {
    const result = Calc.calculateAge(
      parseInt(day),
      parseInt(month),
      parseInt(year)
    );

    if (!isDateTemplate(result) && isOneDateFieldEmpty()) {
      for (const error of result!) {
        const possibleError: string = possibleErrors.get(error) as string;
        if (
          containsSubstringIgnoreCase(possibleError, "day") ||
          containsSubstringIgnoreCase(possibleError, "date")
        )
          setDayError(possibleError);
        if (containsSubstringIgnoreCase(possibleError, "month"))
          setMonthError(possibleError);
        if (containsSubstringIgnoreCase(possibleError, "year"))
          setYearError(possibleError);
      }

      setIsInputOk(false);
      return;
    }

    console.log(result);

    setDaysAge(result.days.toString());
    setMonthsAge(result.months.toString());
    setYearsAge(result.years.toString());
  };

  const activateCalc = (): void => {
    resetOutputs();
    const emptyFieldError = possibleErrors.get("emptyField") as string;

    if (day === "") setDayError(emptyFieldError);

    if (month === "") setMonthError(emptyFieldError);

    if (year === "") setYearError(emptyFieldError);

    if (!(day === "" || month === "" || year === "")) {
      setIsInputOk(true);
    }
    setIsPressedButton(true);
    addOutput();
  };

  return (
    <div className="main-window">
      <div className="age-input-section">
        <div className="date-period-input-field">
          <span
            className="time-period-input-title"
            style={
              !isInputOK && isPressedButton
                ? { color: "hsl(0, 100%, 67%)" }
                : { color: "hsl(0, 0%, 8%)" }
            }
          >
            D A Y
          </span>
          <input
            type="text"
            className="days-input"
            placeholder="DD"
            value={day}
            onChange={handleDayChange}
            style={
              !isInputOK && isPressedButton
                ? { borderColor: "hsl(0, 100%, 67%)" }
                : { borderColor: "hsl(0, 0%, 8%)" }
            }
          />
          <span className="days-error">{dayError}</span>
        </div>
        <div className="date-period-input-field">
          <span
            className="time-period-input-title"
            style={
              !isInputOK && isPressedButton
                ? { color: "hsl(0, 100%, 67%)" }
                : { color: "hsl(0, 0%, 8%)" }
            }
          >
            M O N T H
          </span>
          <input
            type="text"
            className="months-input"
            placeholder="MM"
            value={month}
            onChange={handleMonthChange}
            style={
              !isInputOK && isPressedButton
                ? { borderColor: "hsl(0, 100%, 67%)" }
                : { borderColor: "hsl(0, 0%, 8%)" }
            }
          />
          <span className="months-error">{monthError}</span>
        </div>
        <div className="date-period-input-field">
          <span
            className="time-period-input-title"
            style={
              !isInputOK && isPressedButton
                ? { color: "hsl(0, 100%, 67%)" }
                : { color: "hsl(0, 0%, 8%)" }
            }
          >
            Y E A R
          </span>
          <input
            type="text"
            className="years-input"
            placeholder="YYYY"
            value={year}
            onChange={handleYearChange}
            style={
              !isInputOK && isPressedButton
                ? { borderColor: "hsl(0, 100%, 67%)" }
                : { borderColor: "hsl(0, 0%, 8%)" }
            }
          />
          <span className="years-error">{yearError}</span>
        </div>
      </div>
      <div className="button-section">
        <hr />
        <button className="activate-button" onClick={activateCalc}>
          <img src="./assets/images/icon-arrow.svg" alt="" />
        </button>
      </div>
      <div className="age-output-section">
        <div className="date-period-output-field">
          <span className="years-age">{yearsAge}</span>
          <span className="years-output">&nbsp;years</span>
        </div>
        <div className="date-period-output-field">
          <span className="months-age">{monthsAge}</span>
          <span className="months-output">&nbsp;months</span>
        </div>
        <div className="date-period-output-field">
          <span className="days-age">{daysAge}</span>
          <span className="days-output">&nbsp;days</span>
        </div>
      </div>
    </div>
  );
}

export default App;
