import React, { useEffect } from "react";
// import scss from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CreateUsers } from "modules/List/slices/userSlices";
import scss from "../project/styles.module.scss";

const CreateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users ,error:abc} = useSelector((state) => state.user);  
  console.log(abc);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      email: "",
      passWord: "",
      name: "",
      phoneNumber: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (values) => {
    console.log(values);
    const user = JSON.parse(localStorage.getItem("user"));
    const acce = user.accessToken;
    try {
      await dispatch(CreateUsers(values)).unwrap();
      navigate("/user");
      notification.success({
        message: "tạo user thành công",
      });
    } catch (error) {
      notification.error({
        message: "tạo user thất bại",
        description: error,
      });
    }
  };
  return (
    <div className={scss.title}>
      <div className={scss.center}>
        <h1 className={scss.h1}>Create User</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={scss.form}>
          <div className={scss.field}>
            <input
              type="text"
              {...register("email", {
                required: {
                  value: true,
                  message: "không được để trống",
                },
              })}
            />
            <span></span>
            <label>email</label>
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className={scss.field}>
            <input
              type="text"
              {...register("passWord", {
                required: {
                  value: true,
                  message: "không được để trống",
                },
              })}
            />
            <span></span>
            <label>passWord</label>
            {errors.passWord && <p>{errors.passWord.message}</p>}
          </div>
          <div className={scss.field}>
            <input
              type="text"
              {...register("name", {
                required: {
                  value: true,
                  message: "không được để trống",
                },
              })}
            />
            <span></span>
            <label>name</label>
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div className={scss.field}>
            <input
              type="text"
              {...register("phoneNumber", {
                required: {
                  value: true,
                  message: "không được để trống",
                },
              })}
            />
            <span></span>
            <label>phoneNumber</label>
            {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
          </div>

          <button>Create user</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
