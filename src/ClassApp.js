import React from "react";
import "./styles.css";

class ClassApp extends React.Component {
  constructor() {
    super();
    this.state = { count: 0 };
    this.numberOfIntervals = 0;
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({ count: this.state.count + 1 });
    }, 1000);

    this.numberOfIntervals = this.numberOfIntervals + 1;
  }

  render() {
    return (
      <section>
        <h1>Incremental counter using React Class component</h1>
        <h2>Count {this.state.count}</h2>
        <h3>
          Number of intervals: {this.numberOfIntervals} | Interval ID:{" "}
          {this.intervalId}
        </h3>
        <button onClick={() => clearInterval(this.intervalId)}>
          Stop interval
        </button>
      </section>
    );
  }
}

export default ClassApp;
