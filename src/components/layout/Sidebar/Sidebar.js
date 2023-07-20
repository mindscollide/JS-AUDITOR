import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Nav, Container, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import JohnCater from "../../../assets/images/profile3.png";
import { Button, TextField } from "../../../components/elements";
import Users from "../../../assets/images/Assignees-Icon.png";
import Broadcast from "../../../assets/images/6.png";
import "./Sidebar.css";
import { LayoutContext } from "antd/es/layout/layout";

const Sidebar = () => {
  const navigate = useNavigate();
  const { SubMenu } = Menu;
  const { Sider } = Layout;

  let defaultOpenKey = localStorage.getItem("defaultOpenKey ");
  let defaultSelectedKey = localStorage.getItem("defaultSelectedKey");
  console.log("defaultOpenKey", defaultOpenKey);
  console.log("defaultSelectedKey", defaultSelectedKey);

  const navigateToAudit = () => {
    localStorage.setItem("defaultOpenKey", "sub1");
    localStorage.setItem("defaultSelectedKey", "3");
    navigate("/JS/AuditTrial");
  };

  const navigateToSecurity = () => {
    localStorage.setItem("defaultOpenKey", "sub1");
    localStorage.setItem("defaultSelectedKey", "4");
    navigate("/JS/SecurityActivity");
  };

  const navigateToTradeCount = () => {
    localStorage.setItem("defaultOpenKey", "sub1");
    localStorage.setItem("defaultSelectedKey", "5");
    navigate("/JS/TradeCount");
  };

  // useEffect(() => {
  //   navigate("/JS/AuditTrial");
  // }, []);

  return (
    <Fragment>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <Layout>
            <Sider width={250} className="js-sidebar">
              <Menu
                theme="light"
                mode="inline"
                className="Menu-sidebar-class"
                defaultOpenKeys={[defaultOpenKey]}
                defaultSelectedKeys={[defaultSelectedKey]}
              >
                <SubMenu
                  key="sub1"
                  icon={<i className="icon-file menu-icons"></i>}
                  title="Audit Trial"
                  className="submenu-sidebar-icons"
                >
                  <Menu.Item
                    className="menu-items-sidebar"
                    key="3"
                    onClick={navigateToAudit}
                  >
                    Audit Trial
                  </Menu.Item>
                  <Menu.Item
                    className="menu-items-sidebar"
                    key="4"
                    onClick={navigateToSecurity}
                  >
                    Security Admin Activity
                  </Menu.Item>
                  <Menu.Item
                    className="menu-items-sidebar"
                    key="5"
                    onClick={navigateToTradeCount}
                  >
                    Trade Count
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
          </Layout>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Sidebar;
