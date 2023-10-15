import React from "react";
import fbase from "../fbase";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const onLogOutClick = () => {
    fbase
      .auth()
      .signOut()
      .then((r) => navigate("/"));
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}
