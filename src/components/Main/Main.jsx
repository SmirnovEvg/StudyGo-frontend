import React, { useState, useEffect } from "react";
import styles from "./Main.module.sass";
import axios from "axios";
import AuthService from "../../services/AuthService";
import Header from "../Header/Header";

const Main = (props) => {
  const [messages, setMessages] = useState(0);
  const user = AuthService.getUser();

  useEffect(() => {
    if(user){
      axios
        .get("http://localhost:3333/api/chat/message/unread/all", {
          params: {
            userId: user._id,
          },
        })
        .then((res) => {
          setMessages(res.data.length);
        });
    }
  }, [user]);
  return (
    <div className={styles.main}>
      {user && <Header role={user.role} messageCount={messages} firstName={user.firstName} secondName={user.secondName}/>}
      <div className={styles.mainContent}>{props.children}</div>
    </div>
  );
};

export default Main;
