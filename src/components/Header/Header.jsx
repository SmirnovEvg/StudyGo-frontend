import React from "react";
import styles from "./Header.module.sass";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import { red } from "@material-ui/core/colors";
import Badge from "@material-ui/core/Badge";
import { ReactComponent as Logo } from "../../static/images/Logo.svg";
// import { ReactComponent as Chat } from "../../static/images/chat.png";
// import { ReactComponent as Event } from "../../static/images/event.png";
// import { ReactComponent as News } from "../../static/images/news.png";
// import { ReactComponent as Labs } from "../../static/images/labs.png";
import useWindowSize from "../../services/useWindowSize.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  red: {
    width: '35px',
    height: '35px',
    fontSize: '1rem',
    color: theme.palette.getContrastText(red[600]),
    backgroundColor: red[600],
  },
}));

export default function Header({ messageCount, firstName, secondName, role }) {
  const classes = useStyles();
  const size = useWindowSize();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit" className={styles.appBar}>
        <Toolbar className={styles.toolBar}>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={`${classes.title} ${styles.navTitle}`}
          >
            <Logo />
          </Typography>
          <Button
            component={Link}
            to="/events"
            color="inherit"
            className={styles.navButton}
          >
            {size.width > 800 ? "Новости" : '<News />'}
          </Button>
          <Button
            component={Link}
            to="/timetable"
            color="inherit"
            className={styles.navButton}
          >
            {size.width > 800 ? "Расписание" : '<Event />'}
          </Button>
          <Button
            component={Link}
            to="/chat"
            color="inherit"
            className={styles.navButton}
          >
            <Badge
              badgeContent={messageCount}
              max={99}
              variant="dot"
              color="error"
            >
              {size.width > 800 ? "Диалоги" : '<Chat />'}
            </Badge>
          </Button>
          {role ? (
            <Button
              component={Link}
              to="/laboratory"
              color="inherit"
              className={styles.navButton}
            >
            {size.width > 800 ? "Лабораторные работы" : '<Labs />'}
            </Button>
          ) : (
            <></>
          )}
          <Avatar
            className={`${classes.red} ${styles.navAvatar}`}
            component={Link}
            to="/profile"
          >
            {firstName[0]}
            {secondName[0]}
          </Avatar>
        </Toolbar>
      </AppBar>
    </div>
  );
}
