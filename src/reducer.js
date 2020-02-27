const defaultState = {
  loggedIn: false,
  drawerOpen: false
};

function reducer(state = defaultState, action) {
  switch (action.type) {
    case "TOGGLE_DRAWER":
      return { ...state, drawerOpen: !state.drawerOpen };
    default:
      return state;
  }
}

export default reducer;
