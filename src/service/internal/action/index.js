import { ACTION_TYPE } from "../../../constant/actionType";

export const filterDataProject = (data) => ({
  type: ACTION_TYPE.FILTER_DATA_PROJECT,
  payload: {
    data: data,
  },
});

export const filterDataInitialState = () => ({
  type: ACTION_TYPE.FILTER_DATA_INITIAL_STATE,
});
