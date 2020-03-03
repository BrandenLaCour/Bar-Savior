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
import TaskForm from "../TaskForm";

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

class CompanyForm extends React.Component {
  constructor() {
    super();
    this.state = {
      task1: {
        taskName: "",
        shift: "",
        active: true,
        imgUrl: "",
        imgReq: false
      },
      task2: {
        taskName: "",
        shift: "",
        active: true,
        imgUrl: "",
        imgReq: false
      },
      task3: {
        taskName: "",
        shift: "",
        active: true,
        imgUrl: "",
        imgReq: false
      },
      task4: {
        taskName: "",
        shift: "",
        active: true,
        imgUrl: "",
        imgReq: false
      },
      task5: {
        taskName: "",
        shift: "",
        active: true,
        imgUrl: "",
        imgReq: false
      },
      task6: {
        taskName: "",
        shift: "",
        active: true,
        imgUrl: "",
        imgReq: false
      }
    };
  }
  handleSubmit = event => {
    event.preventDefault();
  };

  handleChange = (e, taskNum) => {
    console.log(e.target.value);
    console.log(e.target.name);
    console.log(taskNum);
  };
  render() {
    return (
      <Card>
        <form noValidate onSubmit={this.handleSubmit}>
          <CardContent>
            <Typography color="textPrimary" gutterBottom>
              {this.formType === "create" ? "Create" : "Edit"} Room
            </Typography>
            <TaskForm handleChange={this.handleChange} />
            <TextField
              id="standard-basic"
              onChange={this.addRoomName}
              value={this.roomName}
              label="Room Name"
            />
            <TextField
              onChange={this.addTaskName}
              value={this.taskName}
              id="standard-basic"
              label="Task Description"
            />
            <InputLabel>Shift</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.shift}
              onChange={this.addShift}
            >
              <MenuItem value="day">Morning</MenuItem>
              <MenuItem value="night">Night</MenuItem>
            </Select>
            <InputLabel>Image Required?</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.props.imgReq}
              onChange={this.props.setImgReq}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </CardContent>

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyForm);
