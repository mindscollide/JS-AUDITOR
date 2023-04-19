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

const Sidebar = () => {
  const navigate = useNavigate();
  const { SubMenu } = Menu;
  const { Sider } = Layout;

  const navigateToAudit = () => {
    navigate("/Audit");
  };

  const navigateToSecurity = () => {
    navigate("/SecurityActivity");
  };

  return (
    <Fragment>
      <Row className="sidebar-row">
        <Col className="js-sidebar">
          <Layout>
            <Sider width={250}>
              <div className="logo" />
              <Menu
                theme="light"
                defaultSelectedKeys={["1"]}
                mode="inline"
                className="Menu-sidebar-class"
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
