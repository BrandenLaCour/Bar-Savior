import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
  root: {
    width: 700,
    height: 175,
    padding: 10,
    margin: 20
  },
  container: {
    display: "flex",
    justifyContent: "center"
  },
  list: {
    listStyle: "none"
  },
  imageContainer: {
    width: 300,
    height: 175,
    margin: 20
  },
  image: {
    width: 200
  }
});

const CheckListRow = props => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Card className={classes.root}>
        <CardContent>
          <ul>
            <li className={classes.list}>Task Name: {props.name} </li>
            <li className={classes.list}>Room: {props.room}</li>
            <li className={classes.list}>
              Task Notes: <small>{props.notes}</small>
            </li>
            <li className={classes.list}> Date: {props.date}</li>
            <li className={classes.list}>User: {props.user}</li>
            <li className={classes.list}>Status: {props.status}</li>

            {props.resolvedUser !== null ? (
              <li>Resolved By: {props.resolvedUser}</li>
            ) : null}
          </ul>
        </CardContent>
      </Card>

      {props.imageUrl !== null ? (
        <Card className={classes.imageContainer}>
          <CardContent className={classes.listItem}>
            Issue Image:{" "}
            <img
              className={classes.image}
              onClick={() => props.enlargedImage(props.imageUrl)}
              src={props.imageUrl}
            />
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};

export default CheckListRow;
