import { ACTION_TYPE } from "../../../constant/actionType";

export const createProject = (data) => ({
  type: ACTION_TYPE.CREATE_PROJECT_SAGA,
  payload: {
    data: data,
  },
});

export const initialStateCreateProject = () => ({
  type: ACTION_TYPE.CREATE_PROJECT_INITIAL_STATE,
});

export const getListProject = (data) => ({
  type: ACTION_TYPE.GET_LIST_PROJECT_SAGA,
  payload: {
    data: data,
  },
});

export const initialStateGetListProject = () => ({
  type: ACTION_TYPE.GET_PROJECT_INITIAL_STATE,
});

export const updatedProject = (data) => ({
  type: ACTION_TYPE.UPDATE_PROJECT_SAGA,
  payload: {
    data: data,
  },
});
export const initialStateUpdatedProject = () => ({
  type: ACTION_TYPE.UPDATE_PROJECT_INITIAL_STATE,
});

export const deleteProject = (data) => ({
  type: ACTION_TYPE.DELETE_PROJECT_SAGA,
  payload: {
    data: data,
  },
});

export const initialStateDeleteProject = () => ({
  type: ACTION_TYPE.DELETE_PROJECT_INITIAL_STATE,
});
