import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

export function GotchaOne() {
  const [count, setCount] = useState(0);
  const intervalIdRef = useRef();
  const numberOfIntervalsRef = useRef(0);

  /* Uh-oh! Count goes crazy as multiple intervals call setCount() */
  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    numberOfIntervalsRef.current = numberOfIntervalsRef.current + 1;
  });
  /*
  Does useEffect run after every render? 
  Yes! By default, it runs both after the first render and after every update. 
  (We will later talk about how to customize this.) Instead of thinking in 
  terms of “mounting” and “updating”, you might find it easier to think that 
  effects happen “after render”. React guarantees the DOM has been updated by 
  the time it runs the effects.

  https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
  */

  return (
    <section>
      <h1>
        Gotcha 1: useEffect without dependency is run after every render so
        setInterval is called everytime count is rerendered
      </h1>
      <h2>Count {count}</h2>
      <h3>
        Number of intervals: {numberOfIntervalsRef.current} | Interval ID:{" "}
        {intervalIdRef.current}
      </h3>
      <button onClick={() => clearInterval(intervalIdRef.current)}>
        Stop interval
      </button>
    </section>
  );
}

export function GotchaTwo() {
  const [count, setCount] = useState(0);
  const intervalIdRef = useRef();
  const numberOfIntervalsRef = useRef(0);

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      console.log("GotchaTwo: setInterval callback called");
      setCount(count + 1);
    }, 1000);

    numberOfIntervalsRef.current = numberOfIntervalsRef.current + 1;

    return () => clearInterval(intervalIdRef.current);
  }, []);
  /* Uh-oh! The problem is that inside the setInterval callback, the value of
   * count does not change, because we’ve created a closure with the value of
   * count set to 0 as it was when the effect callback ran. Every second, this
   * callback then calls setCount(0 + 1), so the count never goes above 1.
   * https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
   */

  return (
    <section>
      <h1>
        Gotcha 2: Passing in empty array of dependencies to useEffect,{" "}
        <code>count</code> is always initial value
      </h1>
      <h2>Count {count}</h2>
      <h3>
        Number of intervals: {numberOfIntervalsRef.current} | Interval ID:{" "}
        {intervalIdRef.current}
      </h3>
      <button onClick={() => clearInterval(intervalIdRef.current)}>
        Stop interval
      </button>
    </section>
  );
}

export function GotchaThree() {
  const [count, setCount] = useState(0);
  const intervalIdRef = useRef();
  const numberOfIntervalsRef = useRef(0);

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    numberOfIntervalsRef.current = numberOfIntervalsRef.current + 1;

    return () => clearInterval(intervalIdRef.current);
  }, [count]);
  /*
  https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
  */

  return (
    <section>
      <h1>
        Gotcha 3: Passing in <code>count</code> as dependency to useEffect
      </h1>
      <h2>Count {count}</h2>
      <h3>
        Number of intervals: {numberOfIntervalsRef.current} | Interval ID:{" "}
        {intervalIdRef.current}
      </h3>
      <button onClick={() => clearInterval(intervalIdRef.current)}>
        Stop interval
      </button>
    </section>
  );
}

export function Solution() {
  const [count, setCount] = useState(0);
  const intervalIdRef = useRef();
  const numberOfIntervalsRef = useRef(0);

  /*
   * https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
   */
  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    numberOfIntervalsRef.current = numberOfIntervalsRef.current + 1;

    return () => clearInterval(intervalIdRef.current);
  }, []);

  return (
    <section>
      <h1>
        Solution: Read value of <code>count</code> using the functional update
        form of setState
      </h1>
      <h2>Count {count}</h2>
      <h3>
        Number of intervals: {numberOfIntervalsRef.current} | Interval ID:{" "}
        {intervalIdRef.current}
      </h3>
      <button onClick={() => clearInterval(intervalIdRef.current)}>
        Stop interval
      </button>
    </section>
  );
}

export default function HooksApp() {
  return (
    <div className="App">
      <GotchaOne />
      <hr />
      <GotchaTwo />
      <hr />
      <GotchaThree />
      <hr />
      <Solution />
    </div>
  );
}
