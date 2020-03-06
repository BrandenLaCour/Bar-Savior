import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import ChecklistRow from "../CheckListRow";
import { Redirect } from "react-router-dom";
import LogRow from "../LogRow";
import UrgentRow from "../UrgentRow";
import "./index.css";

const mapStateToProps = state => {
  return {
    tasks: state.companyData.tasks,
    redirect: state.modals.redirect,
    room: state.companyData.room,
    logs: state.companyData.logs,
    user: state.modals.user,
    users: state.companyData.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addLogs: logs => dispatch({ type: "ADD_LOGS", payload: logs }),
    isRedirect: bool => dispatch({ type: "REDIRECT", payload: bool })
  };
};

class ListShow extends React.Component {
  constructor() {
    super();
    this.state = {
      logs: [],
      logsIdsToUpdate: []
    };
  }
  addLog = log => {
    const logs = this.state.logs;
    logs.push(log);
    this.setState({ logs });
  };

  addLogIdToUpdate = oldLogId => {
    const logsIdsToUpdate = this.state.logsIdsToUpdate;
    logsIdsToUpdate.push(oldLogId);
    this.setState({ logsIdsToUpdate });
  };

  enlargedImage = url => {
    window.open(url);
  };

  addLogsAndRedirect = () => {
    this.props.createLogs(this.state.logs);
    this.props.updateLogs(this.state.logsIdsToUpdate);
    this.props.isRedirect(true);
  };

  getResolvedUser = userId => {
    const userIndex = this.props.users.findIndex(user => user.id === userId);
    return this.props.users[userIndex];
  };

  render() {
    if (this.props.redirect === true) {
      return <Redirect to="/" />;
    }
    const logsFiltered = this.props.logs.filter(log => {
      return log.urgent === true;
    });
    const activeTasks = this.props.tasks.filter(task => {
      return task.active === true;
    });

    return (
      <>
        <Typography color="textPrimary" gutterBottom>
          {this.props.type === "checklist"
            ? this.props.room
            : this.props.type === "logs"
            ? "Logs"
            : "Urgent Tasks"}
        </Typography>

        {this.props.type === "checklist"
          ? activeTasks.map(task => {
              if (task.active === true) {
                return (
                  <>
                    <ChecklistRow
                      addLog={this.addLog}
                      taskId={task.id}
                      key={task.id}
                      type={this.props.type}
                      name={task.name}
                      shift={task.shift}
                      imgReq={task.imgReq}
                    />
                  </>
                );
              }
            })
          : this.props.type === "urgent"
          ? logsFiltered
              .map(log => {
                if (log.status !== "okay" && log.resolvedId === null) {
                  return (
                    <div key={log.id}>
                      <UrgentRow
                        addLog={this.addLog}
                        room={log.task.room.name}
                        notes={log.notes}
                        user={this.props.user}
                        originalUser={log.user.username}
                        addLog={this.addLog}
                        addLogIdToUpdate={this.addLogIdToUpdate}
                        taskId={log.task.id}
                        oldLogId={log.id}
                        imgReq={log.task.imgReq}
                        enlargedImage={this.enlargedImage}
                        imageUrl={log.imageUrl}
                        type={this.props.type}
                        name={log.task.name}
                        date={log.dateAdded}
                        shift={log.task.shift}
                        status={log.status}
                      />
                    </div>
                  );
                }
              })
              .reverse()
          : this.props.logs
              .map(log => {
                const resolvedUser =
                  log.resolvedId !== null
                    ? this.getResolvedUser(log.resolvedId)
                    : null;
                return (
                  <div key={log.id}>
                    <LogRow
                      date={log.dateAdded}
                      name={log.task.name}
                      key={log.id}
                      user={log.user.username}
                      notes={log.notes}
                      status={log.status}
                      imageUrl={log.imageUrl}
                      room={log.task.room.name}
                      enlargedImage={this.enlargedImage}
                      resolvedUser={
                        resolvedUser !== null ? resolvedUser.username : null
                      }
                    />
                    {/* need to do a query here for which user resolved, same for image */}
                  </div>
                );
              })
              .reverse()}

        <div className="button-container">
          {this.props.type === "urgent" && logsFiltered.length === 0 ? (
            <h2>No Urgent Tasks</h2>
          ) : null}{" "}
          {this.props.type !== "urgent" && this.props.type !== "logs" ? (
            <Button
              onClick={this.addLogsAndRedirect}
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          ) : null}
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListShow);
