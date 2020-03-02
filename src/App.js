import React from "react";
import "./App.css";
import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import FormsContainer from "./FormsContainer";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import UserContainer from "./UsersContainer";
import RoomForm from "./RoomForm";

const mapStateToProps = state => {
  return {
    drawerOpen: state.modals.drawerOpen,
    loggedIn: state.modals.loggedIn,
    user: state.modals.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleDrawer: () => {
      dispatch({ type: "TOGGLE_DRAWER" });
    },
    logout: () => {
      dispatch({ type: "TOGGLE_LOGIN", payload: false });
    },
    addFormType: formType => {
      dispatch({ type: "ADD_FORM_TYPE", payload: formType });
    }
  };
};

class App extends React.Component {
  handleLogout = async () => {
    try {
      const logoutResponse = await fetch(
        process.env.REACT_APP_API_URL + "/api/v1/users/logout",
        {
          credentials: "include"
        }
      );
      const logoutJson = await logoutResponse.json();
      this.props.logout();
      console.log(logoutJson);
    } catch (err) {
      console.error(err);
    }
  };

  changeFormType = formType => {
    this.props.addFormType(formType);
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavBar
            logout={this.handleLogout}
            toggleDrawer={this.props.toggleDrawer}
          />
          {this.props.loggedIn ? (
            <Sidebar
              changeFormType={this.changeFormType}
              toggleDrawer={this.props.toggleDrawer}
              drawerOpen={this.props.drawerOpen}
              user={this.props.user}
              loggedIn={this.props.loggedIn}
            />
          ) : null}
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <>
                  <h3>Landing Page</h3>
                </>
              )}
            />

            <Route
              path="/login"
              render={props => (
                <>
                  <FormsContainer type="login" />
                </>
              )}
            />
            <Route
              path="/register"
              render={props => (
                <>
                  <FormsContainer type="register" loggedIn={props.loggedIn} />
                </>
              )}
            />
            <Route
              path="/users"
              render={props => (
                <>
                  <UserContainer />
                </>
              )}
            />
              <Route
              path="/users"
              render={props => (
                <>
                  <UserContainer />
                </>
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
