import React from "react";
import CompanyForm from "./CompanyForm";
import { Redirect } from "react-router";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    status: state.modals.status,
    user: state.modals.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: bool => dispatch({ type: "TOGGLE_LOGIN", payload: bool }),
    addStatus: message => dispatch({ type: "ADD_STATUS", payload: message }),
    addUserInfo: userInfo =>
      dispatch({ type: "ADD_USER_INFO", payload: userInfo })
  };
};

class FormsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      form: "company",
      type: "create",
      redirect: "false",
      companyId: ""
    };
  }

  componentDidMount() {
    this.props.addStatus("");
  }

  //will change whether this is an intial account setup, or just registering new users to your company
  //call this on login
  handleFormType = () => {
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
          method: "POST",
          body: JSON.stringify(companyInfo),
          headers: {
            "content-type": "application/json"
          }
        }
      );
      const { data } = await companyResponse.json();
      this.setState({ form: "initRegister", companyId: data.id });
      //initial register lets the app know that the first user will be "master" user
    } catch (err) {
      console.error(err);
    }
  };

  createUser = async userInfo => {
    try {
      const createResponse = await fetch(
        process.env.REACT_APP_API_URL + "/api/v1/users/register",
        {
          method: "POST",
          body: JSON.stringify(userInfo),
          headers: {
            "content-type": "application/json"
          }
        }
      );
      const createJson = await createResponse.json();
      if (createJson.status !== 401) {
        this.props.loginUser(true);
        this.props.addUserInfo(createJson.data);
        this.setState({ redirect: true });
      } else {
        this.props.addStatus(createJson.message);
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
          method: "POST",
          body: JSON.stringify(userInfo),
          headers: {
            "content-type": "application/json"
          }
        }
      );
      const loginJson = await loginResponse.json();
      if (loginJson.status !== 401) {
        this.props.loginUser(true);
        this.props.addUserInfo(loginJson.data);
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
      <>
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
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormsContainer);
