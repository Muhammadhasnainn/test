import {
  MenuOutlined,
  UploadOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Dropdown, Layout, Menu, theme } from "antd";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Contexts/AuthContext";
import { useSettingsContext } from "../../Contexts/SettingsContext";
import Routess from "../../Routes";
const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const { settings } = useSettingsContext();
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const Logout = () => {
    Cookies.remove("token");
    setUser(null);
    navigate("/login");
  };

  const items = [
    {
      key: "1",
      label: <Link to={"/profile"} style={{fontSize: "1.05rem"}}>Profile Settings</Link>,
    },
    {
      key: "2",
      label: <Link to={"/change_password"} style={{fontSize: "1.05rem"}}>Change Password</Link>,
    },
    {
      key: "3",
      label: <p onClick={Logout} style={{fontSize: "1.05rem"}}>Log out</p>,
    },
  ];

  return (
    <>
      <Header
        style={{
          padding: "0 15px",
          background: colorBgContainer,
          height: "50px",
        }}
        className="d-flex align-center justify-between"
      >
        <div  className="d-flex align-center justify-between">
          {React.createElement(MenuOutlined, {
            className: "trigger",
            style: { fontSize: "1.4rem", marginLeft: "10px", color: "#666" },
            onClick: () => setCollapsed(!collapsed),
          })}
          <img
            src={settings?.logo}
            alt="logo"
            loading="lazy"
            className="ms-5"
            style={{ height: "60%" }}
          />
        </div>
        <div className="d-flex align-center">
          <p>{user?.email}</p>

          <Dropdown
            menu={{
              items,
            }}
          >
            <div className="ms-3">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "gainsboro",
                  height: "45px",
                  width: "45px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              >
                PR
              </div>
            </div>
          </Dropdown>
        </div>
      </Header>
      <Layout className="h-100vh">
        <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
          <div className="logo" />
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onClick={(item) => {
            navigate(item.key);
          }}
            items={[
              {
                key: "/",
                icon: (
                  <ClockCircleOutlined
                    style={{ fontSize: "1.2rem", color: "#666" }}
                  />
                ),
                label: "TIME TRACKER",
                
              },
              {
                key: "/calendar",
                icon: (
                  <CalendarOutlined
                    style={{ fontSize: "1.2rem", color: "#666" }}
                  />
                ),
                label: "CALENDAR",
              },
              {
                key: "/random",
                icon: (
                  <UploadOutlined
                    style={{ fontSize: "1.2rem", color: "#666" }}
                  />
                ),
                label: "nav 3",
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              width: "95%",
            }}
          >
            <Routess />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default Dashboard;
