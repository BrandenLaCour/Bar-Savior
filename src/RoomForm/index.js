import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import TaskRow from "../TaskRow";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

const mapStateToProps = state => {
  return {
    tasks: state.companyData.tasks,
    redirect: state.modals.redirect
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTask: tasks => dispatch({ type: "ADD_TASKS", payload: tasks }),
    isRedirect: bool => dispatch({ type: "REDIRECT", payload: bool })
  };
};

class CompanyForm extends React.Component {
  constructor() {
    super();
    this.state = {
      room: "",
      task1: {
        name: "",
        shift: "both",
        active: true,
        imgUrl: "",
        imgReq: false
      },
      task2: {
        name: "",
        shift: "both",
        active: true,
        imgUrl: "",
        imgReq: false
      },
      task3: {
        name: "",
        shift: "both",
        active: true,
        imgUrl: "",
        imgReq: false
      },
      task4: {
        name: "",
        shift: "both",
        active: true,
        imgUrl: "",
        imgReq: false
      },
      task5: {
        name: "",
        shift: "both",
        active: true,
        imgUrl: "",
        imgReq: false
      },
      task6: {
        name: "",
        shift: "both",
        active: true,
        imgUrl: "",
        imgReq: false
      }
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const room = this.state.room;
    let tasks = { ...this.state };
    delete tasks.room;
    //after getting the room, delete it from the object and now it leaves all tasks to iterate through to create an array of them
    tasks = Object.values(tasks);
    this.props.addTask(tasks);
    this.props.createRoom(room);
    this.props.isRedirect(true);
    //will not have an edit option for now, just editing individual tasks, or delete the whole room
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
    if (this.props.redirect === true) {
      return <Redirect to="/" />;
    }
    return (
      <Card>
        <form noValidate onSubmit={this.handleSubmit}>
          <CardContent>
            <Typography color="textPrimary" gutterBottom>
              Create Room
            </Typography>
            <TextField
              onChange={this.handleRoomChange}
              name="room"
              value={this.state.room}
              id="standard-basic"
              label="Room"
            />

            <TaskRow
              name={this.state.task1.name}
              shift={this.state.task1.shift}
              imgReq={this.state.task1.imgReq}
              handleChange={this.handleChange}
              taskNum="task1"
            />
            <TaskRow
              name={this.state.task2.name}
              shift={this.state.task2.shift}
              imgReq={this.state.task2.imgReq}
              handleChange={this.handleChange}
              taskNum="task2"
            />

            <TaskRow
              name={this.state.task3.name}
              shift={this.state.task3.shift}
              imgReq={this.state.task3.imgReq}
              handleChange={this.handleChange}
              taskNum="task3"
            />
            <TaskRow
              name={this.state.task4.name}
              shift={this.state.task4.shift}
              imgReq={this.state.task4.imgReq}
              handleChange={this.handleChange}
              taskNum="task4"
            />
            <TaskRow
              name={this.state.task5.name}
              shift={this.state.task5.shift}
              imgReq={this.state.task5.imgReq}
              handleChange={this.handleChange}
              taskNum="task5"
            />
            <TaskRow
              name={this.state.task6.name}
              shift={this.state.task6.shift}
              imgReq={this.state.task6.imgReq}
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
