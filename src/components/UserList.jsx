import React from "react";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const navigate = useNavigate();
  const users = [
    { _id: 1, name: "John", age: 25, occupation: "Developer" },
    { _id: 2, name: "Anna", age: 30, occupation: "desginer" },
    { _id: 3, name: "Peter", age: 35, occupation: "singer" },
  ];
  const handleUser = (id, name, occupation) => {
    navigate(`/${id}/${name}/${occupation}`);
  };
  return (
    <div>
      <h4>This is user list:</h4>
      <ul>
        {users.map((user) => {
          return (
            <li
              style={{ cursor: "pointer" }}
              key={user._id}
              onClick={() => handleUser(user._id, user.name, user.occupation)}
            >
              {user.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserList;
