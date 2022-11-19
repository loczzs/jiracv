import {
  EditOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Space, Table ,notification} from "antd";
import React, { useState, useEffect } from "react";
import scss from "../project/style.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUser,
  getdetailUser,
} from "modules/List/slices/userSlices";
import { Button, Modal } from "antd";

const { Header, Sider, Content, Footer } = Layout;
const { confirm } = Modal;

const ListUser = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const { users, isLoading } = useSelector((state) => state.user);
  console.log(users);
  const dispatch = useDispatch();

  const userz = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  const showConfirm = (user) => {
    confirm({
      title: `Do you Want to delete user ${user.name} ?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        handleDelte(user.userId);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleDelte = async (userIds) => {
    
    try{
      await dispatch(deleteUser({ userId: userIds, acc: userz.accessToken })).unwrap();
      notification.success({
        message: "xoá user thành công",
      });
    } catch(error){
      notification.error({
        message: "xoá user thất bại",
        description:error
      });

    }
  };
  const handleSelect = (user) => {
    localStorage.setItem("userdetail", JSON.stringify(user));
    navigate(`/user/${user.userId}`);
  };
  const columns = [
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
         <a onClick={() => handleSelect(record)} className="text-primary text-decoration-none me-3">Edit</a>
          <a onClick={() => showConfirm(record)} className="text-primary text-decoration-none me-3">Delete</a>
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
           
          >
            <UserOutlined />

            <span style={{ marginLeft: "6px" }}>User List</span>
          </div>
          <div className={scss.iho} onClick={() => {
            navigate("/CreateUser");
          }}>
            <VideoCameraOutlined />
            <span style={{ marginLeft: "6px" }}>Create User</span>
          </div>
          <div className={scss.iho} onClick={()=>{
            navigate("/");
          }}>
           
            <UploadOutlined />

            <span style={{ marginLeft: "6px" }}>Project List</span>
          </div>
        </div>
      </Sider>
      <Layout>
        <Header
          style={{ background: "white", padding: "0px", textAlign: "center" }}
        >
          <h1>USER LIST</h1>
        </Header>

        <Content
          style={{
            margin: "24px 16px 0",
            background: "white",
          }}
        >
          {/* <table className="table table-striped">
            <thead>
              <tr>
                <th>Id</th>
                <th>avatar</th>
                <th>name</th>
                <th>email</th>
                <th>phoneNumber</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users
                ?.map((user) => {
                  return (
                    <tr key={user.userId}>
                      <td>{user.userId}</td>
                      <td>
                        <img src={user.avatar} alt="" />
                      </td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => handleSelect(user)}
                        >
                          update
                        </button>
                        <Button
                          className="btn btn-danger"
                          onClick={() => showConfirm(user.userId)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })
                .reverse()}
            </tbody>
          </table> */}
          <Table columns={columns} dataSource={[...users].reverse()} />;
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

export default ListUser;
