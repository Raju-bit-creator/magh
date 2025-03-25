import { useState } from "react";

import "./App.css";

function App() {
  //state react hook
  const [count, setCount] = useState(0); // initialization of state
  const [count1, setCount1] = useState(15);

  const handleIncrement = () => {
    setCount(count + 1);
    // console.log("you click handle increment button");
  };
  // assignment change name using state
  const handleDecrement = () => {
    setCount1(count1 - 1);
    if (count1 < 1) {
      setCount1(0);
    }
  };

  return (
    <>
      <div>
        <button onClick={handleIncrement}>Increment</button>
        <p>total count: {count}</p>
      </div>
      <h1>thsi is my first projects</h1>
      <div className="card">
        <button onClick={handleDecrement}>Decrement</button>
        <p>total count: {count1}</p>
      </div>
    </>
  );
}

export default App;
