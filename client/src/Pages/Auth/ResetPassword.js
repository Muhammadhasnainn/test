import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {useResetContext} from "../Auth/ResetContext";

const ResetPassword = () => {
  const { data } = useResetContext();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await axios.put("/auth/resetPassword", {
        email: data.email,
        password: values.password,
      });
      navigate("/login");
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  return (
      <div className="bg-gray h-100vh d-flex justify-center align-center">
        <p
          style={{
            position: "absolute",
            top: 20,
            right: window.matchMedia("(max-width: 500px)").matches ? 30 : 50,
          }}
        >
          <Link to="/login" className="bold">
            Login!
          </Link>
        </p>
        <Form
          name="normal_login"
          className="login-form mx-auto bg-white px-3 py-3 rounded-2 shadow"
          initialValues={{
            remember: true,
          }}
          onFinish={onSubmit}
        >
          <h1 className="mb-3 center">Reset password</h1>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Enter New Password!",
              },
            ]}
          >
            <Input
              prefix={
                <UserOutlined
                  className="site-form-item-icon"
                  style={{ fontSize: "18px" }}
                />
              }
              placeholder="New Password"
              type="number"
              className="py-2 px-3"
            />
          </Form.Item>
          <Form.Item className="w-100 center">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button w-100 rounded"
              size="large"
            >
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
  );
};

export default ResetPassword;
