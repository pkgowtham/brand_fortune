import { ACTION_TYPE } from "../../../constant/actionType";


const initState = {
  isLoadingLogin: false,
  isSuccessLogin: false,
  isErrorLogin: false,
  successMessageLogin: "",
  errorMessageLogin: "",
  payloadLogin: {},
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.LOGIN_USER_PENDING: {
      return {
        ...state,
        isLoadingLogin: true,
        isSuccessLogin: false,
        isErrorLogin: false,
        successMessageLogin: "",
        errorMessageLogin: "",
        payloadLogin: {},
      };
    }

    case ACTION_TYPE.LOGIN_USER_FULFILLED: {
      return {
        ...state,
        isLoadingLogin: false,
        isSuccessLogin: true,
        isErrorLogin: false,
        successMessageLogin: action.payload.data.message,
        errorMessageLogin: "",
        payloadLogin: action.payload.data,
      };
    }

    case ACTION_TYPE.LOGIN_USER_REJECTED: {
      return {
        ...state,
        isLoadingLogin: false,
        isSuccessLogin: false,
        isErrorLogin: true,
        successMessageLogin: "",
        errorMessageLogin: action.payload.error,
        payload:{}
      };
    }

    case ACTION_TYPE.LOGIN_RETURN_INITIAL_STATE: {
      return {
        ...state,
        isLoadingLogin: false,
        isSuccessLogin: false,
        isErrorLogin: false,
        successMessageLogin: "",
        errorMessageLogin: "",
        payloadLogin: {},
      };
    }

    default: {
      return state;
    }
  }
};

export default authReducer;
