import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Select from "@material-ui/core/Select";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import { connect } from "react-redux";
import FormHelperText from "@material-ui/core/FormHelperText";

const mapStateToProps = state => {
  return {
    formType: state.authForms.formType
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addUsername: event =>
      dispatch({ type: "ADD_USERNAME", payload: event.target.value }),
      
  };
};

const useStyles = makeStyles({
  root: {
    width: 400,
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
  helper: {
    textAlign: "center"
  },
  status: {
    marginTop: 10,
    color: "red"
  }
});

const CompanyForm = props => {
  const classes = useStyles();

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <Card className={classes.root}>
      <form noValidate onSubmit={handleSubmit}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textPrimary"
            gutterBottom
          >
            {prop.formType === "create" ? "Create" : "Edit"} Room
          </Typography>
          <TextField
            id="standard-basic"
            onChange={props.addEmail}
            label="Room Name"
          />

          <TextField
            id="standard-basic"
            onChange={props.addPassword}
            label="Password"
          />
          <TextField
            onChange={props.addUsername}
            id="standard-basic"
            label="Username"
          />
          <TextField
            id="standard-basic"
            onChange={props.addPosition}
            label="Position"
          />
        </CardContent>
        <CardContent>
          <InputLabel>Admin?</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="admin"
            value={props.admin}
            onChange={props.isAdmin}
            className={classes.button}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
          <FormHelperText className={classes.helper}>
            Admins can create, edit, delete users, rooms and tasks
          </FormHelperText>
        </CardContent>
        {props.form === "register" ? (
          <CardContent>
            <InputLabel>Master?</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="admin"
              value={props.master}
              onChange={props.isMaster}
              className={classes.button}
            >
              <MenuItem value={true}>Yes</MenuItem>

              <MenuItem value={false}>No</MenuItem>
            </Select>
            <FormHelperText className={classes.helper}>
              Master users have the ability to delete the company, this destroys
              all data. Highly recommended to keep this as No.
            </FormHelperText>
          </CardContent>
        ) : (
          props.autoSetMaster()
        )}

        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
        {props.status !== "" ? (
          <div className={classes.status}>{props.status}</div>
        ) : null}
        {
          <FormHelperText className={classes.helper}>
            This account will be the 'master' account. It is the only account
            that can delete this company, deleting all data inside.
          </FormHelperText>
        }
      </form>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyForm);
