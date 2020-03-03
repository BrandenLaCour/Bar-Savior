import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import ChecklistRow from "../CheckListRow";
import { Redirect } from "react-router-dom";

const mapStateToProps = state => {
  return {
    tasks: state.companyData.tasks,
    redirect: state.modals.redirect,
    room: state.companyData.room
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addLogs: logs => dispatch({ type: "ADD_LOGS", payload: logs }),
    isRedirect: bool => dispatch({ type: "REDIRECT", payload: bool })
  };
};

class RoomChecklist extends React.Component {
  constructor() {
    super();
    this.state = {
      status: "",
      notes: "",
      pictures: []
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
    console.log("room checklist show");
    return (
      <Card>
        <form noValidate onSubmit={this.handleSubmit}>
          <CardContent>
            <Typography color="textPrimary" gutterBottom>
              {this.props.room}
            </Typography>
            {this.props.tasks.map(task => {
              return (
                <>
                  <ChecklistRow
                    taskId={task.id}
                    name={task.name}
                    shift={task.shift}
                    imgReq={task.imgReq}
                  />
                </>
              );
            })}
          </CardContent>

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomChecklist);
