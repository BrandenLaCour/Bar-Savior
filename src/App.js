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
    loggedIn: state.modals.loggedIn,
    user: state.modals.user
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
                    loggedIn={this.props.loggedIn}
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
                    loggedIn={this.props.loggedIn}
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
                    loggedIn={this.props.loggedIn}
                    toggleDrawer={this.props.toggleDrawer}
                  />
                  <FormsContainer type="register" loggedIn={props.loggedIn} />
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
