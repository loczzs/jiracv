import React, { useEffect } from "react";
import scss from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjectDetail,
  updateProjects,
  ProjectCategory,
} from "modules/List/slices/projectSlices";
import { useParams } from "react-router-dom";

const UpdateProject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const acce = user.accessToken;

  const { update: projects, list: aliass } = useSelector(
    (state) => state.project
  );

  const creatorId = projects.creator?.id;

  useEffect(() => {
    dispatch(getProjectDetail({ projectId, acce }));
    dispatch(ProjectCategory());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      id: projects.id,
      projectName: "",
      creator: creatorId,
      description: "",
      categoryId: "",
    },
    mode: "onTouched",
  });

  const setInput = () => {
    setValue("projectName", projects?.projectName);
    setValue("description", projects?.description);
    setValue("categoryId",projects?.projectCategory?.id)
  };

  const handleChange = (evt) => {
    const type = evt.target.value;
    setValue("categoryId", type);
  };

  const onSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const acce = user.accessToken;
      await dispatch(updateProjects({ values, projectId, acce })).unwrap();
      navigate("/");
      notification.success({
        message: "update project thành công",
      });
    } catch (error) {
      notification.error({
        message: "update project thất bại",
        description: error,
      });
    }
  };
  return (
    <div className={scss.title}>
      <div className={scss.center}>
        <h1 className={scss.h1}>Update Project</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={scss.form}>
          <div className={scss.field}>
            <input
              type="text"
              {...register("projectName", {
                required: {
                  value: true,
                  message: "không được để trống",
                },
              })}
            />
            <span></span>
            <label>Name</label>
            {errors.projectName && (
              <p style={{ color: "red" }}>{errors.projectName.message}</p>
            )}
          </div>
          <div className={scss.diss}>
            <label htmlFor="">Description</label>
            <textarea
              rows={8}
              cols={63}
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
          <div className={scss.diss}>
            <label htmlFor="">Chọn dự án</label>
            <select
              style={{ display: "block" }}
              onChange={handleChange}
              {...register("categoryId", {
                required: {
                  value: true,
                  message: "Chọn dự án",
                },
              })}
            >
              <option>chọn dự án</option>
              {aliass?.map((alia) => {
                return (
                  <option key={alia.id} value={alia.id}>
                    {alia.projectCategoryName}
                  </option>
                );
              })}
            </select>
            {errors.categoryId && (
              <p style={{ color: "red" }}>{errors.categoryId.message}</p>
            )}
          </div>
          <button>Update Project</button>
        </form>
        {setInput()}
      </div>
    </div>
  );
};

export default UpdateProject;
