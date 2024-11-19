import { ACTION_TYPE } from "../../../constant/actionType";

export const createQuery = (data) => ({
  type: ACTION_TYPE.CREATE_QUERY_SAGA,
  payload: {
    data: data,
  },
});

export const initialStateCreateQuery = () => ({
  type: ACTION_TYPE.CREATE_QUERY_INITIAL_STATE,
});

export const getListQuery = (data) => ({
  type: ACTION_TYPE.GET_LIST_QUERY_SAGA,
  payload: {
    data: data,
  },
});

export const initialStateGetListQuery = () => ({
  type: ACTION_TYPE.GET_QUERY_INITIAL_STATE,
});

export const updatedQuery = (data) => ({
  type: ACTION_TYPE.UPDATE_QUERY_SAGA,
  payload: {
    data: data,
  },
});
export const initialStateUpdatedQuery = () => ({
  type: ACTION_TYPE.UPDATE_QUERY_INITIAL_STATE,
});

export const deleteQuery = (data) => ({
  type: ACTION_TYPE.DELETE_QUERY_SAGA,
  payload: {
    data: data,
  },
});

export const initialStateDeleteQuery = () => ({
  type: ACTION_TYPE.DELETE_QUERY_INITIAL_STATE,
});
