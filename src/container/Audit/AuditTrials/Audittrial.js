import React, { Fragment, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { TextField, Button, Table, Paper } from "../../../components/elements";
import { Select, Space } from "antd";
import DatePicker from "react-multi-date-picker";
import "./Audittrial.css";

const AuditTrial = () => {
  const [value, setValue] = useState(new Date());

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <Fragment>
      <Container className="edit-user-container">
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <label className="edit-user-label">Audit Trial</label>
          </Col>
        </Row>

        <Row>
          <Col lg={12} md={12} sm={12} className="span-width">
            <Paper className="span-edit-user">
              <Row className="mt-3">
                <Col lg={12} md={12} sm={12} className="text-field-column">
                  <TextField
                    className="text-fields-edituser"
                    placeholder="Reference Number"
                  />
                  <TextField
                    className="text-fields-edituser"
                    placeholder="MYSIS Customer Code"
                  />
                  <TextField
                    className="text-fields-edituser"
                    placeholder="Action By"
                  />
                  <Select
                    className="select-field-edit"
                    placeholder="Select Role"
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={4} md={4} sm={12} className="AuditTrial-Datepicker">
                  <DatePicker
                    value={value}
                    onChange={setValue}
                    showOtherDays={true}
                    inputClass="Audit-Datepicker-left"
                  />

                  <label className="date-to">to</label>
                  <DatePicker
                    value={value}
                    onChange={setValue}
                    showOtherDays={true}
                    inputClass="Audit-Datepicker-right"
                  />
                </Col>

                <Col lg={8} md={8} sm={12} className="buttons-col-search">
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

                {/* <Col lg={3} md={3} sm={12} /> */}
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
            </Paper>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default AuditTrial;
