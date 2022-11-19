import React, { useEffect, useState } from "react";
import scss from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getAll,
  getAllpri,
  getAlltas,
  getProjectDetails,
  createTask,
} from "modules/List/slices/taskSlices";
import { Select } from "antd";
const { Option } = Select;

const CreateTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const acce = user.accessToken;
  const { taskId } = useParams();

  const {
    data1: tasks,
    getall,
    getallpri,
    getalltas,
  } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(getProjectDetails({ taskId, acce }));
    dispatch(getAll());
    dispatch(getAllpri(taskId));
    dispatch(getAlltas());
    document.body.style.background =
      "linear-gradient(120deg, #2980b9, #8e44ad)";
    return () => {
      document.body.style.background = null;
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      listUserAsign: [],
      taskName: "",
      description: "",
      statusId: "",
      originalEstimate: "",
      timeTrackingSpent: "",
      timeTrackingRemaining: "",
      projectId: taskId,
      typeId: "",
      priorityId: "",
    },
    mode: "onTouched",
  });

  const handleChange1 = (evt) => {
    const type = evt.target.value;
    setValue("statusId", type);
  };

  const handleChange2 = (evt) => {
    const type = evt.target.value;
    setValue("priorityId", type);
  };

  const handleChange3 = (evt) => {
    
    const type = evt.target.value;
    console.log(type);
    setValue("typeId", type);
  };

  const handleChange4 = (evt) => {
    setValue("listUserAsign", evt);
  };

  const onSubmit = async (values) => {
    console.log(values);
    const user = JSON.parse(localStorage.getItem("user"));
    const acces = user.accessToken;
    try {
      await dispatch(createTask({ values, acces })).unwrap();
      navigate(`/task/${taskId}`);
      notification.success({
        message: "tạo task thành công",
      });
      document.body.style.backgroundColor = null;
    } catch (error) {
      notification.error({
        message: "tạo task thất bại",
        description: error,
      });
    }
  };
  function setInput() {
    setValue("statusId", 10);
    setValue("priorityId", 11);
    setValue("typeId", 12);
  }
  return (
    <div className={scss.bg}>
      <div className={scss.title}>
        <div className="col-6 p-5 m-auto bg-white rounded-3">
          <h1 className="text-center">Create Task</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <h6>Task Name</h6>
              <input
                className="rounded-3"
                type="text"
                style={{ width: "100%", padding: "3px 10px" }}
                {...register("taskName", {
                  required: {
                    value: true,
                    message: "không được để trống",
                  },
                })}
              />
              {errors.taskName && (
                <p style={{ color: "red" }}>{errors.taskName.message}</p>
              )}
            </div>

            <div className="row mt-3">
              <div className="col-6">
                <h6>Status</h6>
                <select
                  className="rounded-3 "
                  style={{ display: "block", padding: "3px 10px" }}
                  onChange={handleChange1}
                  {...register("statusId", {
                    required: {
                      value: true,
                      message: "không được để trống",
                    },
                  })}
                >
                  <option value={10}>chọn status</option>
                  {getall?.map((get) => {
                    return (
                      <option key={get.statusId} value={get.statusId}>
                        {get.statusName}
                      </option>
                    );
                  })}
                </select>
                {errors.statusId && (
                  <p style={{ color: "red" }}>{errors.statusId.message}</p>
                )}
              </div>
              <div className="col-3">
                <h6>Priority</h6>
                <select
                defaultValue={"adadiadaaodaod"}
                  placeholder="admaoamdamoadm"
                  className="rounded-3 p-1"
                  style={{ display: "block", padding: "3px 10px" }}
                  onChange={handleChange2}
                  {...register("priorityId", {
                    required: {
                      value: true,
                      message: "không được để trống",
                    },
                  })}
                >
                  <option value={11}>chọn priority</option>
                  {getallpri?.map((getpri) => {
                    return (
                      <option key={getpri.priorityId} value={getpri.priorityId}>
                        {getpri.priority}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-3 ">
                <h6>Task Type</h6>
                <select
                  className="rounded-3 p-1  "
                  style={{ display: "block", padding: "3px 10px" }}
                  onChange={handleChange3}
                  {...register("typeId", {
                    required: {
                      value: true,
                      message: "không được để trống",
                    },
                  })}
                >
                  <option value={12}>chọn typeId</option>
                  {getalltas?.map((gettas) => {
                    return (
                      <option key={gettas.id} value={gettas.id}>
                        {gettas.taskType}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="mt-3">
              <h6>Assignees</h6>
              <Select
                mode="tags"
                style={{
                  width: "100%",
                }}
                placeholder="add user"
                onChange={handleChange4}
              >
                {tasks?.members?.map((task) => {
                  return <Option key={task.userId}>{task.name}</Option>;
                })}
              </Select>
            </div>

            <div className="mt-3">
              <div className="row">
                <div className="col-4">
                  <h6>Original Estimete</h6>
                  <input
                    className={`${scss.inputTime} rounded-3 `}
                   
                    type="text"
                    {...register("originalEstimate", {
                      required: {
                        value: true,
                        message: "không được để trống",
                      },
                    })}
                  />
                  {errors.originalEstimate && (
                    <p style={{ color: "red" }}>
                      {errors.originalEstimate.message}
                    </p>
                  )}
                </div>
                <div className="col-4">
                  <h6>Time Spent</h6>
                  <input
                    className={`${scss.inputTime} rounded-3 `}
                    type="text"
                    {...register("timeTrackingSpent", {
                      required: {
                        value: true,
                        message: "không được để trống",
                      },
                    })}
                  />
                  {errors.timeTrackingSpent && (
                    <p style={{ color: "red" }}>
                      {errors.timeTrackingSpent.message}
                    </p>
                  )}
                </div>
                <div className="col-4">
                  <h6>Time remaining</h6>
                  <input
                   className={`${scss.inputTime} rounded-3 `}
                    type="text"
                    {...register("timeTrackingRemaining", {
                      required: {
                        value: true,
                        message: "không được để trống",
                      },
                    })}
                  />
                  {errors.timeTrackingRemaining && (
                    <p style={{ color: "red" }}>
                      {errors.timeTrackingRemaining.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-3">
              <h6>Decription</h6>
              <textarea
                className="rounded-3"
                rows={5}
                cols={50}
                style={{ width: "100%", padding: "3px 10px" }}
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
            <button className="btn btn-success mt-3">Submit</button>
          </form>
          {setInput()}
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
