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
      logs: []
    };
  }
  addLog = log => {
    const logs = this.state.logs;
    logs.push(log);
    this.setState({ logs });
  };

  addLogsAndRedirect = () => {
    this.props.createLogs(this.state.logs);
    this.props.isRedirect(true);
  };

  render() {
    if (this.props.redirect === true) {
      return <Redirect to="/" />;
    }

    return (
      <Card>
        <CardContent>
          <Typography color="textPrimary" gutterBottom>
            {this.props.type === "checklist" ? this.props.room : "Logs"}
          </Typography>

          {this.props.type === "checklist" ? (
            this.props.tasks.map(task => {
              return (
                <>
                  <ChecklistRow
                    addLog={this.addLog}
                    taskId={task.id}
                    key={task.id}
                    name={task.name}
                    shift={task.shift}
                    imgReq={task.imgReq}
                  />
                </>
              );
            })
          ) : (
            <ChecklistRow />
          )}
        </CardContent>

        <Button
          onClick={this.addLogsAndRedirect}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomChecklist);
