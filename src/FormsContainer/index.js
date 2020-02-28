import React from "react";
import CompanyForm from "./CompanyForm";
import { Redirect } from "react-router";
import RegisterForm from "./RegisterForm";

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

  createCompany = async companyInfo => {
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
    this.setState({ form: "register", companyId: data.id });
  };

  createUser = async userInfo => {
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
    console.log(data);
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />;
    }

    return (
      <>
        {this.state.form === "company" ? (
          <CompanyForm
            type={this.state.type}
            createCompany={this.createCompany}
          />
        ) : (
          ""
        )}
        {this.state.form === "register" ? (
          <RegisterForm
            createUser={this.createUser}
            companyId={this.state.companyId}
            type={this.state.type}
          />
        ) : (
          ""
        )}
      </>
    );
  }
}

export default FormsContainer;
