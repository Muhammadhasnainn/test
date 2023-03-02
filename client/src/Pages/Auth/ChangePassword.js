import { Form, Input, Button, Typography } from "antd";
import axios from "axios";
import React from "react";
import { useAuthContext } from "../../Contexts/AuthContext";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const { user } = useAuthContext();

  const onSubmit = async (values) => {
    if (values.newpassword === values.confirmpassword) {
      try {
        await axios.put("/api/auth/changepassword", {
          email: user.email,
          oldpassword: values.oldpassword,
          newpassword: values.newpassword,
        });

        alert("Successfully Changed!");

        form.resetFields()
      } catch (err) {
        alert(err?.response?.data.msg);
      }
    } else {
      alert("Password does't matches");
    }
  };

  return (
    <Form
      form={form}
      className="mx-auto bg-white px-3 py-3 rounded-2 shadow"
      onFinish={onSubmit}
    >
      <Form.Item
        name="oldpassword"
        rules={[
          {
            required: true,
            message: "Please enter your old password!",
          },
        ]}
      >
        <div className="d-flex align-center">
          <Typography.Paragraph level={2} className="w-25 mb-0">
            Old Password
          </Typography.Paragraph>
          <Input
            placeholder="Old Password"
            type="password"
            className="py-2 px-3 mt-1 w-50"
          />
        </div>
      </Form.Item>

      <Form.Item
        name="newpassword"
        rules={[
          {
            required: true,
            message: "Please enter your new password!",
          },
        ]}
      >
        <div className="d-flex align-center">
          <Typography.Paragraph level={2} className="w-25 mb-0">
            New Password
          </Typography.Paragraph>
          <Input
            placeholder="New Password"
            type="password"
            className="py-2 px-3 mt-1 w-50"
          />
        </div>
      </Form.Item>

      <Form.Item
        name="confirmpassword"
        rules={[
          {
            required: true,
            message: "Please confirm your new password!",
          },
        ]}
      >
        <div className="d-flex align-center">
          <Typography.Paragraph level={5} className="w-25 mb-0">
            Confirm Password
          </Typography.Paragraph>
          <Input
            placeholder="Confirm Password"
            type="password"
            className="py-2 px-3 mt-1 w-50"
          />
        </div>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button rounded"
        >
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePassword;
