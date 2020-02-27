const defaultState = {
  loggedIn: false,
  drawerOpen: false
};

export const modals = (state = defaultState, action) => {
  switch (action.type) {
    case "TOGGLE_DRAWER":
      return { ...state, drawerOpen: !state.drawerOpen };
    default:
      return state;
  }
};

const form = {
  name: "",
  address: ""
};

export const forms = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_NAME":
      return { ...state, name: action.payload };
    case "ADD_ADDRESS":
      return { ...state, address: action.payload };
    default:
      return state;
  }
};
