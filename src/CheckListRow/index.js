import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Select from "@material-ui/core/Select";
import CardContent from "@material-ui/core/CardContent";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ImageUploader from "react-images-upload";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
    justifyContent: "center",
    marginBottom: -10
  },
  urgent: {
    color: "red"
  }
});

const CheckListRow = props => {
  const classes = useStyles();
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("okay");
  const [picture, onDrop] = useState(null);
  const [active, setActive] = useState(true);
  const [message, setMessage] = useState(null);
  const [attempted, setAttempted] = useState(false);
  const [picMessage, setPicMessage] = useState(null);

  const log = {
    notes: notes,
    status: status,
    picture: picture,
    task: props.taskId,
    urgent: status !== "okay" ? true : false
  };

  const handleSubmit = () => {
    if ((props.imgReq && picture !== null) || props.imgReq === false) {
      if (active && status === "okay") {
        props.addLog(log);
        setMessage(null);
        setActive(false);
      } else setMessage("You must resolve this task before logging");
      setPicMessage(null);
    } else {
      setAttempted(true);
      setMessage("You must upload a picture for the above task");
    }
  };
  const uploadPic = picture => {
    onDrop(picture);
    setPicMessage("Picture uploaded successfully");
  };

  return (
    <Card className={classes.root} style={!active ? { opacity: 0.5 } : null}>
      <CardContent className={classes.listItem}>
        {active ? (
          <>
            <FormControlLabel
              control={
                props.imgReq && picture === null ? (
                  attempted ? (
                    <Checkbox checked={false} disabled />
                  ) : (
                    <Checkbox checked={false} onClick={handleSubmit} />
                  )
                ) : (
                  <Checkbox checked={false} onClick={handleSubmit} />
                )
              }
            />
          </>
        ) : null}
        {!active ? (
          <FormControlLabel
            disabled
            control={<Checkbox checked value="checkedE" />}
            label="logged"
          />
        ) : null}

        <div>
          <strong>{props.name}</strong>
        </div>

        <TextField
          id="outlined-basic"
          label="Notes"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          variant="outlined"
        />

        {/* <CardContent>Shift: {props.shift}</CardContent> */}
        <ImageUploader
          fileContainerStyle={{
            height: "14px",
            width: "100px",
            all: "inherit"
          }}
          style={{ width: "100px", marginLeft: "20px" }}
          buttonText="Upload"
          onChange={picture => uploadPic(picture)}
          withLabel={false}
          withIcon={false}
        />
        <InputLabel>Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          name="status"
          onChange={e => setStatus(e.target.value)}
          className={classes.button}
        >
          <MenuItem value="urgent">Urgent</MenuItem>
          <MenuItem value="attention">Needs Attention</MenuItem>
          <MenuItem value="okay">Okay</MenuItem>
        </Select>
      </CardContent>
      <small className={classes.urgent}>
        {message !== null ? message : null}
      </small>
      <small>{picMessage !== null ? picMessage : null}</small>
    </Card>
  );
};

export default CheckListRow;
