import React from "react";

class FormsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      form: "company",
      type: "create"
    };
  }
  render() {
    return (
      <>
        <h1>form</h1>
      </>
    );
  }
}

export default FormsContainer;
