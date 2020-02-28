import React from "react";
import CompanyForm from "./CompanyForm";
import { Redirect } from "react-router";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

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
  //refactor into redux

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
      const userResponse = await fetch(
        process.env.REACT_APP_API_URL + "/api/v1/users/register",
        {
          method: "POST",
          body: JSON.stringify(userInfo),
          headers: {
            "content-type": "application/json"
          }
        }
      );
      const { data } = await userResponse.json();
      this.setState({ redirect: true });
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
      console.log(loginJson);
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
          this.props.type === "register ") ? (
          <RegisterForm
            createUser={this.createUser}
            companyId={this.state.companyId}
            type={this.state.type}
            form={this.state.form}
          />
        ) : (
          ""
        )}
        {this.props.type === "login" ? <LoginForm login={this.login} /> : null}
      </>
    );
  }
}

export default FormsContainer;
