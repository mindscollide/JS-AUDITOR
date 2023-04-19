import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { TextField, Button, Table } from "../../../components/elements";
import { Select, DatePicker, Space } from "antd";
import "./Audittrial.css";

const AuditTrial = () => {
  const columns = [
    {
      title: <label className="bottom-table-header">LoginID</label>,
      dataIndex: "login",
      key: "login",
      width: "200px",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">First Name</label>,
      dataIndex: "firstname",
      key: "firstname",
      width: "100px",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Last Name</label>,
      dataIndex: "lastname",
      key: "lastname",
      width: "100px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Role</label>,
      dataIndex: "role",
      key: "role",
      width: "150px",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Status</label>,
      dataIndex: "status",
      key: "status",
      width: "100px",
      align: "center",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Edit</label>,
      dataIndex: "edit",
      key: "edit",
      width: "100px",
      align: "center",
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
  ];

  const data = [
    {
      login: "Mindscollide.aamir@hbl.com",
      firstname: "Mohammad",
      lastname: "Aamir",
      role: "Data Entry - Business Team",
      status: (
        <>
          <i className={"icon-check check-status"}></i>
        </>
      ),
      edit: <i className={"icon-edit userEdit-edit-icon"}></i>,
    },
    {
      login: "Mindscollide.aamir@hbl.com",
      firstname: "Mohammad",
      lastname: "Aamir",
      role: "Data Entry - Business Team",
      status: (
        <>
          <i className={"icon-lock locked-status"}></i>
        </>
      ),
      edit: <i className={"icon-edit userEdit-edit-icon"}></i>,
    },
  ];

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <>
      <Container className="edit-user-container">
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <label className="edit-user-label">Audit Trial</label>
          </Col>
        </Row>

        <div className="span-edit-user">
          <Row className="mt-3">
            {/* <Col lg={12} md={12} sm={12} className="text-field-column"> */}
            <Col lg={3} md={3} sm={12}>
              <TextField
                className="text-fields-edituser"
                placeholder="Reference Number"
              />
            </Col>
            <Col lg={3} md={3} sm={12}>
              <TextField
                className="text-fields-edituser"
                placeholder="MYSIS Customer Code"
              />
            </Col>
            <Col lg={3} md={3} sm={12}>
              <TextField
                className="text-fields-edituser"
                placeholder="Action By"
              />
            </Col>
            <Col lg={3} md={3} sm={12}>
              <Select className="select-field-edit" placeholder="Select Role" />
            </Col>
            {/* </Col> */}
          </Row>

          <Row>
            <Col lg={5} md={5} sm={12}>
              <DatePicker
                onChange={onChange}
                placeholder="StartDate"
                className="date-picker-left"
              />
              <label className="date-to">To</label>
              <DatePicker
                onChange={onChange}
                placeholder="EndDate"
                className="date-picker-right"
              />
            </Col>

            <Col lg={2} md={2} sm={12} className="buttons-col-search d-flex justify-content-start">
              <Button
                icon={<i className="icon-search icon-search-space"></i>}
                text="Search"
                className="search-btn"
              />

              <Button
                icon={<i className="icon-refresh icon-reset-space"></i>}
                text="Reset"
                className="reset-btn"
              />
            </Col>

            <Col lg={5} md={5} sm={12} />
          </Row>

          <Row className="mt-5">
            <Col
              lg={12}
              md={12}
              sm={12}
              className="d-flex justify-content-center mt-3 mb-3"
            >
              <Button
                icon={<i className="icon-download download-btn-icons"></i>}
                text="Download To Excel"
                className="download-to-excel-btn"
              />
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default AuditTrial;
