import axiosClientz from "./axiosClientz"; 
const userAPI = {
  getAllUser: () => {
    return axiosClientz.get("Users/getUser");
  },
  deleteUserApi: (userId, acces) => {
    return axiosClientz.delete("Users/deleteUser", {
      headers: {
        Authorization: `Bearer ${acces}`,
      },
      params: {
        id: userId,
      },
    });
  },
  createUserApi: (values) => {
    return axiosClientz.post("Users/signup", values);
  },
  getAllUserdetailz: (userId) => {
    console.log(userId);
    return axiosClientz.get(`Users/getUser?userId=${userId}`);
  },
  updateUserApi: (values) => {
    console.log(values);
    return axiosClientz.put("Users/editUser", {
      ...values,
    });
  },
};
export default userAPI;
