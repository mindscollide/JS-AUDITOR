import React, { Fragment, useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { TextField, Button, Table, Paper } from "../../../components/elements";
import { Select, Space } from "antd";
import DatePicker from "react-multi-date-picker";
import "./Audittrial.css";
import { useDispatch, useSelector } from "react-redux";
import { auditorUserRoles } from "../../../store/actions/Auth-Actions";
import {
  AcceptsOnlyCharacter,
  removeSpaceandSpecialCharAcptHash,
} from "../../../common/functions/RegexFunctions";

const AuditTrial = () => {
  const { auth } = useSelector((state) => state);
  console.log(auth, "authReducerauthReducerauthReducer");
  const [value, setValue] = useState(new Date());
  const dispatch = useDispatch();
  const [roledefine, setRoledefine] = useState([]);
  const [errormessege, setErrormessege] = useState("");
  const [audittrialdetails, setAudittrialdetails] = useState({
    refrencenumber: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    customercode: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    Actionby: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    selectRole: [],
    errorStatus: false,
  });

  const resetBtnFunc = () => {
    setAudittrialdetails({
      referencenumber: {
        value: "",
        errorMessage: "",
        errorStatus: false,
      },
      customercode: {
        value: "",
        errorMessage: "",
        errorStatus: false,
      },
      Actionby: {
        value: "",
        errorMessage: "",
        errorStatus: false,
      },
      setRoledefine: [],
    });
  };

  useEffect(() => {
    if (Object.keys(auth.RoleList).length > 0) {
      console.log(auth.RoleList, "lististististist");
      let newarr = [];
      auth.RoleList.map((data, index) => {
        console.log(data, "datadatadatadata");
        newarr.push({
          label: data.roleName,
          value: data.roleID,
        });
      });
      setRoledefine(newarr);
      console.log(roledefine, "setRoledefinesetRoledefinesetRoledefine");
    }
  }, [auth.RoleList]);

  console.log(audittrialdetails, "setAudittrialdetailssetAudittrialdetails");

  const onChangeFunc = (e) => {
    let name = e.target.name;
    let value = e.target.value.trimStart();
    if (value.length <= 100) {
      if (name === "refrencenumber" && value !== "") {
        if (removeSpaceandSpecialCharAcptHash(value)) {
          setAudittrialdetails({
            ...audittrialdetails,
            refrencenumber: {
              value: value,
              errorMessage: "",
              errorStatus: false,
            },
          });
        } else {
          setAudittrialdetails({
            ...audittrialdetails,
            refrencenumber: {
              value: audittrialdetails.refrencenumber.value,
              errorMessage: "",
              errorStatus: false,
            },
          });
        }
      } else if (name === "refrencenumber" && value === "") {
        setAudittrialdetails({
          ...audittrialdetails,
          refrencenumber: {
            value: "",
            errorMessage: "",
            errorStatus: false,
          },
        });
      } else if (name === "customercode" && value !== "") {
        if (removeSpaceandSpecialCharAcptHash(value)) {
          setAudittrialdetails({
            ...audittrialdetails,
            customercode: {
              value: value,
              errorMessage: "",
              errorStatus: false,
            },
          });
        } else {
          setAudittrialdetails({
            ...audittrialdetails,
            customercode: {
              value: audittrialdetails.customercode.value,
              errorMessage: "",
              errorStatus: false,
            },
          });
        }
      } else if (name === "customercode" && value === "") {
        setAudittrialdetails({
          ...audittrialdetails,
          customercode: {
            value: "",
            errorMessage: "",
            errorStatus: false,
          },
        });
      } else if (name === "actionby" && value !== "") {
        if (AcceptsOnlyCharacter(value)) {
          setAudittrialdetails({
            ...audittrialdetails,
            Actionby: {
              value: value,
              errorMessage: "",
              errorStatus: false,
            },
          });
        } else {
          setAudittrialdetails({
            ...audittrialdetails,
            Actionby: {
              value: audittrialdetails.Actionby.value,
              errorMessage: "",
              errorStatus: false,
            },
          });
        }
      } else if (name === "actionby" && value === "") {
        setAudittrialdetails({
          ...audittrialdetails,
          Actionby: {
            value: "",
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    }
  };

  const handleChange = (e) => {
    console.log("handleChangehandleChangehandleChange", e);
    setAudittrialdetails({
      ...audittrialdetails,
      selectRole: e.value,
    });
  };

  const onChange = (date, dateString) => {
    setValue(dateString);
    console.log(setValue, "dateStringdateStringdateString");
  };

  useEffect(() => {
    dispatch(auditorUserRoles());
  }, []);

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
                    name={"refrencenumber"}
                    value={audittrialdetails.refrencenumber.value}
                    onChange={onChangeFunc}
                  />
                  <TextField
                    className="text-fields-edituser"
                    placeholder="MYSIS Customer Code"
                    name={"customercode"}
                    value={audittrialdetails.customercode.value}
                    onChange={onChangeFunc}
                  />
                  <TextField
                    className="text-fields-edituser"
                    placeholder="Action By"
                    name={"actionby"}
                    value={audittrialdetails.Actionby.value}
                    onChange={onChangeFunc}
                  />
                  <Select
                    className="select-field-edit"
                    placeholder="Select Role"
                    options={roledefine}
                    name="Roles"
                    onChange={handleChange}
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
                    onClick={resetBtnFunc}
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
