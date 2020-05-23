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
import Chat from "../../static/images/chat.png";
import Event from "../../static/images/event.png";
import News from "../../static/images/news.png";
import Labs from "../../static/images/labs.svg";
import useWindowSize from "../../services/useWindowSize.js";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

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
    width: "35px",
    height: "35px",
    fontSize: "1rem",
    color: theme.palette.getContrastText(red[600]),
    backgroundColor: red[600],
    fontWeight: 500
  },
}));

const mobileOptions = [
  { label: "Новости", link: "/event" },
  { label: "Расписание", link: "/timetable" },
  { label: "Диалоги", link: "/chat" },
  { label: "Лабораторные работы", link: "/laboratory" },
  { label: "Профиль", link: "/profile" },
];

export default function Header({ messageCount, firstName, secondName, role }) {
  const classes = useStyles();
  const size = useWindowSize();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

          {size.width > 500 ? (
            <>
              <Button
                component={Link}
                to="/events"
                color="inherit"
                className={styles.navButton}
              >
                {size.width > 800 ? "Новости" : <img src={News} alt="News" />}
              </Button>

              <Button
                component={Link}
                to="/timetable"
                color="inherit"
                className={styles.navButton}
              >
                {size.width > 800 ? (
                  "Расписание"
                ) : (
                  <img src={Event} alt="Event" />
                )}
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
                  {size.width > 800 ? "Диалоги" : <img src={Chat} alt="Chat" />}
                </Badge>
              </Button>
              <>
                {role ? (
                  <Button
                    component={Link}
                    to="/laboratory"
                    color="inherit"
                    className={styles.navButton}
                  >
                    {size.width > 800 ? (
                      "Лабораторные работы"
                    ) : (
                      <img src={Labs} alt="Labs" />
                    )}
                  </Button>
                ) : (
                  <></>
                )}
              </>
              <Avatar
                className={`${classes.red} ${styles.navAvatar}`}
                component={Link}
                to="/profile"
              >
                {firstName[0]}
                {secondName[0]}
              </Avatar>
            </>
          ) : (
            <>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
                size="small"
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
              >
                {mobileOptions.map((option) => (
                  <>
                    {!role && option.link === "/laboratory" ? (
                      <></>
                    ) : (
                      <MenuItem
                        component={Link}
                        to={option.link}
                        key={option.label}
                        onClick={handleClose}
                      >
                        {option.label}
                      </MenuItem>
                    )}
                  </>
                ))}
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
