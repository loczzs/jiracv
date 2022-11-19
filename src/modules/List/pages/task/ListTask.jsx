import {
  EditOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  ProfileOutlined,
  ReloadOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Button, Modal, Space } from "antd";
import React, { useState, useEffect } from "react";
import scss from "./style.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjectDetails,
  getAllComment,
  insertComment,
  deleteComment,
  updateComment,
} from "modules/List/slices/taskSlices";
import { removeTaskz } from "modules/List/slices/taskSlices";
import { updateTasks } from "modules/List/slices/taskSlices";
import { render } from "@testing-library/react";
import { Alert } from "bootstrap";
const { Header, Sider, Content,Footer } = Layout;
const { confirm } = Modal;

const ListProject = () => {
  const [open, setOpen, collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  const acces = user.accessToken;
  const [rederbut, setRenderbut] = useState(false);
  const { taskId } = useParams();
  localStorage.setItem("projecidjira", JSON.stringify(taskId));
  const { data1: tasks, comment } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(getProjectDetails({ taskId, acces }));
  }, []);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      id: "",
      taskId: "",
      contentComment: "",
    },
  });

  const showModalb = (a) => {
    dispatch(getAllComment(a));
    setValue("taskId", a);
    setOpen(true);
  };

  const handleOkb = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setOpen(false);
    setConfirmLoading(false);
  };

  const handleCancelb = () => {
    setRenderbut(false);
    setOpen(false);
    setValue("contentComment", " ");
    setValue("id", "");
  };

  const UpdateTask = (taskId) => {
    navigate(`/task/updatetask/${taskId}`);
  };

  const showConfirm = (taskIds, acce, taskId) => {
    confirm({
      title: 'Do you Want to delete task ?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        handleDelete(taskIds, acce, taskId)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleDelete = (taskIds, acce, taskId) => {
    dispatch(removeTaskz({ taskIds, acce, taskId }));
  };

  const handleClick1 = (taskId) => {
    navigate(`/task/${taskId}/addtask`);
  };

  const handleDeleteComment = (commentId, acces, taskId) => {
    dispatch(deleteComment({ commentId, acces, taskId }));
  };

  const onSubmit = async (values) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const acces = user.accessToken;
    try {
      if (values.id === "") {
        dispatch(insertComment({ values, acces }));
        setValue("contentComment", " ");
        notification.success({
          message: "thêm comment thành công",
        });
      } else {
        dispatch(updateComment({ values, acces }));
      }
    } catch (error) {
      notification.error({
        message: "thêm comment thất bại",
        description: error,
      });
    }
  };
  const handleGetdetail = (comment) => {
    setRenderbut(true);
    setValue("contentComment", comment.contentComment);
    setValue("id", comment.id);
  };

  const handleClick2 = () =>{
    navigate("/")
  }
  return (
    <Layout style={{height:"100vh"}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={scss.logo} />
        <div className={scss.iho} onClick={() => handleClick2()}>
          <UserOutlined className={scss.icon} />
          <a style={{ color: "white" }}>Project List</a>
        </div>
        <div className={scss.iho} onClick={() => handleClick1(taskId)}>
          <VideoCameraOutlined className={scss.icon} />
          <a style={{ color: "white" }}>Create Task</a>
        </div>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            background: "#fff",
            fontSize: 20,
          }}
        >
          <h1 style={{ padding: "0 0 0 50px" }}>Task Management</h1>
        </Header>
        <Content
          className="site-layout-background"
         
        >
          <div className="container pb-3">
            <div className="row">
              {tasks?.lstTask?.map((task) => {
                return (
                  <div key={task.statusId} className="col-3 ">
                    <div className="bg-dark text-white p-1 rounded-3  ">
                      <p className="ms-1">{task.statusName}</p>

                      <div>
                        {task.lstTaskDeTail.map((lstTask) => {
                          return (
                            <div
                              style={{ borderRadius: "10px" }}
                              className="row bg-white ms-0 me-0 pb-3   mb-3"
                            >
                              <div
                                className="col-sm-12 pe-1  "
                                key={lstTask.taskId}
                                style={{ margin: "10px 0", color: "red" }}
                              >
                                <div width={"100%"}>
                                  <span> TASK NAME: {lstTask.taskName}</span>
                                </div>
                                <div width={"100%"} className="mt-3">
                                  <span>
                                    {" "}
                                    DESCRIPTION: {lstTask.description}
                                  </span>
                                </div>
                                <div className="row mt-3">
                                  <div className="col-sm-12">
                                    {lstTask.priorityTask.priority}
                                  </div>
                                  <div className="col-sm-12 mt-3 row">
                                    {lstTask.assigness.map((assignes) => {
                                      return (
                                        <div className="col-sm-2">
                                          <img
                                            className={scss.img}
                                            src={assignes.avatar}
                                            alt=""
                                          />
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-12 mt-1">
                                <div
                                  style={{ justifyContent: "space-around" }}
                                  className="row"
                                >
                                  <button
                                    className="btn btn-success   col-sm-3"
                                    onClick={() => UpdateTask(lstTask.taskId)}
                                  >
                                    Update
                                  </button>
                                  <button
                                    className="btn btn-primary  col-sm-4"
                                    onClick={() => showModalb(lstTask.taskId)}
                                  >
                                    Comment
                                  </button>
                                  <button
                                    className="btn btn-danger col-sm-4"
                                    onClick={() =>
                                      showConfirm(
                                        lstTask.taskId,
                                        user.accessToken,
                                        taskId
                                      )
                                    }
                                  >
                                    DELETE
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Modal
              title="Comments"
              open={open}
              onOk={handleOkb}
              confirmLoading={confirmLoading}
              onCancel={handleCancelb}
            >
              <div className={scss.text1}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <textarea
                    cols="70"
                    rows="5"
                    placeholder="Comment..."
                    {...register("contentComment")}
                  />
                  {rederbut ? (
                    <button>Update</button>
                  ) : (
                    <button>comment</button>
                  )}
                </form>
              </div>
              <div className={scss.text2}>
                <div className="row">
                  {comment.map((com) => {
                    return (
                      <div className="row">
                        <div className="col-sm-2">
                          <span>
                            <img src={com.user.avatar} alt="" />
                          </span>
                        </div>
                        <div className="col-sm-4 ps-0 pe-0">
                          <p className="mt-1">{com.contentComment}</p>
                        </div>

                        <div className="col-sm-6">
                          <button
                            onClick={() => {
                              handleGetdetail(com);
                            }}
                          >
                            <EditOutlined />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteComment(com.id, acces, com.taskId)
                            }
                          >
                            <DeleteOutlined />
                          </button>
                          {rederbut ? (
                            <button
                              onClick={() => {
                                setRenderbut(false);

                                setValue("contentComment", "");
                                setValue("id", "");
                              }}
                              style={{ backgroundColor: "red" }}
                            >
                              <ReloadOutlined />
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Modal>
          </div>
        </Content>
        <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2018 Created by Ant UED
      </Footer>
       
      </Layout>
      
    </Layout>
   
);
  
};

export default ListProject;
