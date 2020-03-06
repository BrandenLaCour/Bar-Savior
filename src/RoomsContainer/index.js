import React from "react";
import RoomCard from "./RoomCard";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    rooms: state.companyData.rooms,
    room: state.modals.room,
    user: state.modals.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addRoom: room =>
      dispatch({
        type: "ADD_ROOM",
        payload: room
      })
  };
};

class RoomsContainer extends React.Component {
  deleteRoom = async roomId => {
    console.log(this.props.room);
    try {
      const deleteResponse = await fetch(
        process.env.REACT_APP_API_URL + `/api/v1/rooms/${roomId}`,
        {
          credentials: "include",
          method: "DELETE"
        }
      );
      const deleteJson = await deleteResponse.json();
      const rooms = [...this.props.rooms];
      const roomIndex = rooms.findIndex(e => e.id === roomId);
      rooms.splice(roomIndex, 1);
      this.props.addrooms(rooms);
      console.log(deleteJson);
    } catch (err) {
      console.error(err);
    }
  };

  addRoom = (name, roomId) => {
    this.props.addRoom(name);
    this.props.getTasks(roomId);
  };

  render() {
    const activeRooms = this.props.rooms.filter(room => room.active === true);
    return (
      <>
        {activeRooms.map(room => {
          return (
            <RoomCard
              addRoom={this.addRoom}
              delete={this.deleteRoom}
              key={room.id}
              id={room.id}
              name={room.name}
              deactivateRoom={this.props.deactivateRoom}
              admin={this.props.user.admin}
            />
          );
        })}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsContainer);
