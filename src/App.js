import React from "react";
import "./App.css";
import NavBar from "./NavBar";
import { BrowserRouter, Redirect } from "react-router-dom";
import { Route, Switch } from "react-router";
import FormsContainer from "./FormsContainer";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import UserContainer from "./UsersContainer";
import RoomForm from "./RoomForm";
import TaskForm from "./TaskForm";
import RoomsContainer from "./RoomsContainer";
import ListShow from "./ListShow";
import LandingPage from "./LandingPage";
import * as firebase from "firebase/app";
import uniqid from "uniqid";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "bar-savior.firebaseapp.com",
  databaseURL: "https://bar-savior.firebaseio.com",
  projectId: "bar-savior",
  storageBucket: "bar-savior.appspot.com",
  messagingSenderId: "511577259066"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

const mapStateToProps = state => {
  return {
    drawerOpen: state.modals.drawerOpen,
    loggedIn: state.modals.loggedIn,
    user: state.modals.user,
    tasks: state.companyData.tasks,
    redirect: state.modals.redirect,
    logs: state.companyData.logs
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
      }),
    addLogs: logs =>
      dispatch({
        type: "ADD_LOGS",
        payload: logs
      })
  };
};

class App extends React.Component {
  componentDidMount() {
    this.props.isRedirect(false);
  }
  handleLogout = async () => {
    try {
      const logoutResponse = await fetch(
        process.env.REACT_APP_API_URL + "/api/v1/members/logout",
        {
          credentials: "include"
        }
      );
      const logoutJson = await logoutResponse.json();

      this.props.logout();
      this.props.addUsers([]);
      this.props.addRooms([]);

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
          process.env.REACT_APP_API_URL + `/api/v1/members/all/${companyId}`,
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
      // console.log(data);
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

  getLogs = async companyId => {
    try {
      const logsResponse = await fetch(
        process.env.REACT_APP_API_URL + `/api/v1/logs/all/${companyId}`,
        {
          credentials: "include"
        }
      );
      const { data } = await logsResponse.json();
      console.log(data, "is the logs response");
      const logs = data.map(log => {
        if (log.imageId) {
          const pathReference = storage.ref(log.imageId);
          pathReference
            .getDownloadURL()
            .then(url => {
              log.imageUrl = url;
            })
            .catch(error => {
              console.log(error, "could net get image url");
            });
          return log;
        }
        return log;
      });
      this.props.isRedirect(false);
      this.props.addLogs(logs);
      // console.log("got logs");
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
      if (task.name !== "") {
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
          this.getRooms(this.props.user.company.id);
        } catch (err) {
          console.error(err);
        }
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
      this.createManyTasks(createRmJson.data.id);
    } catch (err) {
      console.error(err);
    }
  };

  createLogs = logs => {
    this.props.isRedirect(false);
    console.log("");
    logs.forEach(async log => {
      log.user = this.props.user.id;

      try {
        let imageId;
        console.log("attempting to create a lg");
        if (log.picture) {
          imageId = uniqid();
          log.imageId = imageId;
          const storageRef = storage.ref();
          const pictureRef = storageRef.child(imageId);
          const image = log.picture;
          const blob = new Blob(image, { type: "image/jpeg" });
          pictureRef
            .put(blob)
            .then(async snapshot => {
              //now run the code to get the logs once the picture is done uploading.
              // console.log("uploaded a file", snapshot);
              const createLogResponse = await fetch(
                process.env.REACT_APP_API_URL + "/api/v1/logs/",
                {
                  credentials: "include",
                  method: "POST",
                  body: JSON.stringify(log),
                  headers: {
                    "content-type": "application/json"
                  }
                }
              );
              const createLogJson = await createLogResponse.json();
              console.log(createLogJson);
              this.props.isRedirect(false);
              this.getLogs(this.props.user.company.id);
            })
            .catch(error => {
              console.log(error, "image failed to upload");
            });
        } else {
          //if no picture, create without using firebase
          const createLogResponse = await fetch(
            process.env.REACT_APP_API_URL + "/api/v1/logs/",
            {
              credentials: "include",
              method: "POST",
              body: JSON.stringify(log),
              headers: {
                "content-type": "application/json"
              }
            }
          );
          const createLogJson = await createLogResponse.json();
          console.log(createLogJson);
          this.props.isRedirect(false);
          this.getLogs(this.props.user.company.id);
        }
      } catch (err) {
        console.error(err);
      }
    });
  };

  updateLogs = ids => {
    this.props.isRedirect(false);
    console.log(ids, "are the ids updated");
    ids.forEach(async logId => {
      try {
        const createLogResponse = await fetch(
          process.env.REACT_APP_API_URL + `/api/v1/logs/${logId}`,
          {
            credentials: "include",
            method: "PUT",
            body: JSON.stringify({ urgent: "false" }),
            headers: {
              "content-type": "application/json"
            }
          }
        );
        const createLogJson = await createLogResponse.json();
        console.log(createLogJson);
        this.props.isRedirect(false);
        this.getLogs(this.props.user.company.id);
      } catch (err) {
        console.error(err);
      }
    });
  };

  deactivateRoom = async roomId => {
    this.props.isRedirect(false);
    try {
      const updateLogResponse = await fetch(
        process.env.REACT_APP_API_URL + `/api/v1/rooms/deactivate/${roomId}`,
        {
          credentials: "include",
          method: "PUT",
          body: JSON.stringify({ active: "false" }),
          headers: {
            "content-type": "application/json"
          }
        }
      );
      const updateLogJson = await updateLogResponse.json();
      this.getRooms(this.props.user.company.id);
    } catch (err) {
      console.error(err);
    }
  };

  deactivateUser = async userId => {
    this.props.isRedirect(false);
    try {
      const updateUserResponse = await fetch(
        process.env.REACT_APP_API_URL + `/api/v1/members/deactivate/${userId}`,
        {
          credentials: "include",
          method: "PUT",
          body: JSON.stringify({ active: "false" }),
          headers: {
            "content-type": "application/json"
          }
        }
      );
      const updateUserJson = await updateUserResponse.json();
      console.log(updateUserJson);
      this.getUsers(this.props.user.company.id);
    } catch (err) {
      console.error(err);
    }
  };

  deactivateTask = async (taskId, roomId) => {
    this.props.isRedirect(false);
    try {
      const updateTaskResponse = await fetch(
        process.env.REACT_APP_API_URL + `/api/v1/tasks/deactivate/${taskId}`,
        {
          credentials: "include",
          method: "PUT",
          body: JSON.stringify({ active: "false" }),
          headers: {
            "content-type": "application/json"
          }
        }
      );
      const updateTaskJson = await updateTaskResponse.json();
      console.log(updateTaskJson);
      this.getTasks(roomId);
    } catch (err) {
      console.error(err);
    }
  };

  updateTask = async (task, taskId) => {
    this.props.isRedirect(false);
    try {
      const updateTaskResponse = await fetch(
        process.env.REACT_APP_API_URL + `/api/v1/tasks/${taskId}`,
        {
          credentials: "include",
          method: "PUT",
          body: JSON.stringify(task),
          headers: {
            "content-type": "application/json"
          }
        }
      );
      const updateTaskJson = await updateTaskResponse.json();

      const taskIndex = this.props.tasks.findIndex(task => task.id === taskId);
      // const tasks create new tasks array in place of the old one to show new update
      console.log(updateTaskJson);
      const tasks = this.props.tasks;
      tasks.splice(taskIndex, 1, task);
      this.props.addTasks(tasks);
      // this.getTasks(roomId);
    } catch (err) {
      console.error(err);
    }
  };

  addTask = () => {
    console.log("add task function");
  };

  toggleAdmin = async (userId, bool) => {
    this.props.isRedirect(false);

    try {
      const updateUserResponse = await fetch(
        process.env.REACT_APP_API_URL + `/api/v1/members/${userId}`,
        {
          credentials: "include",
          method: "PUT",
          body: JSON.stringify({ admin: !bool }),
          headers: {
            "content-type": "application/json"
          }
        }
      );
      const updateUserJson = await updateUserResponse.json();
      console.log(updateUserJson);
      this.getUsers(this.props.user.company.id);
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
            loggedIn={this.props.loggedIn}
            company={this.props.user.company}
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
                    <RoomsContainer
                      getLogs={this.getLogs}
                      getTasks={this.getTasks}
                      deactivateRoom={this.deactivateRoom}
                    />
                  </>
                ) : (
                  <div>
                    {" "}
                    <LandingPage />
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
                    getLogs={this.getLogs}
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
                    getLogs={this.getLogs}
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
                  <UserContainer
                    toggleAdmin={this.toggleAdmin}
                    deactivateUser={this.deactivateUser}
                  />
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
                  <ListShow
                    type="checklist"
                    deactivateTask={this.deactivateTask}
                    updateLogs={this.updateLogs}
                    createLogs={this.createLogs}
                  />
                </>
              )}
            />
            <Route
              path="/urgent"
              render={props => (
                <>
                  <ListShow
                    type="urgent"
                    updateLogs={this.updateLogs}
                    createLogs={this.createLogs}
                  />
                </>
              )}
            />
            <Route
              path="/logs"
              render={props => (
                <>
                  <ListShow
                    type="logs"
                    updateLogs={this.updateLogs}
                    createLogs={this.createLogs}
                  />
                </>
              )}
            />
            <Route
              path="/Home"
              render={props => (
                <>
                  <Redirect to="/" />
                </>
              )}
            />
            <Route
              path="/updateTask"
              render={props => (
                <>
                  <TaskForm updateTask={this.updateTask} />
                </>
              )}
            />
            <Route
              path="/addTask"
              render={props => (
                <>
                  <TaskForm addTask={this.addTask} />
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
