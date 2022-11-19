import React, { useEffect, useState } from "react";
import scss from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjectDetails,
  getTaskDetail,
  updateTasks,
  getAll,
  getAllpri,
  getAlltas,
} from "modules/List/slices/taskSlices";
import { Select } from "antd";
const { Option } = Select;

const CreateTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const [selEct, setsElect] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const acce = user.accessToken;

  const {
    data1: taskss,
    updatetask: task1,
    getall,
    getallpri,
    getalltas,
    listMemberz,
  } = useSelector((state) => state.task);

  const b = task1?.assigness;
  const [listMember, setList] = useState(b);
  const lisZz2 = listMember?.map((item) => {
    return `${item.id}`;
  });

  const taskIds = taskss.id;

  const taskIdss = JSON.parse(localStorage.getItem("projecidjira"));

  useEffect(() => {
    dispatch(getProjectDetails({ taskId: taskIdss, acce }));
    dispatch(getTaskDetail({ taskId, acce }));
    dispatch(getAll());
    dispatch(getAllpri(taskId));
    dispatch(getAlltas());
    document.body.style.background = "linear-gradient(120deg, #2980b9, #8e44ad)";
    return()=>{
      document.body.style.background = null
    }
  }, []);

  useEffect(() => {
    setList(b);
  }, [b]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      listUserAsign: [],
      taskId: +taskId,
      taskName: "",
      description: "",
      statusId: "",
      originalEstimate: "",
      timeTrackingSpent: "",
      timeTrackingRemaining: "",
      projectId: taskIds,
      typeId: "",
      priorityId: "",
    },
    mode: "onTouched",
  });
  const deleteMember = (evt, item) => {
    evt.preventDefault();
    const filMember = listMember.filter((itemz) => {
      return itemz.id !== item;
    });
    setList(filMember);
  };

  const setInput = () => {
    setValue("taskName", task1?.taskName);
    setValue("originalEstimate", task1?.originalEstimate);
    setValue("timeTrackingSpent", task1?.timeTrackingSpent);
    setValue("timeTrackingRemaining", task1?.timeTrackingRemaining);
    setValue("description", task1?.description);
    setValue("priorityId", task1?.priorityTask?.priorityId);
    setValue("typeId", task1?.typeId);
    setValue("statusId", task1?.statusId);
    setValue("listUserAsign", lisZz2);
  };
  const handleChange4 = (evt) => {

    setValue("listUserAsign", lisZz2.concat(evt));
  };
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
    setValue("typeId", type);
  };

  const onSubmit = async (values) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const acces = user.accessToken;
    try {
      await dispatch(updateTasks({ values, acces })).unwrap();
      navigate(`/task/${taskIds}`);
      notification.success({
        message: "update task thành công",
      });
    } catch (error) {
      notification.error({
        message: "update task thất bại",
        description: error,
      });
    }
  };

  return (
    <div className={scss.title}>
      <div className="col-6 p-5 m-auto bg-white rounded-3">
        <h1 className="text-center">Update Task</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <h6>Task Name</h6>
            <input
              className="rounded-3"
              type="text"
              style={{ width: "100%", padding: "3px 10px" }}
              value={task1?.taskName}
            />
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
                <option>chọn status</option>
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
                <option>chọn priority</option>
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
                <option>chọn typeId</option>
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
            <h6>Assignees :</h6>
            <div className="row mt-1  ">
              {listMember?.map((item) => {
                return (
                  <div key={item.id} className="col-sm-3 pe-none   ">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      className="btn bg-dark text-white w-100"
                    >
                      <span style={{wordWrap:"break-word"}} className="me-1 col-sm-8">{item.name}</span>
                      <button
                        className={`${scss.X} col-sm-4`}
                        onClick={(evt) => deleteMember(evt, item.id)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={(evt) => {
                evt.preventDefault();
                setsElect(!selEct);
              }}
              className="bg-white mt-3 border-0 text-success fw-bolder"
            >
              Add More +{" "}
            </button>
            {selEct ? (
              <Select
                className="rounded-3 mt-1"
                mode="tags"
                allowClear
                style={{ width: "100%" }}
                placeholder="Add more +"
                onChange={handleChange4}
              >
                {taskss?.members
                  ?.filter((mem) => {
                    let index = listMember?.findIndex(
                      (us) => us.id === mem.userId
                    );
                    if (index !== -1) {
                      return false;
                    }
                    return true;
                  })
                  .map((mem, index) => {
                    return (
                      <Option value={mem.userId} key={mem.userId}>
                        {mem.name}
                      </Option>
                    );
                  })}
              </Select>
            ) : (
              " "
            )}
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
  );
};

export default CreateTask;
