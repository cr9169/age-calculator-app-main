import "./App.css";

function App() {
  return (
    <div className="main-window">
      <div className="age-input-section">
        <div className="date-period-input-field">
          <span className="time-period-input-title">D A Y</span>
          <input type="text" className="days-input" placeholder="DD" />
          <span className="days-error" hidden>
            This field is required
          </span>
        </div>
        <div className="date-period-input-field">
          <span className="time-period-input-title">M O N T H</span>
          <input type="text" className="months-input" placeholder="MM" />
          <span className="months-error" hidden>
            This field is required
          </span>
        </div>
        <div className="date-period-input-field">
          <span className="time-period-input-title">Y E A R</span>
          <input type="text" className="years-input" placeholder="YYYY" />
          <span className="years-error" hidden>
            This field is required
          </span>
        </div>
      </div>
      <div className="button-section">
        <hr />
        <button className="activate-button">
          <img src="./assets/images/icon-arrow.svg" alt="" />
        </button>
      </div>
      <div className="age-output-section">
        <div className="date-period-output-field">
          <span className="years-age">-&nbsp;-&nbsp;</span>
          <span className="years-output">years</span>
        </div>
        <div className="date-period-output-field">
          <span className="months-age">-&nbsp;-&nbsp;</span>
          <span className="months-output">months</span>
        </div>
        <div className="date-period-output-field">
          <span className="days-age">-&nbsp;-&nbsp;</span>
          <span className="days-output">days</span>
        </div>
      </div>
    </div>
  );
}

export default App;
