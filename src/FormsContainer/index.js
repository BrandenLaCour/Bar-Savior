import React from "react";
import CompanyForm from "./CompanyForm";
import { Redirect } from "react-router";
import RegisterForm from "./RegisterForm";

class FormsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      form: "register",
      type: "create",
      redirect: "false",
      companyId: ""
    };
  }
  //refactor into redux

  createCompany = async companyInfo => {
    const createdResponse = await fetch(
      process.env.REACT_APP_API_URL + "/api/v1/companys/",
      {
        method: "POST",
        body: JSON.stringify(companyInfo),
        headers: {
          "content-type": "application/json"
        }
      }
    );
    const { data } = await createdResponse.json();
    this.setState({ form: "register", companyId: data.id });
  };

  createUser = () => {};

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/register" />;
    }

    return (
      <>
        {this.state.form === "company" ? (
          <CompanyForm
            form={this.state.form}
            createCompany={this.createCompany}
          />
        ) : (
          ""
        )}
        {this.state.form === "register" ? (
          <RegisterForm companyId={this.state.companyId} />
        ) : (
          ""
        )}
      </>
    );
  }
}

export default FormsContainer;
