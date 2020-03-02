import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    width: 250,
    height: "100%",
    padding: 10,
    margin: 20
  },
  list: {
    listStyle: "none"
  }
});

const UserCard = props => {
  const classes = useStyles();
  console.log(props);
  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <ul>
            <li className={classes.list}>Username: {props.username}</li>
            <li className={classes.list}>Email: {props.email}</li>
            <li className={classes.list}>Position: {props.position}</li>
            <li className={classes.list}>Admin: {props.admin}</li>
            <li className={classes.list}>Master: {props.master}</li>
          </ul>
        </CardContent>
        <CardContent>
          <Button variant="contained" color="secondary">
            Edit
          </Button>{" "}
          <Button onClick={() => props.delete(props.id)} variant="contained">
            Delete
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default UserCard;
