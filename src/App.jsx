import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import { ToastContainer, toast } from "react-toastify";
import ClassCasedComponent from "./components/ClassCasedComponent";
import FunctionBased from "./components/FunctionBased";

function App() {
  //state react hook
  const [count, setCount] = useState(true); // initialization of state
  const [count1, setCount1] = useState(15);
  const [alert, setAlert] = useState(null);
  const [text, setText] = useState("Dark mode");
  const [mode, setMode] = useState("light");

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  const notify = () => toast("Wow so easy!");
  const toggleButton = () => {
    if (mode == "light") {
      setText("Light mode");
      setMode("dark");
      showAlert("dark Mode has been enabled", "danger");
      toast.success("dark Mode has been enabled");
    } else {
      setText("Dark mode");
      setMode("light");
      showAlert("light Mode has been enabled", "success");
      toast.success("light Mode has been enabled");
    }
  };

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
  const title = "Hamro Bazzar";
  const submit = "submit";

  return (
    <>
      <ToastContainer />
      <button onClick={notify}>Notify!</button>
      <Navbar
        title={title}
        toggleButton={toggleButton}
        text={text}
        submit={submit}
        mode={mode}
      />{" "}
      {/* passing props */}
      <Alert alert={alert} />
      <ClassCasedComponent />
      <FunctionBased />
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
