import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import TaskForm from "../TaskForm";
import TextField from "@material-ui/core/TextField";

const mapStateToProps = state => {
  return {
    formType: state.modals.formType,
    roomName: state.taskForm.roomName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addRoomName: event =>
      dispatch({ type: "ADD_ROOM_NAME", payload: event.target.value })
  };
};

class CompanyForm extends React.Component {
  constructor() {
    super();
    this.state = {
      room: "",
      task1: {
        taskName: "",
        shift: "both",
        active: true,
        imgUrl: "",
        imgReq: false
      },
      task2: {
        taskName: "",
        shift: "both",
        active: true,
        imgUrl: "",
        imgReq: false
      },
      task3: {
        taskName: "",
        shift: "both",
        active: true,
        imgUrl: "",
        imgReq: false
      },
      task4: {
        taskName: "",
        shift: "both",
        active: true,
        imgUrl: "",
        imgReq: false
      },
      task5: {
        taskName: "",
        shift: "both",
        active: true,
        imgUrl: "",
        imgReq: false
      },
      task6: {
        taskName: "",
        shift: "both",
        active: true,
        imgUrl: "",
        imgReq: false
      }
    };
  }

  handleSubmit = event => {
    //submit all rows, maybe have to map
    event.preventDefault();
    if (this.props.formType === "create") {
      this.props.createRoom(this.state);
    } else {
      this.props.updateRoom(this.state);
    }
  };

  handleChange = (e, taskNum) => {
    //change each row one at a time
    const task = this.state[taskNum];
    task[e.target.name] = e.target.value;
    this.setState({ [taskNum]: task });
  };

  handleRoomChange = e => {
    this.setState({ room: e.target.value });
  };
  render() {
    return (
      <Card>
        <form noValidate onSubmit={this.handleSubmit}>
          <CardContent>
            <Typography color="textPrimary" gutterBottom>
              {this.props.formType === "create" ? "Create" : "Edit"} Room
            </Typography>
            <TextField
              onChange={e => this.handleRoomChange(e)}
              name="room"
              value={this.state.room}
              id="standard-basic"
              label="Room"
            />

            <TaskForm
              taskName={this.state.task1.taskName}
              shift={this.state.task1.shift}
              active={this.state.task1.active}
              handleChange={this.handleChange}
              taskNum="task1"
            />
            <TaskForm
              taskName={this.state.task2.taskName}
              shift={this.state.task2.shift}
              active={this.state.task2.active}
              handleChange={this.handleChange}
              taskNum="task2"
            />

            <TaskForm
              taskName={this.state.task3.taskName}
              shift={this.state.task3.shift}
              active={this.state.task3.active}
              handleChange={this.handleChange}
              taskNum="task3"
            />
            <TaskForm
              taskName={this.state.task4.taskName}
              shift={this.state.task4.shift}
              active={this.state.task4.active}
              handleChange={this.handleChange}
              taskNum="task4"
            />
            <TaskForm
              taskName={this.state.task5.taskName}
              shift={this.state.task5.shift}
              active={this.state.task5.active}
              handleChange={this.handleChange}
              taskNum="task5"
            />
            <TaskForm
              taskName={this.state.task6.taskName}
              shift={this.state.task6.shift}
              active={this.state.task6.active}
              handleChange={this.handleChange}
              taskNum="task6"
            />
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
