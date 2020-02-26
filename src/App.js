import React from "react";
import "./App.css";
import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router";
import Sidebar from "./Sidebar";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      drawerOpen: false
    };
  }

  toggleDrawer = () => {
    console.log("ran");
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };
  render() {
    return (
      <div className="App">
        <NavBar toggleDrawer={this.toggleDrawer} />
        <Sidebar
          toggleDrawer={this.toggleDrawer}
          drawerOpen={this.state.drawerOpen}
        />
        <BrowserRouter>
          <Switch>
            <Route path="/" render={props => <h3>Landing Page</h3>} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
