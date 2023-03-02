import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOTP = () => {
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await axios.post(
        `/auth/verifyotp?code=${values.otp}`
      );
      navigate("/reset");
    } catch (err) {
      console.log(err);
      alert("wrong code!");
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
        <h1 className="mb-3 center">Verify OTP</h1>
        <Form.Item
          name="otp"
          rules={[
            {
              required: true,
              message: "Enter OTP!",
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
            placeholder="Enter OTP"
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
            Verify
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VerifyOTP;
