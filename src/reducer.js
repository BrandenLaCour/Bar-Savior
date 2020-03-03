const defaultState = {
  loggedIn: false,
  drawerOpen: false,
  redirect: true,
  status: "",
  user: "",
  formType: ""
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
    case "ADD_FORM_TYPE":
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

const companyState = {
  users: []
};

export const companyData = (state = companyState, action) => {
  switch (action.type) {
    case "ADD_USERS":
      return { ...state, users: action.payload };
    case "REMOVE_USER":
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

const taskFormState = {
  roomName: "",
  task1: { taskName: "", shift: "", active: true, imgUrl: "", imgReq: false },
  task2: { taskName: "", shift: "", active: true, imgUrl: "", imgReq: false },
  task3: { taskName: "", shift: "", active: true, imgUrl: "", imgReq: false },
  task4: { taskName: "", shift: "", active: true, imgUrl: "", imgReq: false },
  task5: { taskName: "", shift: "", active: true, imgUrl: "", imgReq: false },
  task6: { taskName: "", shift: "", active: true, imgUrl: "", imgReq: false },
  tasks: []
};

export const taskForm = (state = taskFormState, action) => {
  switch (action.type) {
    case "ADD_ROOM_NAME":
      return { ...state, roomName: action.payload };
    case "ADD_TASK_1":
      return { ...state, task1: action.payload };

    default:
      return state;
  }
};
