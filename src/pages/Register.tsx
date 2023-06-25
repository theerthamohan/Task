import { Button, Form, Input, notification } from "antd";
import React from "react";
import { TRegister } from "../features/types";
import { useNavigate } from "react-router";
import { NotificationPlacement } from "antd/es/notification/interface";

const Register = () => {
  const [form] = Form.useForm<TRegister>();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const handleRegister = async () => {
    const values = await form.validateFields();
    localStorage.setItem("usename", values.email);
    localStorage.setItem("password", values.password);
    values && navigate("/login");
  };

  return (
    <div className="register-container">
      <div className="register">
        <Form form={form}>
          <h2 style={{ textAlign: "center" }}>Register</h2>
          <div style={{ margin: "0px 20px" }}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Email is not a valid email",
                },
              ]}
            >
              <Input type="email" placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Password required" }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
          </div>
          <div style={{ margin: "0px 20px" }}>
            <Button
              style={{
                width: "100%",
                backgroundColor: "#0d73c1",
                color: "#fff",
              }}
              onClick={() => {
                handleRegister();
              }}
            >
              Register
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
