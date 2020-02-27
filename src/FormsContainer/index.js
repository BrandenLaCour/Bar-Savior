import React from "react";
import CompanyForm from "./CompanyForm";

class FormsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      form: "company",
      type: "create"
    };
  }

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   switch (this.state.form) {
  //     case "company":
  //       this.createCompany();
  //     default:
  //       console.log("defaulted");
  //   }
  // };

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
    const createdJson = await createdResponse.json();
    console.log(createdJson);
  };

  render() {
    return (
      <>
        <CompanyForm
          form={this.state.form}
          createCompany={this.createCompany}
        />
      </>
    );
  }
}

export default FormsContainer;
