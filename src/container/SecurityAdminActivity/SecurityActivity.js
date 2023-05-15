import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { TextField, Button, Table, Paper } from "../../components/elements";
import { Select } from "antd";
import DatePicker from "react-multi-date-picker";
import "./SecurityActivity.css";
import { AcceptsOnlyCharacter } from "../../common/functions/RegexFunctions";

const SecurityActivity = () => {
  const [value, setValue] = useState(new Date());
  const [errormessege, setErrormessege] = useState("");
  const [securityactivitydetails, setSecurityactivitydetails] = useState({
    ActiononUser: {
      value: "",
      errormessege: "",
      errorStatus: false,
    },
    actionBy: {
      value: "",
      errormessege: "",
      errorStatus: false,
    },
  });

  console.log(
    securityactivitydetails,
    "securityactivitydetailssecurityactivitydetails"
  );
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const onChangeFunc = (e) => {
    let name = e.target.name;
    let value = e.target.value.trimStart();
    if (value.length <= 100) {
      if (name === "actiononUser" && value !== "") {
        if (AcceptsOnlyCharacter(value)) {
          setSecurityactivitydetails({
            ...securityactivitydetails,
            ActiononUser: {
              value: value,
              errormessege: "",
              errorStatus: false,
            },
          });
        } else {
          setSecurityactivitydetails({
            ...securityactivitydetails,
            ActiononUser: {
              value: securityactivitydetails.ActiononUser.value,
              errormessege: "",
              errorStatus: false,
            },
          });
        }
      } else if (name === "actiononUser" && value === "") {
        setSecurityactivitydetails({
          ...securityactivitydetails,
          ActiononUser: {
            value: "",
            errormessege: "",
            errorStatus: false,
          },
        });
      } else if (name === "actionby" && value !== "") {
        if (AcceptsOnlyCharacter(value)) {
          setSecurityactivitydetails({
            ...securityactivitydetails,
            actionBy: {
              value: value,
              errormessege: "",
              errorStatus: false,
            },
          });
        } else {
          setSecurityactivitydetails({
            ...securityactivitydetails,
            actionBy: {
              value: securityactivitydetails.actionBy.value,
              errormessege: "",
              errorStatus: false,
            },
          });
        }
      } else if (name === "actionby" && value === "") {
        setSecurityactivitydetails({
          ...securityactivitydetails,
          actionBy: {
            value: "",
            errormessege: "",
            errorStatus: false,
          },
        });
      }
    }
  };
  return (
    <>
      <Container className="report-user-container">
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex justify-content-start">
            <label className="report-user-label">Admin Activity</label>
          </Col>
        </Row>

        <Row>
          <Col lg={12} md={12} sm={12} className="Span-user-width">
            <Paper className="span-user-color">
              <Row className="mt-4 mb-2">
                <Col
                  lg={6}
                  md={6}
                  sm={12}
                  className="Security-text-field-column"
                >
                  <TextField
                    className="text-fields-report"
                    placeholder={"Action By User"}
                    labelClass="d-none"
                    name={"actiononUser"}
                    value={securityactivitydetails.ActiononUser.value}
                    onChange={onChangeFunc}
                  />
                  <TextField
                    className="text-fields-report"
                    labelClass="d-none"
                    placeholder={"Action By"}
                    value={securityactivitydetails.actionBy.value}
                    name={"actionby"}
                    onChange={onChangeFunc}
                  />
                </Col>

                <Col
                  lg={5}
                  md={5}
                  sm={12}
                  className="SecurityAdmin-Datepicker-Start"
                >
                  <DatePicker
                    value={value}
                    onChange={setValue}
                    showOtherDays={true}
                    // className="date-picker-security-left"
                    inputClass="date-picker-security-left"
                  />
                  <label className="date-to-security">to</label>

                  <DatePicker
                    value={value}
                    onChange={setValue}
                    showOtherDays={true}
                    inputClass="date-picker-security-right"
                  />
                </Col>

                {/* className="reset-btn-col" */}
                <Col lg={1} md={1} sm={12}>
                  <Button
                    icon={<i className="icon-refresh user-reset"></i>}
                    text="Reset"
                    className="user-report-reset"
                  />
                </Col>
              </Row>

              <Row className="mt-5 mb-3">
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="report-btm-button-col mt-3"
                >
                  <Button
                    icon={<i className="icon-download download-btn-icons"></i>}
                    text="Download Report"
                    className="report-btm-buttons"
                  />
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SecurityActivity;
