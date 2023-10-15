import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import Nweet from "../components/Nweet";

import NweetFactory from "../components/NweetFactory";

export default function Home({ userObj }) {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const newwetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(newwetArray);
    });
  }, []);

  return (
    <div>
      <NweetFactory userObj={userObj}></NweetFactory>
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
