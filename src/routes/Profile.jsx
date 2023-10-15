import React, { useEffect, useState } from "react";
import fbase, { dbService } from "../fbase";
import { useNavigate } from "react-router-dom";

export default function Profile({ refreshUser, userObj }) {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

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

  const onSubmitClick = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      console.log(userObj.updateProfile);
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

  return (
    <>
      <form onSubmit={onSubmitClick}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display Name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}
