import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import TaskRow from "../TaskRow";
import { Redirect, Link } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    status: state.modals.status,
    formType: state.modals.formType,
    name: state.taskForm.name,
    shift: state.taskForm.shift,
    imgReq: state.taskForm.imgReq,
    taskId: state.taskForm.taskId,
    redirect: state.modals.redirect,
    rooms: state.companyData.rooms,
    roomId: state.taskForm.roomId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addName: (name) => dispatch({ type: "ADD_NAME", payload: name }),
    addShift: (shift) => {
      dispatch({ type: "ADD_SHIFT", payload: shift });
    },
    addImgReq: (bool) => {
      dispatch({ type: "ADD_IMG_REQ", payload: bool });
    },
    addRedirect: (bool) => {
      dispatch({ type: "REDIRECT", payload: bool });
    },
    addRoomId: (id) => {
      dispatch({ type: "ADD_ROOM_ID", payload: id });
    },
  };
};

const useStyles = makeStyles({
  root: {
    width: 800,
    height: 200,
    boxShadow: "7px 7px 3px grey",
    border: "1px solid rgba(100, 100, 100, .5)",
    borderRadius: "5px",
  },
  taskFormContainer: {
    display: "flex",
    marginTop: "50px",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    color: "#3f51b5",
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    cursor: "pointer",
  },
  status: {
    color: "red",
    fontSize: ".8rem",
    marginTop: "15px",
  },
});

const CompanyForm = (props) => {
  const classes = useStyles();
  const task = {
    name: props.name,
    shift: props.shift,
    imgReq: props.imgReq,
    room: props.roomId,
  };

  const rooms = props.type === "create" ? [...props.rooms] : null;

  //iterate through to put into drop down
  const handleSubmit = (event) => {
    event.preventDefault();

    if (props.formType === "edit") {
      // props.updateTask(task, props.taskId);

      props.addRedirect(true);
    } else {
      // props.createTask(task);
      props.addRedirect(true);
    }
    //clean up, reset each field
    props.addImgReq(false);
    props.addName("");
    props.addShift("both");
    props.addRoomId("");
  };

  const handleChange = (e) => {
    const type = e.target.name;
    const value = e.target.value;
    console.log(e.target);
    switch (type) {
      case "name":
        props.addName(value);
        break;
      case "shift":
        props.addShift(value);
        break;
      case "room":
        props.addRoomId(value);
        break;
      default:
        props.addImgReq(value);
    }
  };
  if (props.redirect) {
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
              rooms={rooms}
              roomId={props.roomId}
              type={props.type}
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
