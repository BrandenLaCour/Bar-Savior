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
import { grey } from "@material-ui/core/colors";

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

const CheckListRow = props => {
  const classes = useStyles();
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const [picture, onDrop] = useState({});
  const [active, setActive] = useState(true);

  const log = { notes: notes, status: status, picture: picture };

  const handleSubmit = () => {
    if (active) props.addLog(log);
    setActive(false);
  };
  // const [checked, setChecked] = useState(false);
  return (
    <Card className={classes.root} style={!active ? { opacity: 0.5 } : null}>
      <CardContent className={classes.listItem}>
        {active ? <Checkbox onClick={handleSubmit} /> : null}
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
          onChange={picture => onDrop(picture)}
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
    </Card>
  );
};

export default CheckListRow;
