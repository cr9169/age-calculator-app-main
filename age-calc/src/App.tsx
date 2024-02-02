import { ChangeEvent, useState } from 'react';
import './App.css';
import { AgeCalculator } from './AgeCalculator';
import { DateValidator } from './DateValidator';

function App() {
  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');

  const [dayError, setDayError] = useState<string>('');
  const [monthError, setMonthError] = useState<string>('');
  const [yearError, setYearError] = useState<string>('');

  const [daysAge, setDaysAge] = useState<string>('- -');
  const [monthsAge, setMonthsAge] = useState<string>('- -');
  const [yearsAge, setYearsAge] = useState<string>('- -');

  const dateValidator = new DateValidator(
    parseInt(day),
    parseInt(month),
    parseInt(year)
  );
  const ageCalculator = new AgeCalculator(
    parseInt(day),
    parseInt(month),
    parseInt(year)
  );

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
    setDayError('');
    setMonthError('');
    setYearError('');

    setDaysAge('- -');
    setMonthsAge('- -');
    setYearsAge('- -');

    setIsInputOk(true);
    setIsPressedButton(false);
  };

  const handleButtonPress = (): void => {
    resetOutputs();
    setIsPressedButton(true);

    dateValidator.day = parseInt(day);
    dateValidator.month = parseInt(month);
    dateValidator.year = parseInt(year);

    dateValidator.day = parseInt(day);
    dateValidator.month = parseInt(month);
    dateValidator.year = parseInt(year);

    const validateDay = dateValidator.validateDay();
    const validateMonth = dateValidator.validateMonth();
    const validateYear = dateValidator.validateYear();

    if (validateDay) {
      setIsInputOk(false);
      setDayError(validateDay);
    }
    if (validateMonth) {
      setIsInputOk(false);
      setMonthError(validateMonth);
    }
    if (validateYear) {
      setIsInputOk(false);
      setYearError(validateYear);
    }

    if (!validateDay && !validateMonth && !validateYear) {
      const result = ageCalculator.calculateAge();
      setDaysAge(result.days.toString());
      setMonthsAge(result.months.toString());
      setYearsAge(result.years.toString());
    }
  };

  return (
    <div className="main-window">
      <div className="age-input-section">
        <div className="date-period-input-field">
          <span
            className="time-period-input-title"
            style={
              !isInputOK && isPressedButton
                ? { color: 'hsl(0, 100%, 67%)' }
                : { color: 'hsl(0, 1%, 44%)' }
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
                ? { borderColor: 'hsl(0, 100%, 67%)' }
                : { borderColor: 'hsl(0, 0%, 8%)' }
            }
          />
          <span className="days-error">{dayError}</span>
        </div>
        <div className="date-period-input-field">
          <span
            className="time-period-input-title"
            style={
              !isInputOK && isPressedButton
                ? { color: 'hsl(0, 100%, 67%)' }
                : { color: 'hsl(0, 1%, 44%)' }
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
                ? { borderColor: 'hsl(0, 100%, 67%)' }
                : { borderColor: 'hsl(0, 0%, 8%)' }
            }
          />
          <span className="months-error">{monthError}</span>
        </div>
        <div className="date-period-input-field">
          <span
            className="time-period-input-title"
            style={
              !isInputOK && isPressedButton
                ? { color: 'hsl(0, 100%, 67%)' }
                : { color: 'hsl(0, 1%, 44%)' }
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
                ? { borderColor: 'hsl(0, 100%, 67%)' }
                : { borderColor: 'hsl(0, 0%, 8%)' }
            }
          />
          <span className="years-error">{yearError}</span>
        </div>
      </div>
      <div className="button-section">
        <hr />
        <button className="activate-button" onClick={handleButtonPress}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="44"
            viewBox="0 0 46 44"
          >
            <g fill="none" stroke="#FFF" stroke-width="2">
              <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
            </g>
          </svg>
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
