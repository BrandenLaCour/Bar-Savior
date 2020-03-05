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
  },
  urgentStatus: {
    backgroundColor: "rgba(236, 33, 33, .5)"
  },
  attention: {
    backgroundColor: "rgba(255, 153, 51, .5)"
  },
  imageContainer: {
    width: 150,
    height: 100,
    margin: 20
  },
  image: {
    width: 100
  }
});

const CheckListRow = props => {
  const classes = useStyles();
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("okay");
  const [picture, onDrop] = useState(null);
  const [active, setActive] = useState(true);
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [attempted, setAttempted] = useState(false);
  const [rendered, setRendered] = useState(false);

  const log = {
    notes: notes,
    status: status,
    picture: picture,
    task: props.taskId
  };

  if (rendered === false) {
    setStatus(props.status);
    setRendered(true);
  }

  const handleSubmit = () => {
    if ((props.imgReq && picture !== null) || props.imgReq === false) {
      if (active) props.addLog(log);
      setMessage(null);
      setPicMessage(null);
      setActive(false);
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
    <Card
      className={
        props.status === "urgent"
          ? classes.urgentStatus
          : props.status === "attention"
          ? classes.attention
          : ""
      }
      style={!active ? { opacity: 0.5 } : null}
    >
      <CardContent className={classes.listItem}>
        {active ? (
          <>
            <FormControlLabel
              control={
                props.imgReq && picture === null ? (
                  attempted ? (
                    <Checkbox disabled />
                  ) : (
                    <Checkbox onClick={handleSubmit} />
                  )
                ) : (
                  <Checkbox onClick={handleSubmit} />
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

        {props.notes ? <div>Notes: {props.notes}</div> : null}
        <div>
          <small>{props.date}</small>
        </div>
        <div>Status: {props.status}</div>
        {/* <CardContent>Shift: {props.shift}</CardContent> */}
        {props.imageUrl !== null ? (
          <img
            className={classes.image}
            onClick={() => props.enlargedImage(props.imageUrl)}
            src={props.imageUrl}
          />
        ) : null}
        <InputLabel>Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          name="New Status"
          onChange={e => setStatus(e.target.value)}
          className={classes.button}
        >
          <MenuItem value="urgent">Urgent</MenuItem>
          <MenuItem value="attention">Needs Attention</MenuItem>
          <MenuItem value="okay">Resolved</MenuItem>
        </Select>
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
        <TextField
          id="outlined-basic"
          label="New Notes"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          variant="outlined"
        />
      </CardContent>
      <small className={classes.urgent}>
        {message !== null ? message : null}
        {picMessage !== null ? picMessage : null}
      </small>
    </Card>
  );
};

export default CheckListRow;
