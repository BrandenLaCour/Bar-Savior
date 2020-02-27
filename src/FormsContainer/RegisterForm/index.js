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
    username: state.authForms.username,
    password: state.authForms.password,
    position: state.authForms.position,
    admin: state.authForms.admin,
    master: state.authForms.master,
    email: state.authForms.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCompanyId: id => dispatch({ type: "ADD_COMPANY_ID", payload: id }),
    addUsername: event =>
      dispatch({ type: "ADD_USERNAME", payload: event.target.value }),
    addPassword: event => {
      dispatch({ type: "ADD_PASSWORD", payload: event.target.value });
    },
    addEmail: event => {
      dispatch({ type: "ADD_EMAIL", payload: event.target.value });
    },
    addPosition: event => {
      dispatch({ type: "ADD_POSITION", payload: event.target.value });
    },
    isAdmin: event => {
      dispatch({ type: "IS_ADMIN", payload: event.target.value });
    },
    isMASTER: event => {
      dispatch({ type: "IS_MASTER", payload: event.target.value });
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
  }
});

const CompanyForm = props => {
  const classes = useStyles();

  const handleSubmit = event => {
    event.preventDefault();
    props.addCompanyId(props.companyId);
    if (props.form === "create") {
      console.log(props);
    }
  };
  console.log(props);
  return (
    <Card className={classes.root}>
      <form noValidate onSubmit={handleSubmit}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textPrimary"
            gutterBottom
          >
            Create Master User
          </Typography>
          <TextField
            onChange={props.addUsername}
            id="standard-basic"
            label="Username"
          />
          <TextField
            id="standard-basic"
            onChange={props.addPassword}
            label="Password"
          />
          <TextField
            id="standard-basic"
            onChange={props.addEmail}
            label="Email"
          />
          <TextField
            id="standard-basic"
            onChange={props.addPosition}
            label="Position"
          />
        </CardContent>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyForm);
