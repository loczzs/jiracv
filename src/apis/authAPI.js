import axiosClient from "./axiosClient";

const AuthAPI = {
  registers: (values) => {
    return axiosClient.post("Users/signup", {
      ...values,
    });
  },
  login: (values) =>{
    return axiosClient.post("Users/signin", values)
  }
};

export default AuthAPI;
