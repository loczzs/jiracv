import axiosClient from "./axiosClient";

const projectAPI = {
  getAllProject: (acces) => {
    return axiosClient.get("Project/getAllProject", {
    });
  },
  getUser: (acces) => {
    return axiosClient.get("Users/getUser", {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
    });
  },
  createProjectAuthorize: (values, acces) => {
    return axiosClient.post("Project/createProjectAuthorize", values, {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
    });
  },
  deleteProject: (projectId, acces) => {
    return axiosClient.delete("Project/deleteProject", {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
      params: {
        projectId: projectId,
      },
    });
  },
  ProjectCategory: () => {
    return axiosClient.get("ProjectCategory");
  },
  getProjectDetail: (projectId, acces) => {
    return axiosClient.get("Project/getProjectDetail", {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
      params: {
        id: projectId,
      },
    });
  },
  updateProjects: (values, projectId, acces) => {
    return axiosClient.put("Project/updateProject", values, {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
      params: {
        projectId: projectId,
      },
    });
  },
  assignUserProject: (values, acces) => {
    return axiosClient.post("Project/assignUserProject", values, {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
    });
  },
  removeUserProject: (values, acces) => {
    return axiosClient.post("Project/removeUserFromProject", values, {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
    });
  },
};

export default projectAPI;
