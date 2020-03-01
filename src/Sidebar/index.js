import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import AssessmentIcon from "@material-ui/icons/Assessment";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import AssignmentIcon from "@material-ui/icons/Assignment";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  sidebarText: {
    color: "black",
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
        {["Users", "Logs"].map((text, index) => (
          <Link className={classes.sidebarText} to={text.toLowerCase()}>
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <SupervisorAccountIcon />
                ) : (
                  <AssessmentIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {["Add Room", "Add Task", "Add User"].map((text, index) => (
          <Link
            className={classes.sidebarText}
            to={text
              .split(" ")
              .join("")
              .toLowerCase()}
          >
            <ListItem button key={text}>
              <ListItemIcon>
                {index < 2 ? <AssignmentIcon /> : <AssignmentIndIcon />}
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
