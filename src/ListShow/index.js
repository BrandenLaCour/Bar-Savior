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
      logs: []
    };
  }
  addLog = log => {
    const logs = this.state.logs;
    logs.push(log);
    this.setState({ logs });
  };

  enlargedImage = url => {
    window.open(url);
  };

  addLogsAndRedirect = () => {
    this.props.createLogs(this.state.logs);
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
      return log.status !== "okay";
    });
    console.log(logsFiltered);
    return (
      <Card>
        <CardContent>
          <Typography color="textPrimary" gutterBottom>
            {this.props.type === "checklist"
              ? this.props.room
              : this.props.type === "logs"
              ? "Logs"
              : "Urgent Tasks"}
          </Typography>

          {this.props.type === "checklist"
            ? this.props.tasks.map(task => {
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
              })
            : this.props.type === "urgent"
            ? logsFiltered
                .map(log => {
                  if (log.status !== "okay") {
                    return (
                      <div key={log.id}>
                        <UrgentRow
                          resolvedId={
                            log.resolvedId !== null
                              ? this.getResolvedUser(log.resolvedId)
                              : null
                          }
                          room={log.task.room.name}
                          notes={log.notes}
                          addLog={this.addLog}
                          taskId={log.task.id}
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
                          log.resolvedId !== null
                            ? this.getResolvedUser(log.resolvedId)
                            : null
                        }
                      />
                      {/* need to do a query here for which user resolved, same for image */}
                    </div>
                  );
                })
                .reverse()}
          {logsFiltered.length === 0 ? <h2>No Urgent Tasks</h2> : null}
        </CardContent>

        {this.props.type === ("checklist" || "urgent") ? (
          <Button
            onClick={this.addLogsAndRedirect}
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        ) : null}
      </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListShow);
