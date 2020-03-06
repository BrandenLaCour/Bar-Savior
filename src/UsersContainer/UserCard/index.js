import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    width: 300,
    height: "100%",
    padding: 10,
    margin: 20,
    boxShadow: "4px 4px 1px grey",
    border: "1px solid rgba(100, 100, 100, .5)",
    borderRadius: "5px"
  },
  list: {
    listStyle: "none",
    margin: 10
  },

  button: {
    marginTop: 10
  }
});

const UserCard = props => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <ul>
            <li className={classes.list}>
              <strong>{props.username}</strong>
            </li>
            <li className={classes.list}>{props.email}</li>
            <li className={classes.list}>{props.position}</li>
            <li className={classes.list}>
              <strong>Admin:</strong> {props.admin} <strong>Master:</strong>{" "}
              {props.master}
            </li>
          </ul>
        </CardContent>
        <CardContent>
          <Button
            onClick={() => props.toggleAdmin(props.id, props.isAdmin)}
            variant="contained"
            color="primary"
          >
            Toggle Admin
          </Button>{" "}
          <Button
            onClick={() => props.deactivateUser(props.id)}
            className={classes.button}
            variant="contained"
            color="secondary"
          >
            Deactivate
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default UserCard;
