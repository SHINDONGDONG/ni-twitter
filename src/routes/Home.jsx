import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";

export default function Home({ userObj }) {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

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
        <input type="submit" value="ni-Twitter" />
      </form>
      <div>
        {nweets.map((d) => (
          <div key={d.id}>
            <h4>{d.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
