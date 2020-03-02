import React from "react";
import UserCard from "./UserCard";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    users: state.companyData.users
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

const UsersContainer = props => {
  return (
    <>
      {props.users.map(user => {
        return (
          <UserCard
            key={user.id}
            email={user.email}
            username={user.username}
            admin={user.admin ? "Yes" : "No"}
            master={user.master ? "Yes" : "No"}
          />
        );
      })}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
