import React from "react";
import { useParams } from "react-router-dom";

const UserDetail = () => {
  const params = useParams();

  const { id, name, occupation } = params; //destructuring
  console.log("thsi is my params", params);

  return (
    <div className="container">
      <h4>This is user detail</h4>
      <p>user id: {id}</p>
      <p>user name: {name}</p>
      <p>occupation: {occupation}</p>
    </div>
  );
};

export default UserDetail;
