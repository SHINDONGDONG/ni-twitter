import React from "react";
import { Link } from "react-router-dom";

export default function Navigation({ userObj }) {
  console.log(userObj);
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/profile ">{userObj.displayName}의 Profile</Link>
        </li>
      </ul>
    </nav>
  );
}
