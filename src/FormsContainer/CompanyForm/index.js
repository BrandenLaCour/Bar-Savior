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
    name: state.forms.name,
    address: state.forms.address
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addName: event =>
      dispatch({ type: "ADD_NAME", payload: event.target.value }),
    addAddress: event => {
      dispatch({ type: "ADD_ADDRESS", payload: event.target.value });
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

    switch (props.form) {
      case "company":
        props.createCompany({ name: props.name, address: props.address });
      default:
        console.log("switch defaulted");
    }
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
            Create Company
          </Typography>
          <TextField
            onChange={props.addName}
            id="standard-basic"
            label="Company Name"
          />
          <TextField
            id="standard-basic"
            onChange={props.addAddress}
            label="Company Address"
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
