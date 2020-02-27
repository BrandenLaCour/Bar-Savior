import React from "react";
import "./App.css";
import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router";
import CompanyForm from "./FormsContainer/CompanyForm";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import reducer from "./reducer";

const mapStateToProps = state => {
  return {
    drawerOpen: state.drawerOpen,
    loggedIn: state.loggedIn
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
              render={props => <CompanyForm></CompanyForm>}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
