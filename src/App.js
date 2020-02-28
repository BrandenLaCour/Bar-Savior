import React from "react";
import "./App.css";
import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router";
import FormsContainer from "./FormsContainer";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    drawerOpen: state.modals.drawerOpen,
    loggedIn: state.modals.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleDrawer: () => {
      dispatch({ type: "TOGGLE_DRAWER" });
    }
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavBar toggleDrawer={this.props.toggleDrawer} />
          <Sidebar
            toggleDrawer={this.props.toggleDrawer}
            drawerOpen={this.props.drawerOpen}
          />

          <Switch>
            <Route exact path="/" render={props => <h3>Landing Page</h3>} />
            <Route
              path="/login"
              render={props => <FormsContainer type="login" />}
            />
            <Route
              path="/register"
              render={props => (
                <FormsContainer type="register" loggedIn={props.loggedIn} />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
