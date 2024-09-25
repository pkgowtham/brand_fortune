import { axio } from "../../../axios";

export const createProjectApi = (data) => {
  console.log("api", data);
  return axio.post("/project/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateProjectApi = (data) => {
  console.log("api", data);
  return axio.put(`/project/update/${data.id}`, { ...data });
};

export const deleteProjectApi = (data) => {
  console.log("api", data);
  return axio.post(`/project/delete/${data._id}`, { ...data });
};

export const getProjectApi = (data) => {
  console.log("getApi====>here", data);
  return axio.get("/project/getlist", {
    params: {
      ...data,
    },
  });
};
