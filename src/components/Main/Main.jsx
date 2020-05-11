import React, { useState, useEffect } from "react";
import styles from "./Main.module.sass";
import axios from "axios";
import AuthService from "../../services/AuthService";
import Header from "../Header/Header";

const Main = (props) => {
  const [messages, setMessages] = useState(0);
  const user = AuthService.getUser();

  useEffect(() => {
    axios
      .get("http://localhost:3333/api/chat/message/unread/all", {
        params: {
          userId: user._id,
        },
      })
      .then((res) => {
        setMessages(res.data.length);
      });
  }, [props, user._id]);
  return (
    <div className={styles.main}>
      {/* <header><ul>
                <li><a href="/">Главная</a></li>
                <li><a href="/chat">Диалоги</a>{messages}</li>
                {user && user.role ? <li><a href="/laboratory">Лабораторные работы</a></li> : <></>}
                <li><a href="/events">Новости</a></li>
                <li><a href="/timetable">Расписание</a></li>
                <li><a href="/profile">Профиль</a></li>
            </ul></header> */}
      <Header role={user.role} messageCount={messages} firstName={user.firstName} secondName={user.secondName}/>
      <div className={styles.mainContent}>{props.children}</div>
    </div>
  );
};

export default Main;
