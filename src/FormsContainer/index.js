import React from "react";
import CompanyForm from "./CompanyForm";
import { Redirect } from "react-router";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import "./index.css";

const mapStateToProps = state => {
  return {
    status: state.modals.status,
    user: state.modals.user,
    users: state.companyData.users,
    loggedIn: state.modals.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: bool => dispatch({ type: "TOGGLE_LOGIN", payload: bool }),
    addStatus: message => dispatch({ type: "ADD_STATUS", payload: message }),
    addUserInfo: userInfo =>
      dispatch({ type: "ADD_USER_INFO", payload: userInfo }),
    addUsers: users => dispatch({ type: "ADD_USERS", payload: users })
  };
};

class FormsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      form: "company",
      type: "create",
      redirect: "false",
      companyId: "",
      message: ""
    };
  }

  componentDidMount() {
    this.props.addStatus("");
    this.handleFormType();
  }

  //will change whether this is an intial account setup, or just registering new users to your company
  //call this on login
  handleFormType = () => {
    console.log(this.props);
    if (this.props.loggedIn === false) {
      this.setState({ form: "company" });
    } else {
      this.setState({ form: "register" });
    }
  };

  createCompany = async companyInfo => {
    try {
      const companyResponse = await fetch(
        process.env.REACT_APP_API_URL + "/api/v1/companys/",
        {
          credentials: "include",
          method: "POST",
          body: JSON.stringify(companyInfo),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const { data } = await companyResponse.json();
      console.log(data);
      this.setState({ form: "initRegister", companyId: data.id });
      //initial register lets the app know that the first user will be "master" user
    } catch (err) {
      console.error(err);
    }
  };

  createUser = async userInfo => {
    if (this.state.form !== "initRegister") {
      userInfo.company = this.props.user.company.id;
    } else userInfo.company = this.state.companyId;
    try {
      const createResponse = await fetch(
        process.env.REACT_APP_API_URL + "/api/v1/users/register",
        {
          credentials: "include",
          method: "POST",
          body: JSON.stringify(userInfo),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const createJson = await createResponse.json();
      if (createJson.status !== 401) {
        if (this.state.form === "initRegister") {
          //if the user is coming from the inital signup of their company, log them in,
          //otherwise it means the admin is adding someone, so dont log that admin created user in
          this.props.loginUser(true);
          this.props.addUserInfo(createJson.data);
        }

        const users = [...this.props.users, createJson.data];
        this.props.addUsers(users);
        this.setState({ redirect: true });
      } else {
        this.props.addStatus("Email Already Exists");
      }
    } catch (err) {
      console.error(err);
    }
  };

  login = async userInfo => {
    try {
      const loginResponse = await fetch(
        process.env.REACT_APP_API_URL + "/api/v1/users/login",
        {
          credentials: "include",
          method: "POST",
          body: JSON.stringify(userInfo),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const loginJson = await loginResponse.json();
      console.log(loginJson.data);
      if (loginJson.status !== 401) {
        const companyId = loginJson.data.company.id;
        this.props.loginUser(true);
        this.props.addUserInfo(loginJson.data);
        this.props.getUsers(companyId);
        this.props.getRooms(companyId);
        this.props.getLogs(companyId);

        this.handleFormType();
        this.setState({ redirect: true });
      } else {
        this.props.addStatus(loginJson.message);
      }
      //need to add redux and changed to logged in.
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />;
    }

    return (
      <div className="form-container">
        {this.state.form === "company" && this.props.type === "register" ? (
          <CompanyForm
            type={this.state.type}
            createCompany={this.createCompany}
          />
        ) : (
          ""
        )}
        {this.state.form === "register" ||
        (this.state.form === "initRegister" &&
          this.props.type === "register") ? (
          <RegisterForm
            createUser={this.createUser}
            status={this.props.status}
            loggedIn={this.props.loggedIn}
            companyId={this.state.companyId}
            type={this.state.type}
            form={this.state.form}
          />
        ) : (
          ""
        )}
        {this.props.type === "login" ? (
          <LoginForm status={this.props.status} login={this.login} />
        ) : null}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormsContainer);
