import { axio } from "../../../axios";

export const createProjectApi = (data) => {
  return axio.post("/project/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateProjectApi = ({id,...data}) => {

  return axio.put(`/project/update/`,data.data,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
    params: {
      _id:id,
    },
  });
};

export const deleteProjectApi = (data) => {
  return axio.post(`/project/delete/${data._id}`, { ...data });
};

export const getProjectApi = (data) => {
  return axio.get("/project/getlist", {
    params: {
      ...data,
    },
  });
};
