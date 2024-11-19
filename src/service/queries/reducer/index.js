import { ACTION_TYPE } from "../../../constant/actionType";

const initState = {
  isLoadingGetList: false,
  isSuccessGetList: false,
  isErrorGetList: false,
  successMessageGetList: "",
  errorMessageGetList: "",
  payloadGetList: {},

  isLoadingCreate: false,
  isSuccessCreate: false,
  isErrorCreate: false,
  successMessageCreate: "",
  errorMessageCreate: "",
  payloadCreate: {},

  isLoadingUpdate: false,
  isSuccessUpdate: false,
  isErrorUpdate: false,
  successMessageUpdate: "",
  errorMessageUpdate: "",
  payloadUpdate: {},

  isLoadingDelete: false,
  isSuccessDelete: false,
  isErrorDelete: false,
  successMessageDelete: "",
  errorMessageDelete: "",
  payloadDelete: {},
};

const queryReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_LIST_QUERY_PENDING: {
      return {
        ...state,
        isLoadingGetList: true,
        isSuccessGetList: false,
        isErrorGetList: false,
        successMessageGetList: "",
        errorMessageGetList: "",
        payloadGetList: {},
      };
    }

    case ACTION_TYPE.GET_LIST_QUERY_FULFILLED: {
      return {
        ...state,
        isLoadingGetList: false,
        isSuccessGetList: true,
        isErrorGetList: false,
        successMessageGetList: action.payload.data.message,
        errorMessageGetList: "",
        payloadGetList: action.payload.data,
      };
    }

    case ACTION_TYPE.GET_LIST_QUERY_REJECTED: {
      return {
        ...state,
        isLoadingGetList: false,
        isSuccessGetList: false,
        isErrorGetList: true,
        successMessageGetList: "",
        errorMessageGetList: action.payload.error,
        payloadGetList: {},
      };
    }

    case ACTION_TYPE.GET_LIST_QUERY_INITIAL_STATE: {
      return {
        ...state,
        isLoadingGetList: false,
        isSuccessGetList: false,
        isErrorGetList: false,
        successMessageGetList: "",
        errorMessageGetList: "",
        payloadGetList: {},
      };
    }

    case ACTION_TYPE.CREATE_QUERY_PENDING: {
      return {
        ...state,
        isLoadingCreate: true,
        isSuccessCreate: false,
        isErrorCreate: false,
        successMessageCreate: "",
        errorMessageCreate: "",
        payloadCreate: {},
      };
    }

    case ACTION_TYPE.CREATE_QUERY_FULFILLED: {
      return {
        ...state,
        isLoadingCreate: false,
        isSuccessCreate: true,
        isErrorCreate: false,
        successMessageCreate: action.payload.data.message,
        errorMessageCreate: "",
        payloadCreate: action.payload.data,
      };
    }

    case ACTION_TYPE.CREATE_QUERY_REJECTED: {
      return {
        ...state,
        isLoadingCreate: false,
        isSuccessCreate: false,
        isErrorCreate: true,
        successMessageCreate: "",
        errorMessageCreate: action.payload.error,
        payloadCreate: {},
      };
    }
    case ACTION_TYPE.CREATE_QUERY_INITIAL_STATE: {
      return {
        ...state,
        isLoadingCreate: false,
        isSuccessCreate: false,
        isErrorCreate: false,
        successMessageCreate: "",
        errorMessageCreate: "",
        payloadCreate: {},
      };
    }

    case ACTION_TYPE.UPDATE_QUERY_PENDING: {
      return {
        ...state,
        isLoadingUpdate: true,
        isSuccessUpdate: false,
        isErrorUpdate: false,
        successMessageUpdate: "",
        errorMessageUpdate: "",
        payloadUpdate: {},
      };
    }

    case ACTION_TYPE.UPDATE_QUERY_FULFILLED: {
      return {
        ...state,
        isLoadingUpdate: false,
        isSuccessUpdate: true,
        isErrorUpdate: false,
        successMessageUpdate: action.payload.data.message,
        errorMessageUpdate: "",
        payloadUpdate: action.payload.data.payload,
      };
    }

    case ACTION_TYPE.UPDATE_QUERY_REJECTED: {
      return {
        ...state,
        isLoadingUpdate: false,
        isSuccessUpdate: false,
        isErrorUpdate: true,
        successMessageUpdate: "",
        errorMessageUpdate: action.payload.error,
        payloadUpdate: {},
      };
    }

    case ACTION_TYPE.UPDATE_QUERY_INITIAL_STATE: {
      return {
        ...state,
        isLoadingUpdate: false,
        isSuccessUpdate: false,
        isErrorUpdate: false,
        successMessageUpdate: "",
        errorMessageUpdate: "",
        payloadUpdate: {},
      };
    }

    case ACTION_TYPE.DELETE_QUERY_PENDING: {
      return {
        ...state,
        isLoadingDelete: true,
        isSuccessDelete: false,
        isErrorDelete: false,
        successMessageDelete: "",
        errorMessageDelete: "",
        payloadDelete: {},
      };
    }

    case ACTION_TYPE.DELETE_QUERY_FULFILLED: {
      return {
        ...state,
        isLoadingDelete: false,
        isSuccessDelete: true,
        isErrorDelete: false,
        successMessageDelete: action.payload.data.message,
        errorMessageDelete: "",
        payloadDelete: action.payload.data.payload,
      };
    }

    case ACTION_TYPE.DELETE_QUERY_REJECTED: {
      return {
        ...state,
        isLoadingDelete: false,
        isSuccessDelete: false,
        isErrorDelete: true,
        successMessageDelete: "",
        errorMessageDelete: action.payload.error,
        payloadDelete: {},
      };
    }
    case ACTION_TYPE.DELETE_QUERY_INITIAL_STATE: {
      return {
        ...state,
        isLoadingDelete: false,
        isSuccessDelete: false,
        isErrorDelete: false,
        successMessageDelete: "",
        errorMessageDelete: "",
        payloadDelete: {},
      };
    }

    default: {
      return state;
    }
  }
};

export default queryReducer;
