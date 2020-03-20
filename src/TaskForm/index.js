import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import TaskRow from "../TaskRow";

const mapStateToProps = state => {
  return {
    companyName: state.authForms.companyName,
    address: state.authForms.address,
    status: state.modals.status
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
    width: 800,
    height: 200,
    boxShadow: "7px 7px 3px grey",
    border: "1px solid rgba(100, 100, 100, .5)",
    borderRadius: "5px"
  },
  taskFormContainer: {
    display: "flex",
    marginTop: "50px",
    justifyContent: "center"
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
  },
  status: {
    color: "red",
    fontSize: ".8rem",
    marginTop: "15px"
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
    <div className={classes.taskFormContainer}>
      <Card className={classes.root}>
        <form noValidate onSubmit={handleSubmit}>
          <CardContent>
            <TaskRow />
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
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyForm);
