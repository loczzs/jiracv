import {
  EditOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Layout, Menu, notification } from "antd";
import { Button, Modal, Space, Table, Tag } from "antd";
import React, { useState, useEffect } from "react";
import scss from "./style.module.scss";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  getAllProject,
  deleteProject,
  getUser,
  assignUserProject,
} from "modules/List/slices/projectSlices";
import { getProjectDetails } from "modules/List/slices/taskSlices";
import { removeUserz } from "modules/List/slices/projectSlices";
import { logout } from "modules/Authentication/slices/authSlice";
import Spiner from "Spiner";

const { Header, Sider, Content, Footer } = Layout;

const { confirm } = Modal;

const ListProject = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: projects,
    listuser: users,
    isLoading,
  } = useSelector((state) => state.project);
  
  const { data1: tasks } = useSelector((state) => state.task);
  

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getAllProject());
  }, []);

  const { handleSubmit, setValue } = useForm({
    defaultValues: {
      projectId: "",
      userId: "",
    },
  });

  const showConfirm = (project, acces) => {
    confirm({
      title: `Do you Want to delete project ${project.projectName}  ?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        handleDelete(project.id, acces);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleDelete = (projectId, acces) => {
    dispatch(deleteProject({ projectId, acces }));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClick1 = () => {
    navigate("/");
  };

  const handleClick2 = () => {
    navigate("/addproject");
  };

  const handleClick3 = () => {
    navigate("/user");
  };

  const handleClick4 = (taskId, acce) => {
    setValue("projectId", taskId);
    dispatch(getProjectDetails({ taskId, acce }));
  };

  const handleClick5 = (acces) => {
    dispatch(getUser(acces));
  };

  const UpdateProject = (projectId) => {
    navigate(`/updateproject/${projectId}`);
  };

  const handleTask = (projectId) => {
    navigate(`/task/${projectId}`);
  };

  const handleChange = (evt) => {
    const type = evt.target.value;
    setValue("userId", type);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const onSubmit = async (values) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const acces = user.accessToken;
    console.log(values);
    try {
      await dispatch(assignUserProject({ values, acces })).unwrap();
      dispatch(getProjectDetails());
      notification.success({
        message: "thêm user thành công",
      });
    } catch (error) {
      notification.error({
        message: "thêm user thất bại",
        description: error,
      });
    }
  };
  const removeUser = (projectId, userId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const acces = user.accessToken;
    dispatch(removeUserz({ values: { projectId, userId }, acces }));
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      render:(_,record)=> <a onClick={()=>handleTask(record.id)} className="text-primary text-decoration-none me-3">{record.projectName}</a>
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (_, record) => {
        let color = "volcano";
        if (record.categoryId === 2) {
          color = "green";
        } else if (record.categoryId === 3) {
          color = "geekblue";
        }
        return (
          <div>
            <Tag color={color} key={record.id}>
              {record.categoryName}
            </Tag>
          </div>
        );
      },
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      render: (_, record) => <span>{record.creator.name}</span>,
    },
    {
      title: "Members",
      dataIndex: "members",
      key: "members",
      render: (_, record) => (
        <div className="row p-3">
          {record.members.map((mem) => {
            return (
              <div style={{ width: "20px", padding: "0" }}>
                <img
                  className={`${scss.img} `}
                  key={mem.userId}
                  src={mem.avatar}
                ></img>
              </div>
            );
          })}
          {user.id === record.creator.id ? (
            <div style={{ width: "20px", padding: "0" }}>
              <button
                className={scss.buttons}
                onClick={() => {
                  showModal();

                  handleClick4(record.id, user.accessToken);
                  handleClick5(user.accessToken);
                }}
              >
                <PlusOutlined />
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {user.id === record.creator.id ? (
            <div>
              <a
                onClick={() => UpdateProject(record.id)}
                className="text-primary text-decoration-none me-3"
              >
                edit
              </a>
              <a
                onClick={() => showConfirm(record, user.accessToken)}
                className="text-primary text-decoration-none me-3"
              >
                Delete
              </a>
            </div>
          ) : (
            <></>
          )}
        </Space>
      ),
    },
  ];
  const modal = [
    {
      title: "Id",
      dataIndex: "userId",
      key: "userId",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render:(_,record)=> <img src={record.avatar} alt="" />
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          
          <a onClick={() => removeUser(tasks.id, record.userId)}  className="text-primary text-decoration-none me-3">Delete</a>
        </Space>
      ),
    },
  ];
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Modal
        title="Members"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
      
        <Table columns={modal} dataSource={tasks?.members} />

        <h4>Add User</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
         <div className="d-flex align-items-center">
         <select  className={scss.selects} onChange={handleChange}>
            <option value="">chọn user</option>
            {users.map((usera) => {
              return (
                <option key={usera.userId} value={usera.userId}>
                  {usera.name}
                </option>
              );
            })}
          </select>
          <button className={scss.buttons}>
            <PlusOutlined />
          </button>
         </div>
        </form>
      </Modal>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <h1 className="text-white text-center">JIRA</h1>
        <Menu
          // className="mt-5"
          theme="dark"
          mode="inline"
        />

        <div style={{ marginTop: "70px" }}>
          <div
            style={{ background: "#66cc99" }}
            className={scss.iho}
            onClick={() => handleClick1()}
          >
            <UploadOutlined />

            <span style={{ marginLeft: "6px" }}>Projet List</span>
          </div>
          <div className={scss.iho} onClick={() => handleClick2()}>
            <VideoCameraOutlined />
            <span style={{ marginLeft: "6px" }}>Create Project</span>
          </div>
          <div className={scss.iho} onClick={handleClick3}>
            <UserOutlined />

            <span style={{ marginLeft: "6px" }}>User List</span>
          </div>
        </div>
      </Sider>
      <Layout>
        <Header style={{ background: "white", padding: "0px" }}>
          <h1 style={{ padding: "0 0 0 50px" }}>Project Management</h1>
          {user ? (
            <div className={scss.head}>
              <div className={scss.anpha}>
                <span>
                  <UserOutlined />
                </span>
                <strong>{user.name}</strong>
              </div>
              <div className={scss.beta}>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          ) : null}
        </Header>

        <Content
          style={{
            margin: "24px 16px 0",
            background: "white",
          }}
        >
          <Table columns={columns} dataSource={[...projects].reverse()} />
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ListProject;
