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
    margin: 20,
    boxShadow: "4px 4px 1px grey",
    border: "1px solid rgba(100, 100, 100, .5)",
    borderRadius: "5px"
  },
  link: {
    color: "#3f51b5"
  }
});

const RoomCard = props => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Link
            onClick={() => props.addRoom(props.name, props.id)}
            className={classes.link}
            to="/roomShow"
          >
            {" "}
            {props.name}
          </Link>
        </CardContent>
        {props.admin ? (
          <CardContent>
            <Button
              onClick={() => props.deactivateRoom(props.id)}
              variant="contained"
            >
              Deactivate
            </Button>
          </CardContent>
        ) : null}
      </Card>
    </>
  );
};

export default RoomCard;
