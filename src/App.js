import React from "react";
import "./App.css";
import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router";
import CompanyForm from "./FormsContainer/CompanyForm";
import Sidebar from "./Sidebar";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      drawerOpen: false,
      loggedIn: false
    };
  }

  toggleDrawer = () => {
    console.log("ran");
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavBar toggleDrawer={this.toggleDrawer} />
          <Sidebar
            toggleDrawer={this.toggleDrawer}
            drawerOpen={this.state.drawerOpen}
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

export default App;
