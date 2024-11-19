import { axio } from "../../../axios";

export const createQueryApi = (data) => {
  return axio.post("/quering/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateQueryApi = ({id,...data}) => {

  return axio.put(`/quering/update/`,data.data,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
    params: {
      _id:id,
    },
  });
};

// export const deleteQueryApi = (data) => {
//   return axio.post(`/project/delete/${data._id}`, { ...data });
// };

export const getQueryApi = (data) => {
  return axio.get("quering/getlist?projectId=_id", {
    params: {
      ...data,
    },
  });
};
