import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
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

const RoomCard = props => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <ul>
            <li className={classes.list}>
              <Link
                onClick={() => props.addRoom(props.name, props.id)}
                to="/roomShow"
              >
                {" "}
                {props.name}
              </Link>
            </li>
          </ul>
        </CardContent>
        <CardContent>
          <Button onClick={() => props.delete(props.id)} variant="contained">
            Delete
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default RoomCard;
