import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    companyName: state.authForms.companyName,
    address: state.authForms.address
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addName: event =>
      dispatch({ type: "ADD_COMPANY_NAME", payload: event.target.value }),
    addAddress: event => {
      dispatch({ type: "ADD_ADDRESS", payload: event.target.value });
    }
  };
};

const useStyles = makeStyles({
  root: {
    width: 300,
    height: 400,
    boxShadow: "7px 7px 3px grey",
    border: "1px solid rgba(100, 100, 100, .5)",
    borderRadius: "5px"
  },
  title: {
    fontSize: 30,
    color: "#3f51b5"
  },
  pos: {
    marginBottom: 12
  },
  button: {
    cursor: "pointer"
  }
});

const CompanyForm = props => {
  const classes = useStyles();

  const handleSubmit = event => {
    event.preventDefault();

    if (props.type === "create") {
      props.createCompany({ name: props.companyName, address: props.address });
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

        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyForm);
