import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await axios.post("/auth/register", {
        email: values.email,
        password: values.password,
      });

      navigate("/login")
    } catch (err) {
      alert(err?.response.data.msg);
    }
  };

  return (
    <div className="bg-gray h-100vh d-flex justify-center align-center">
      <p
        style={{
          position: "absolute",
          top: 20,
          right: window.matchMedia("(max-width: 500px)").matches ? 30 : 50,
          textAlign: "end",
        }}
      >
        Already a member?{" "}
        {window.matchMedia("(max-width: 400px)").matches ? <br /> : ""}
        <Link to="/login" className="bold">
          Login
        </Link>
      </p>
      <div className="w-100">
        <div className="center px-2">
          <Typography.Title
            level={window.matchMedia("(max-width: 400px)").matches ? 3 : 2}
          >
            Get started with Clockify
          </Typography.Title>
          <p className="text-muted">
            Create a free account to start tracking time and supercharge your
            productivity.
          </p>
        </div>
        <Form
          name="normal_login"
          className="login-form mx-auto bg-white px-3 py-3 mt-5 rounded-2 shadow"
          initialValues={{
            remember: true,
          }}
          onFinish={onSubmit}
        >
          <h1 className="mb-3 center">Sign up</h1>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
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
              placeholder="Email"
              type="email"
              className="py-2 px-3"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={
                <LockOutlined
                  className="site-form-item-icon"
                  style={{ fontSize: "18px" }}
                />
              }
              type="password"
              placeholder="Choose a strong password"
              className="py-2 px-3"
            />
          </Form.Item>
          <Form.Item>
            <div className="d-flex justify-between align-center w-100">
              <Form.Item
                name="remember"
                valuePropName="checked"
                noStyle
                className=""
              >
                <Checkbox>I agree to the Terms of Use</Checkbox>
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item className="w-100 center">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button w-100 rounded"
              size="large"
            >
              Create Account
            </Button>
            {/* <p className="my-2">Or</p>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Register Now!
          </Button> */}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Register;
