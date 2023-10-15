import React, { useEffect } from "react";
import fbase, { dbService } from "../fbase";
import { useNavigate } from "react-router-dom";

export default function Profile({ userObj }) {
  const navigate = useNavigate();

  const onLogOutClick = () => {
    fbase
      .auth()
      .signOut()
      .then((r) => navigate("/"));
  };
  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();

    console.log(nweets.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyNweets();
  }, []);
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}
