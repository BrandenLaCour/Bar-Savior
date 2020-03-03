import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Select from "@material-ui/core/Select";
import CardContent from "@material-ui/core/CardContent";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%"
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
  },
  listItem: {
    display: "flex",
    justifyContent: "center"
  }
});

const TaskForm = props => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.listItem}>
        <TextField
          onChange={e => props.handleChange(e, props.taskNum)}
          name="taskName"
          value={props.taskName}
          id="standard-basic"
          label="Task Description"
        />
        <CardContent />

        <InputLabel className={classes.label}>Shift</InputLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.shift}
          name="shift"
          onChange={e => props.handleChange(e, props.taskNum)}
          className={classes.button}
        >
          <MenuItem value="day">Morning</MenuItem>
          <MenuItem value="night">Night</MenuItem>
          <MenuItem value="both">Both</MenuItem>
        </Select>
        <InputLabel className={classes.label}>Image Required?</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="imgReq"
          value={props.active}
          onChange={e => props.handleChange(e, props.taskNum)}
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
