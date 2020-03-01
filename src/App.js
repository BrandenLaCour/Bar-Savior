import React from "react";
import "./App.css";
import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router";
import FormsContainer from "./FormsContainer";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import UserContainer from "./UsersContainer";

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
    }
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);
  }

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
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <>
                  {this.props.loggedIn ? (
                    <Sidebar
                      toggleDrawer={this.props.toggleDrawer}
                      drawerOpen={this.props.drawerOpen}
                      user={this.props.user}
                      loggedIn={this.props.loggedIn}
                    />
                  ) : null}

                  <NavBar
                    logout={this.handleLogout}
                    toggleDrawer={this.props.toggleDrawer}
                  />
                  <h3>Landing Page</h3>
                </>
              )}
            />

            {/* need to figure out a more dry way to route with nav and sidebar to have them render changes */}
            <Route
              path="/login"
              render={props => (
                <>
                  {this.props.loggedIn ? (
                    <Sidebar
                      toggleDrawer={this.props.toggleDrawer}
                      drawerOpen={this.props.drawerOpen}
                      user={this.props.user}
                      loggedIn={this.props.loggedIn}
                    />
                  ) : null}

                  <NavBar
                    logout={this.handleLogout}
                    toggleDrawer={this.props.toggleDrawer}
                  />
                  <FormsContainer type="login" />
                </>
              )}
            />
            <Route
              path="/register"
              render={props => (
                <>
                  {this.props.loggedIn ? (
                    <Sidebar
                      toggleDrawer={this.props.toggleDrawer}
                      drawerOpen={this.props.drawerOpen}
                      user={this.props.user}
                      loggedIn={this.props.loggedIn}
                    />
                  ) : null}

                  <NavBar
                    logout={this.handleLogout}
                    toggleDrawer={this.props.toggleDrawer}
                  />
                  <FormsContainer type="register" loggedIn={props.loggedIn} />
                </>
              )}
            />
            <Route
              path="/users"
              render={props => (
                <>
                  {this.props.loggedIn ? (
                    <Sidebar
                      toggleDrawer={this.props.toggleDrawer}
                      drawerOpen={this.props.drawerOpen}
                      user={this.props.user}
                      loggedIn={this.props.loggedIn}
                    />
                  ) : null}

                  <NavBar
                    logout={this.handleLogout}
                    toggleDrawer={this.props.toggleDrawer}
                  />
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
