import axiosClient from "./axiosClient";

const taskAPI = {
  getProjectDetail: (taskId, acces) => {
    return axiosClient.get("Project/getProjectDetail", {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
      params: {
        id: taskId,
      },
    });
  },
  createTask: (values, acces) => {
    return axiosClient.post("Project/createTask", values, {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
    });
  },
  getAll: () => {
    return axiosClient.get("Status/getAll");
  },
  getAllpri: (projectId) => {
    return axiosClient.get("Priority/getAll", {
      params: {
        id: projectId,
      },
    });
  },
  getAlltas: () => {
    return axiosClient.get("TaskType/getAll");
  },
  createTask: (values, acces) => {
    return axiosClient.post("Project/createTask", values, {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
    });
  },
  removeTask: (taskId, acces) => {
    return axiosClient.delete("Project/removeTask", {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
      params: {
        taskId: taskId,
      },
    });
  },
  getTaskDetail: (taskId, acces) => {
    return axiosClient.get("Project/getTaskDetail", {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
      params: {
        taskId: taskId,
      },
    });
  },
  updateTasks: (values, acces) => {
    return axiosClient.post("Project/updateTask", values, {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
    });
  },
  getAllComment: (taskId) => {
    return axiosClient.get("Comment/getAll", {
      params: {
        taskId: taskId,
      },
    });
  },
  insertComment: (values, acces) => {
    return axiosClient.post("Comment/insertComment", values, {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
    });
  },
  deleteComment: (commentId, acces) => {
    return axiosClient.delete("Comment/deleteComment", {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
      params: {
        idComment: commentId,
      },
    });
  },

  updateComment: (commentId, comment, acces) => {
    return axiosClient.put(
      `Comment/updateComment`,
      { contentComment: comment },
      {
        headers: {
          Authorization: `Bearer ${acces}`,
        },
        params: {
          id: commentId,
          contentComment: comment,
        },
      }
    );
  },
};
export default taskAPI;
