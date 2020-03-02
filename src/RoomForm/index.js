import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Select from "@material-ui/core/Select";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import { connect } from "react-redux";
import FormHelperText from "@material-ui/core/FormHelperText";

const mapStateToProps = state => {
  return {
    formType: state.authForms.formType,
    roomName: state.taskForm.roomName,
    taskName: state.taskForm.taskName,
    shift: state.taskForm.shift,
    active: state.taskForm.active,
    imgUrl: state.taskForm.imgUrl,
    imgReq: state.taskForm.imgReq
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addRoomName: event =>
      dispatch({ type: "ADD_ROOM_NAME", payload: event.target.value }),
    addTaskName: event =>
      dispatch({ type: "ADD_TASK_NAME", payload: event.target.value }),
    addShift: event =>
      dispatch({ type: "ADD_SHIFT", payload: event.target.value }),
    addImgUrl: event =>
      dispatch({ type: "ADD_IMAGE", payload: event.target.value }),
    setImgReq: event =>
      dispatch({ type: "SET_IMG_REQ", payload: event.target.value })
  };
};

const useStyles = makeStyles({
  root: {
    width: 400,
    height: "100%",
    padding: 10
  },
  title: {
    fontSize: 20
  },
  pos: {
    marginBottom: 12
  },
  button: {
    width: 100,
    margin: 20
  },
  helper: {
    textAlign: "center"
  },
  status: {
    marginTop: 10,
    color: "red"
  }
});

const CompanyForm = props => {
  const classes = useStyles();

  const handleSubmit = event => {
    event.preventDefault();
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
            {props.formType === "create" ? "Create" : "Edit"} Room
          </Typography>
          <TextField
            id="standard-basic"
            onChange={props.addRoomName}
            value={props.roomName}
            label="Room Name"
          />
          <TextField
            onChange={props.addTaskName}
            value={props.taskName}
            id="standard-basic"
            label="Task Description"
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Shift"
            value={props.shift}
            onChange={props.addShift}
            className={classes.button}
          >
            <MenuItem value="day">Morning</MenuItem>
            <MenuItem value="night">Night</MenuItem>
          </Select>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Shift"
            value={props.imgReq}
            onChange={props.setImgReq}
            className={classes.button}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
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
