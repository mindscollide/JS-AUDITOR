import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { TextField, Button, Table } from "../../components/elements";
import { Select, DatePicker } from "antd";
import "./SecurityActivity.css";

const SecurityActivity = () => {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <>
      <Container className="report-user-container">
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <label className="report-user-label">Admin Activity</label>
          </Col>
        </Row>

        <div className="span-user-color">
          <Row className="mt-4 mb-2">
            <Col lg={3} md={3} sm={12}>
              <TextField
                className="text-fields-report"
                placeholder="Action on User"
                labelClass="d-none"
              />
            </Col>
            <Col lg={3} md={3} sm={12}>
              <TextField
                className="text-fields-report"
                placeholder="Action By"
                labelClass="d-none"
              />
            </Col>

            <Col lg={6} md={6} sm={12} className="report-text-field-column">
              <DatePicker
                onChange={onChange}
                placeholder="StartDate"
                className="date-picker-security-left"
              />
              <label className="date-to-security">To</label>
              <DatePicker
                onChange={onChange}
                placeholder="EndDate"
                className="date-picker-security-right"
              />

              <Button
                icon={<i className="icon-refresh user-reset"></i>}
                text="Reset"
                className="user-report-reset"
              />
            </Col>
          </Row>

          <Row className="mt-5 mb-3">
            <Col lg={12} md={12} sm={12} className="report-btm-button-col mt-3">
              <Button
                icon={<i className="icon-download download-btn-icons"></i>}
                text="Download Report"
                className="report-btm-buttons"
              />
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default SecurityActivity;
