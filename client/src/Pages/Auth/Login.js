import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../Contexts/AuthContext";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import googleOneTap from "google-one-tap";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const options = {
    client_id:
      "695802779040-5i3sg98etcsljlf2m9kqf7d3npltek5f.apps.googleusercontent.com", // required
    auto_select: false, // optional
    cancel_on_tap_outside: false, // optional
    context: "signin", // optional
  };

  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await axios.post(
        "/auth/login",
        { email: values.email, password: values.password }
      );
      if (data.success) {
        var decoded = jwt_decode(data.authToken);
        if (!decoded.user.isAdmin) {
          Cookies.set("token", data.authToken);
          setUser(decoded?.user);
          navigate("/");
        } else {
          alert("Something went wrong!");
        }
      } else {
        alert("Something went wrong!");
      }
    } catch (err) {
      alert(err?.response.data.msg);
    }
  };

  useEffect(() => {
    if (!user) {
      googleOneTap(options, async (response) => {
        const res = await fetch("/auth/google-login", {
          method: "POST",
          body: JSON.stringify({
            token: response.credential,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setUser(data);
        Cookies.set("token", response.credential);
      });
    }
  }, []);

  const handleGoogle = async (response) => {
    console.log(response);
    const res = await fetch("/auth/google-login", {
      method: "POST",
      body: JSON.stringify({
        token: response.credential,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setUser(data);
    Cookies.set("token", response.credential);
  };

  if (user) return <Navigate to="/" />;

  return (
    <div className="bg-gray h-100vh d-flex justify-center align-center">
      <p
        style={{
          position: "absolute",
          top: 20,
          right: window.matchMedia("(max-width: 500px)").matches ? 20 : 50,
          textAlign: "end",
        }}
      >
        Don't have an account?{" "}
        {window.matchMedia("(max-width: 400px)").matches ? <br /> : ""}
        <Link to="/register" className="bold">
          Register now!
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
        <h1 className="mb-3 center">Login</h1>
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
            placeholder="Password"
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
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link to={"/forgot"} className="login-form-forgot">
              Forgot password
            </Link>
          </div>
        </Form.Item>

        <Form.Item className="w-100 center">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button w-100 rounded"
            size="large"
          >
            Log in
          </Button>
          <p className="my-2">Or</p>
          <GoogleLogin
            onSuccess={(credentialResponse) => handleGoogle(credentialResponse)}
            onError={() => {
              console.log("Login Failed");
            }}
            width={380}
            size="large"
          />
          {/* <FacebookLogin
            appId="1088597931155576"
            autoLoad={true}
            fields="name,email,picture"
            // onClick={componentClicked}
            callback={responseFacebook}
          />
          , */}
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
