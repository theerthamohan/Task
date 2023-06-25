import { Button, Form, Input, notification } from "antd";
import React, { useState } from "react";
import { TLogin, TRegister } from "../features/types";
import { useNavigate } from "react-router";
import { NotificationPlacement } from "antd/es/notification/interface";

const Login = () => {
  const [form] = Form.useForm<TLogin>();
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const handleLogin = async () => {
    const values = await form.validateFields();
    const userName = localStorage.getItem("usename");
    const password = localStorage.getItem("password");
    if (userName === values.email && password === values.password) {
      setAuthenticated(true);
      navigate("/tasklist");
    } else {
      openNotification("top");
    }
  };

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: "Invalid",
      description: "Incorrect username or password",
      placement,
    });
  };

  return (
    <>
      {contextHolder}
      <div className="login-container">
        <div className="login">
          <Form form={form}>
            <h2 style={{ textAlign: "center" }}>Login</h2>
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
                onClick={() => handleLogin()}
              >
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
