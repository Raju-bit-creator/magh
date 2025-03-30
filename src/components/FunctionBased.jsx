import React, { useEffect } from "react";

const FunctionBased = () => {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };
  useEffect(() => {
    console.log("useEffect is called1111");
  }, []);
  console.log("this is ram");

  return (
    <div>
      <button onClick={handleClick}>Click Me !!</button>
      <p>Count: {count}</p>
    </div>
  );
};

export default FunctionBased;
