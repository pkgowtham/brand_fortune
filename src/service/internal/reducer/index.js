import { ACTION_TYPE } from "../../../constant/actionType";

const initState = {
  filterDataProject: {},
};

const internalReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPE.FILTER_DATA_PROJECT: {
      return {
        ...state,
        filterDataProject: action.payload.data,
      };
    }

    case ACTION_TYPE.FILTER_DATA_INITIAL_STATE: {
      return {
        ...state,
        filterDataProject: {},
      };
    }

    default: {
      return state;
    }
  }
};

export default internalReducer;
