import React from "react";
import UserCard from "./UserCard";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    users: state.companyData.users,
    user: state.modals.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addUsers: users =>
      dispatch({
        type: "ADD_USERS",
        payload: users
      })
  };
};

class UsersContainer extends React.Component {
  deleteUser = async userId => {
    console.log(this.props.user);
    try {
      const deleteResponse = await fetch(
        process.env.REACT_APP_API_URL + `/api/v1/users/${userId}`,
        {
          credentials: "include",
          method: "DELETE"
        }
      );
      const deleteJson = await deleteResponse.json();
      const users = [...this.props.users];
      const userIndex = users.findIndex(e => e.id === userId);
      users.splice(userIndex, 1);
      this.props.addUsers(users);
      console.log(deleteJson);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <>
        {this.props.users.map(user => {
          return (
            <UserCard
              key={user.id}
              email={user.email}
              username={user.username}
              admin={user.admin ? "Yes" : "No"}
              master={user.master ? "Yes" : "No"}
              id={user.id}
              position={user.position}
              delete={this.deleteUser}
            />
          );
        })}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
