import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Description from "@material-ui/icons/Description";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import AssessmentIcon from "@material-ui/icons/Assessment";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  sidebarText: {
    color: "#3f51b5",
    textDecoration: "none"
  }
});

export default function Sidebar(props) {
  const classes = useStyles();

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={props.toggleDrawer}
    >
      <List>
        {["Home", "Logs", "Users"].map((text, index) => (
          <Link
            key={text}
            className={classes.sidebarText}
            to={text.toLowerCase()}
          >
            <ListItem button>
              <ListItemIcon>
                {text === "Home" ? (
                  <HomeIcon className={classes.sidebarText} />
                ) : index % 2 === 0 ? (
                  <SupervisorAccountIcon className={classes.sidebarText} />
                ) : (
                  <AssessmentIcon className={classes.sidebarText} />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {["Add User", "Add Room", "Add Task"].map((text, index) => (
          <Link
            key={text}
            className={classes.sidebarText}
            onClick={() => props.changeFormType("create")}
            to={
              text === "Add User"
                ? "register"
                : text
                    .split(" ")
                    .join("")
                    .toLowerCase()
            }
          >
            <ListItem button>
              <ListItemIcon>
                {text === "Add User" ? (
                  <PersonAddIcon className={classes.sidebarText} />
                ) : index % 2 === 1 ? (
                  <MeetingRoomIcon className={classes.sidebarText} />
                ) : (
                  <Description className={classes.sidebarText} />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {/* render sidebar only if admin */}
      {props.loggedIn ? (
        props.user.admin || props.user.master ? (
          <Drawer open={props.drawerOpen} onClose={props.toggleDrawer}>
            {sideList("left")}
          </Drawer>
        ) : null
      ) : null}
    </div>
  );
}
