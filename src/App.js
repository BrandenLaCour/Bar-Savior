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
import RoomsContainer from "./RoomsContainer";
import RoomChecklist from "./RoomChecklist";

const mapStateToProps = state => {
  return {
    drawerOpen: state.modals.drawerOpen,
    loggedIn: state.modals.loggedIn,
    user: state.modals.user,
    tasks: state.companyData.tasks,
    redirect: state.modals.redirect
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
    },
    isRedirect: bool => dispatch({ type: "REDIRECT", payload: bool }),
    addUsers: users => dispatch({ type: "ADD_USERS", payload: users }),
    addUserInfo: userInfo =>
      dispatch({ type: "ADD_USER_INFO", payload: userInfo }),
    addRooms: rooms =>
      dispatch({
        type: "ADD_ROOMS",
        payload: rooms
      }),
    addTasks: tasks =>
      dispatch({
        type: "ADD_TASKS",
        payload: tasks
      })
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
      console.log(logoutJson);
      this.props.logout();
      this.props.addUsers([]);
      this.props.addUserInfo({});
      //reset state after logout
    } catch (err) {
      console.error(err);
    }
  };

  getUsers = async companyId => {
    //get users by company id, see if i have a way to do that in backend.
    if (this.props.user.admin === true || this.props.user.master === true) {
      // only get them if admin or master
      try {
        const usersResponse = await fetch(
          process.env.REACT_APP_API_URL + `/api/v1/users/all/${companyId}`,
          {
            credentials: "include"
          }
        );
        const { data } = await usersResponse.json();
        this.props.addUsers(data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  getRooms = async companyId => {
    //get users by company id, see if i have a way to do that in backend.

    try {
      const roomsResponse = await fetch(
        process.env.REACT_APP_API_URL + `/api/v1/rooms/all/${companyId}`,
        {
          credentials: "include"
        }
      );
      const { data } = await roomsResponse.json();
      console.log(data);
      this.props.addRooms(data);
    } catch (err) {
      console.error(err);
    }
  };

  getTasks = async roomId => {
    //get users by company id, see if i have a way to do that in backend.

    try {
      const tasksResponse = await fetch(
        process.env.REACT_APP_API_URL + `/api/v1/tasks/all/${roomId}`,
        {
          credentials: "include"
        }
      );
      const { data } = await tasksResponse.json();
      this.props.addTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  changeFormType = formType => {
    this.props.addFormType(formType);
  };

  createManyTasks = roomId => {
    this.props.isRedirect(false);
    this.props.tasks.forEach(async task => {
      try {
        const createTskResponse = await fetch(
          process.env.REACT_APP_API_URL + "/api/v1/tasks/",
          {
            credentials: "include",
            method: "POST",
            body: JSON.stringify({ ...task, room: roomId }),
            headers: {
              "content-type": "application/json"
            }
          }
        );
        const createTskJson = await createTskResponse.json();
      } catch (err) {
        console.error(err);
      }
    });
  };

  createRoom = async room => {
    try {
      const createRmResponse = await fetch(
        process.env.REACT_APP_API_URL + "/api/v1/rooms/",
        {
          credentials: "include",
          method: "POST",
          body: JSON.stringify({
            name: room
          }),
          headers: {
            "content-type": "application/json"
          }
        }
      );
      const createRmJson = await createRmResponse.json();
      console.log(createRmJson);
      this.createManyTasks(createRmJson.data.id);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavBar
            user={this.props.user}
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
              render={props =>
                this.props.loggedIn ? (
                  <>
                    <RoomsContainer getTasks={this.getTasks} />
                  </>
                ) : (
                  <div>
                    {" "}
                    <h3>Landing Page</h3> <p>Thiis is how you use this app</p>{" "}
                  </div>
                )
              }
            />

            <Route
              path="/login"
              render={props => (
                <>
                  <FormsContainer
                    getRooms={this.getRooms}
                    getUsers={this.getUsers}
                    type="login"
                  />
                </>
              )}
            />
            <Route
              path="/register"
              render={props => (
                <>
                  <FormsContainer
                    getRooms={this.getRooms}
                    getUsers={this.getUsers}
                    type="register"
                    loggedIn={props.loggedIn}
                  />
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
              path="/addroom"
              render={props => (
                <>
                  <RoomForm
                    createRoom={this.createRoom}
                    updateRoom={this.updateRoom}
                  />
                </>
              )}
            />
            <Route
              path="/roomShow"
              render={props => (
                <>
                  {console.log("ran")}
                  <RoomChecklist />
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
