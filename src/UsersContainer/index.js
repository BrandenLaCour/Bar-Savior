import React from "react";
import UserCard from "./UserCard";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    users: state.companyData.users
  };
};
const mapDispatchToProps = dispatch => {};

const UsersContainer = () => {
  return <UserCard />;
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
