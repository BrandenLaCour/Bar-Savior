import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import TaskRow from "../TaskRow";
import { Redirect, Link } from "react-router-dom";

const mapStateToProps = state => {
  return {
    status: state.modals.status,
    formType: state.modals.formType,
    name: state.taskForm.name,
    shift: state.taskForm.shift,
    imgReq: state.taskForm.imgReq,
    taskId: state.taskForm.taskId,
    redirect: state.modals.redirect
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addName: name => dispatch({ type: "ADD_NAME", payload: name }),
    addShift: shift => {
      dispatch({ type: "ADD_SHIFT", payload: shift });
    },
    addImgReq: bool => {
      dispatch({ type: "ADD_IMG_REQ", payload: bool });
    },
    addRedirect: bool => {
      dispatch({ type: "REDIRECT", payload: bool });
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

    if (props.formType === "edit") {
      props.updateTask(
        {
          name: props.name,
          shift: props.shift,
          imgReq: props.imgReq
        },
        props.taskId
      );
      props.addRedirect(true);
    }
  };

  const handleChange = e => {
    const type = e.target.name;
    const value = e.target.value;

    switch (type) {
      case "name":
        props.addName(value);
        break;
      case "shift":
        props.addShift(value);
        break;
      default:
        props.addImgReq(value);
    }
  };
  if (props.redirect) {
    props.addRedirect(false);
    return <Redirect to="/" />;
  }
  return (
    <div className={classes.taskFormContainer}>
      <Card className={classes.root}>
        <form noValidate onSubmit={handleSubmit}>
          <CardContent>
            <TaskRow
              name={props.name}
              shift={props.shift}
              imgReq={props.imgReq}
              handleChange={handleChange}
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
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyForm);
