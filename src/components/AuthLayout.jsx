import React from "react";
import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";
import scss from "./style.module.scss";

const AuthLayout = () => {
  return (
    <Row>
      <Col span={12}>
        <div className={scss.img}>
        </div>
      </Col>
      <Col span={12}>
        <Outlet />
      </Col>
    </Row>
  );
};

export default AuthLayout;