import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    marginLeft: "100px"
  }
}));

const mapStateToProps = state => {
  return {
    loggedIn: state.modals.loggedIn
  };
};

const NavBar = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={props.toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              <Button color="inherit">Bar Hero (company name)</Button>
            </Link>
          </Typography>
          <Button color="inherit">About</Button>
          {!props.loggedIn ? (
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/register"
            >
              <Button color="inherit">Sign Up</Button>
            </Link>
          ) : null}
          {!props.loggedIn ? (
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/login"
            >
              <Button color="inherit">Login</Button>
            </Link>
          ) : (
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              <Button onClick={props.logout} color="inherit">
                Logout
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default connect(mapStateToProps)(NavBar);
