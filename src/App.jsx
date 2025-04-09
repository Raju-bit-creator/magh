import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Aboutus from "./components/About-us";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";
import ProductState from "./context/ProductState";
import CartItems from "./components/CartItems";

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
      <ProductState>
        <Router>
          <ToastContainer />
          <Navbar
            title={title}
            toggleButton={toggleButton}
            text={text}
            submit={submit}
            mode={mode}
          />{" "}
          <Alert alert={alert} />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/about" element={<Aboutus />}></Route>
            <Route path="/user-list" element={<UserList />}></Route>
            <Route
              path="/:id/:name/:occupation"
              element={<UserDetail />}
            ></Route>
            <Route path="/cartitems" element={<CartItems />}></Route>
          </Routes>
          <Footer />
        </Router>
      </ProductState>
    </>
  );
}

export default App;
