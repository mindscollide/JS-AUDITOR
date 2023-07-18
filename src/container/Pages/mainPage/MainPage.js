import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Header from "../../../components/layout/Header/Header";
import Sidebar from "../../../components/layout/Sidebar/Sidebar";

const MainPage = () => {
  return (
    <Fragment>
      <Row>
        <Col sm={12} md={12} lg={12}>
          <Header />
        </Col>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <Row>
              <Col
                sm={12}
                md={12}
                lg={12}
                style={{
                  width: "100%",
                }}
                className="d-flex gap-4"
              >
                <Sidebar />
                <Outlet />
              </Col>
            </Row>
          </Col>
        </Row>
      </Row>
    </Fragment>
  );
};

export default MainPage;
