const defaultState = {
  loggedIn: false,
  drawerOpen: false,
  redirect: false,
  status: "",
  user: "",
  formType: ""
};

export const modals = (state = defaultState, action) => {
  switch (action.type) {
    case "TOGGLE_DRAWER":
      return { ...state, drawerOpen: !state.drawerOpen };
    case "REDIRECT":
      return { ...state, redirect: action.payload };
    case "TOGGLE_LOGIN":
      return { ...state, loggedIn: action.payload };
    case "ADD_STATUS":
      return { ...state, status: action.payload };
    case "ADD_USER_INFO":
      return { ...state, user: action.payload };
    case "ADD_FORM_TYPE":
      return { ...state, formType: action.payload };
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
      return { ...state, companyName: action.payload };
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

const companyState = {
  users: [],
  tasks: [],
  rooms: [],
  logs: [],
  room: ""
};

export const companyData = (state = companyState, action) => {
  switch (action.type) {
    case "ADD_USERS":
      return { ...state, users: action.payload };
    case "ADD_ROOMS":
      return { ...state, rooms: action.payload };
    case "ADD_ROOM":
      return { ...state, room: action.payload };
    case "ADD_LOGS":
      return { ...state, logs: action.payload };
    case "REMOVE_USER":
      return { ...state, users: action.payload };
    case "ADD_TASKS":
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
};

const taskFormState = {
  name: "",
  shift: "both",
  active: true,
  imgReq: false,
  taskId: ""
};

export const taskForm = (state = taskFormState, action) => {
  switch (action.type) {
    case "ADD_NAME":
      return { ...state, name: action.payload };
    case "ADD_SHIFT":
      return { ...state, shift: action.payload };
    case "ADD_IMG_REQ":
      return { ...state, imgReq: action.payload };
    case "ADD_TASK_ID":
      return { ...state, imgReq: action.payload };
    default:
      return state;
  }
};
