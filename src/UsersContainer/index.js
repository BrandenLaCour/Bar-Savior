import React from "react";
import UserCard from "./UserCard";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const mapStateToProps = state => {
  return {
    users: state.companyData.users
  };
};
const mapDispatchToProps = dispatch => {
  return {
    removeUser: users =>
      dispatch({
        type: "REMOVE_USER",
        payload: users
      })
  };
};

async function deleteUser(userId) {
  try {
    const deleteResponse = await fetch(
      process.env.REACT_APP_API_URL + `/api/v1/users/${userId}`,
      {
        credentials: "include",
        method: "DELETE"
      }
    );
    const deleteJson = await deleteResponse.json();
    return <Redirect to="/users" />;
  } catch (err) {
    console.error(err);
  }
}

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
            id={user.id}
            delete={deleteUser}
          />
        );
      })}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
