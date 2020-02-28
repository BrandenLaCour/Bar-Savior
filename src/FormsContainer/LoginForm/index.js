import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    loggedIn: state.modals.loggedIn,
    username: state.authForms.username,
    password: state.authForms.password
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addUsername: event =>
      dispatch({ type: "ADD_USERNAME", payload: event.target.value }),
    addPassword: event => {
      dispatch({ type: "ADD_PASSWORD", payload: event.target.value });
    }
  };
};

const useStyles = makeStyles({
  root: {
    width: 400,
    height: 400
  },
  title: {
    fontSize: 20
  },
  pos: {
    marginBottom: 12
  },
  status: {
    marginTop: 10,
    color: "red"
  }
});

const LoginForm = props => {
  const classes = useStyles();

  const handleSubmit = event => {
    event.preventDefault();
    const user = {
      email: props.username,
      password: props.password
    };

    props.login(user);
  };

  return (
    <Card className={classes.root}>
      <form noValidate onSubmit={handleSubmit}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textPrimary"
            gutterBottom
          >
            Login
          </Typography>
          <TextField
            onChange={props.addUsername}
            id="standard-basic"
            label="email"
          />
          <TextField
            id="standard-basic"
            onChange={props.addPassword}
            label="password"
          />
        </CardContent>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        {props.status !== "" ? (
          <div className={classes.status}>{props.status}</div>
        ) : null}
      </form>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
