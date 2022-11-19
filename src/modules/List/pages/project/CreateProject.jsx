import React, { useEffect } from "react";
import scss from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  createProjectAuthorize,
  ProjectCategory,
} from "modules/List/slices/projectSlices";

const CreateProject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list: aliass } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(ProjectCategory());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      projectName: "",
      description: "",
      categoryId: "",
      alias: "",
    },
    mode: "onTouched",
  });

  const handleChange = (evt) => {
    const type = evt.target.value;
    setValue("categoryId", type);
  };

  const onSubmit = async (values) => {
    console.log(values);
    const user = JSON.parse(localStorage.getItem("user"));
    const acce = user.accessToken;
    try {
      await dispatch(createProjectAuthorize({ values, acce })).unwrap();
      navigate("/");
      notification.success({
        message: "tạo project thành công",
      });
    } catch (error) {
      notification.error({
        message: "tạo project thất bại",
        description: error,
      });
    }
  };
  return (
    <div className={scss.title}>
      <div className={scss.center}>
        <h1 className={scss.h1}>Create Project</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={scss.form}>
          <div className={scss.field}>
            <input
              type="text"
              {...register("projectName", {
                required:true,
                
                maxLength: 15,
              })}
            />
            <span></span>
            <label>Name</label>
            {errors.projectName?.type === "required" && (
              <p style={{ color: "red" }}>không được để trống</p>
            )}
            {errors.projectName?.type === "maxLength" && (
              <p style={{ color: "red" }}>không vượt quá 15 kí tự</p>
            )}
          </div>
          <div>
            <textarea
              cols={63}
              rows={8}
              placeholder="Description..."
              {...register("description", {
                required: {
                  value: true,
                  message: "không được để trống",
                },
              })}
            />
            {errors.description && (
              <p style={{ color: "red" }}>{errors.description.message}</p>
            )}
          </div>
          <label htmlFor="">chọn dự án</label>
          <select
            style={{ display: "block" }}
            onChange={handleChange}
            {...register("categoryId", {
              validate: value => value !== ""
            })}
          >
            <option value="">chọn dự án</option>
            {aliass?.map((alia) => {
              return (
                <option key={alia.id} value={alia.id}>
                  {alia.projectCategoryName}
                </option>
              );
            })}
          </select>
          {errors.categoryId?.type === "validate" && (
            <p style={{ color: "red" }}>vui lòng chọn lại</p>
          )}
          <button>Create Project</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
