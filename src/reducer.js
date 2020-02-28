const defaultState = {
  loggedIn: false,
  drawerOpen: false,
  redirect: true,
  status: "",
  user: {}
};

export const modals = (state = defaultState, action) => {
  switch (action.type) {
    case "TOGGLE_DRAWER":
      return { ...state, drawerOpen: !state.drawerOpen };
    case "REDIRECT":
      return { ...state, redirect: !state.redirect };
    case "TOGGLE_LOGIN":
      return { ...state, loggedIn: action.payload };
    case "ADD_STATUS":
      return { ...state, status: action.payload };
    case "ADD_USER_INFO":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const formState = {
  companyName: "",
  address: "",
  companyId: "",
  username: "",
  password: "",
  position: "",
  admin: false,
  master: false,
  email: ""
};

export const authForms = (state = formState, action) => {
  switch (action.type) {
    case "ADD_COMPANY_NAME":
      return { ...state, name: action.payload };
    case "ADD_ADDRESS":
      return { ...state, address: action.payload };
    case "ADD_COMPANY_ID":
      return { ...state, companyId: action.payload };
    case "ADD_USERNAME":
      return { ...state, username: action.payload };
    case "ADD_PASSWORD":
      return { ...state, password: action.payload };
    case "ADD_POSITION":
      return { ...state, position: action.payload };
    case "ADD_EMAIL":
      return { ...state, email: action.payload };
    case "IS_ADMIN":
      return { ...state, admin: action.payload };
    case "IS_MASTER":
      return { ...state, master: action.payload };

    default:
      return state;
  }
};

// const sessionState = {
//   companyId: "",
//   address: ""
// };

// export const forms = (state = defaultState, action) => {
//   switch (action.type) {
//     case "ADD_NAME":
//       return { ...state, name: action.payload };
//     case "ADD_ADDRESS":
//       return { ...state, address: action.payload };
//     default:
//       return state;
//   }
// };
