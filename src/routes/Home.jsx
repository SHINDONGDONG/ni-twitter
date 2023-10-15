import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import Nweet from "../components/Nweet";

export default function Home({ userObj }) {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");
  // const getNweets = async () => {
  //   const dbnweets = await dbService.collection("nweets").get();
  //   dbnweets.forEach((document) => {
  //     const nweetObject = {
  //       ...document.data(),
  //       id: document.id,
  //     };

  //     setNweets((prev) => [nweetObject, ...prev]);
  //   });
  // };
  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const newwetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(newwetArray);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("nweets").add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet("");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  };
  const onChangeFile = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;

      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment(null);
  console.log(nweets);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          onChange={onChange}
          value={nweet}
        />
        <input type="file" accept="image/*" onChange={onChangeFile} />
        <input type="submit" value="ni-Twitter" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear Photo</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((d) => (
          <Nweet
            key={d.id}
            nweetObj={d}
            isOwner={d.creatorId === userObj.uid}
          ></Nweet>
        ))}
      </div>
    </div>
  );
}
