import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Select from "@material-ui/core/Select";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
const useStyles = makeStyles({
  root: {
    width: 1200,
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
  label: {
    marginTop: 20
  }
});

const TaskForm = props => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <TextField
          onChange={e => props.handleChange(e, "task1")}
          name="taskName"
          value={props.taskName}
          id="standard-basic"
          label="Task Description"
        />
        <InputLabel className={classes.label}>Shift</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.shift}
          onChange={props.addShift}
          className={classes.button}
        >
          <MenuItem value="day">Morning</MenuItem>
          <MenuItem value="night">Night</MenuItem>
        </Select>
        <InputLabel className={classes.label}>Image Required?</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.imgReq}
          onChange={props.setImgReq}
          className={classes.button}
        >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </CardContent>
    </Card>
  );
};

export default TaskForm;
