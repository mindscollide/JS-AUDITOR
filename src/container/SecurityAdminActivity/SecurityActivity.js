import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Notification,
  Table,
  Paper,
  Loader,
} from "../../components/elements";
import Select from "react-select";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-multi-date-picker";
import { getAllAuditAction } from "../../store/actions/Auth-Actions";
import { downloadSecurityReport } from "../../store/actions/Download-Report";
import "./SecurityActivity.css";
import { AcceptsOnlyCharacter } from "../../common/functions/RegexFunctions";

const SecurityActivity = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { auth, reportReducer } = useSelector((state) => state);
  console.log(auth, "auutttthhhhh");

  // state for disable the previous date from end date by selecting date from start date
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [open, setOpen] = useState({
    open: false,
    message: "",
  });

  // state for action by drop down
  const [securityActionBy, setSecurityActionBy] = useState([]);
  const [securityActionByValue, setSecurityActionByValue] = useState([]);

  //get bankID from local storage
  let SecurityBankId =
    localStorage.getItem("bankID") != undefined &&
    localStorage.getItem("bankID") != null
      ? localStorage.getItem("bankID")
      : 1;

  // dispatch api of action By
  useEffect(() => {
    dispatch(getAllAuditAction(navigate));
  }, []);

  // state for security Activity
  const [securityActivityFields, setSecurityActivityFields] = useState({
    firstName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    lastName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    actionBy: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },

    startDate: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    endDate: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    BankID: {
      value: SecurityBankId ? SecurityBankId : 1,
      errorMessage: "",
      errorStatus: false,
    },
  });
  console.log(securityActivityFields, "securityActivityFieldssecurity");

  // validation for textfields in audit action
  const securityAuditValidation = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "firstName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setSecurityActivityFields({
          ...securityActivityFields,
          firstName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "firstName" && value === "") {
      setSecurityActivityFields({
        ...securityActivityFields,
        firstName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "lastName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setSecurityActivityFields({
          ...securityActivityFields,
          lastName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "lastName" && value === "") {
      setSecurityActivityFields({
        ...securityActivityFields,
        lastName: { value: "", errorMessage: "", errorStatus: false },
      });
    }
  };

  //ON CHANGE HANDLER FOR CATEGORY DROPDOWN
  const selectSecurityActionByChangeHandler = async (selectedAction) => {
    console.log(selectedAction, "selectedActionselectedAction");
    setSecurityActionByValue(selectedAction);
    setSecurityActivityFields({
      ...securityActivityFields,
      actionBy: {
        value: selectedAction.value,
        label: selectedAction.label,
      },
    });
  };

  // download report in audit trial page
  const downloadReportSecurity = () => {
    let reportSecurtiy = {
      DateFrom:
        securityActivityFields.startDate.value !== ""
          ? moment(securityActivityFields.startDate.value).format("YYYYMMDD")
          : "",
      DateTO:
        securityActivityFields.endDate.value !== ""
          ? moment(securityActivityFields.endDate.value).format("YYYYMMDD")
          : "",
      ActionID: securityActivityFields.actionBy.value,
      FirstName: securityActivityFields.firstName.value,
      LastName: securityActivityFields.lastName.value,
      BankID: parseInt(securityActivityFields.BankID.value),
    };

    if (reportSecurtiy !== "") {
      setOpen({
        ...open,
        open: true,
        message: "Download Successfully",
      });
    } else {
      setOpen({
        ...open,
        open: true,
        message: "Downloading Failed",
      });
    }
    dispatch(downloadSecurityReport(reportSecurtiy));
  };

  // for action By in select drop down
  useEffect(() => {
    if (Object.keys(auth.getAuditActions).length > 0) {
      let tem = [];
      auth.getAuditActions.map((data, index) => {
        console.log(data, "datadatadatadatassssss");
        tem.push({
          value: data.auditActionID,
          label: data.actionName,
        });
      });
      setSecurityActionBy(tem);
    }
  }, [auth.getAuditActions]);

  // reset handler
  const resetSecurityHandler = () => {
    setSecurityActivityFields({
      ...securityActivityFields,
      firstName: {
        value: "",
      },
      lastName: {
        value: "",
      },

      actionBy: {
        value: 0,
      },

      startDate: {
        value: "",
      },

      endDate: {
        value: "",
      },
    });
    setSecurityActionByValue([]);
  };

  //start date state of multi datepicker
  const dateStartChangeHandler = (date) => {
    setStartDate(date);
    setEndDate(null);
    let newDate = moment(date).format("YYYY-MM-DD");
    setSecurityActivityFields({
      ...securityActivityFields,
      startDate: {
        value: newDate,
      },
    });
    console.log(newDate, "dateStartChangeHandler");
  };

  //end date state of multi datepicker
  const dateEndChangeHandler = (date) => {
    setEndDate(date);
    let newEndDate = moment(date).format("YYYY-MM-DD");
    setSecurityActivityFields({
      ...securityActivityFields,
      endDate: {
        value: newEndDate,
      },
    });
  };

  return (
    <>
      <section className="report-user-container">
        <Row>
          <Col lg={12} md={12} sm={12}>
            <label className="report-user-label">Security Admin Activity</label>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="span-user-color">
              <Row className="mt-2">
                <Col lg={3} md={3} sm={12}>
                  <TextField
                    name="firstName"
                    value={securityActivityFields.firstName.value}
                    className="text-fields-report"
                    placeholder="First Name"
                    onChange={securityAuditValidation}
                    labelClass="d-none"
                  />
                </Col>
                <Col lg={3} md={3} sm={12}>
                  <TextField
                    name="lastName"
                    value={securityActivityFields.lastName.value}
                    className="text-fields-report"
                    placeholder="Last Name"
                    onChange={securityAuditValidation}
                    labelClass="d-none"
                  />
                </Col>
                <Col lg={3} md={3} sm={12}>
                  <Select
                    className="text-fields-report"
                    name="actionBy"
                    options={securityActionBy}
                    value={securityActionByValue}
                    onChange={selectSecurityActionByChangeHandler}
                    placeholder="Action By"
                    labelClass="d-none"
                  />
                </Col>

                <Col
                  lg={3}
                  md={3}
                  sm={12}
                  className="SecurityAdmin-Datepicker-Start"
                >
                  <DatePicker
                    selected={startDate}
                    highlightToday={true}
                    onOpenPickNewDate={false}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    autoComplete="off"
                    value={securityActivityFields.startDate.value}
                    onChange={(value) =>
                      dateStartChangeHandler(value?.toDate?.().toString())
                    }
                    showOtherDays={true}
                    placeholder="Start Date"
                    inputClass="date-picker-security-left"
                  />
                  <label className="date-to-security">to</label>

                  <DatePicker
                    selected={endDate}
                    highlightToday={true}
                    onOpenPickNewDate={false}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={
                      startDate
                        ? moment(startDate).add(1, "days").toDate()
                        : null
                    }
                    autoComplete="off"
                    value={securityActivityFields.endDate.value}
                    onChange={(value) =>
                      dateEndChangeHandler(value?.toDate?.().toString())
                    }
                    placeholder="End Date"
                    showOtherDays={true}
                    inputClass="date-picker-security-right"
                  />
                </Col>
              </Row>
              <Row>
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="d-flex justify-content-center mt-3"
                >
                  <Button
                    icon={<i className="icon-refresh user-reset"></i>}
                    text="Reset"
                    onClick={resetSecurityHandler}
                    className="Security-report-reset"
                  />
                </Col>
              </Row>

              <Row className="mt-5">
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="report-btm-button-col mt-3"
                >
                  <Button
                    icon={<i className="icon-download download-btn-icons"></i>}
                    text="Download Report"
                    onClick={downloadReportSecurity}
                    className="report-btm-buttons"
                  />
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
      </section>
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
      {reportReducer.Loading ? <Loader /> : null}
    </>
  );
};

export default SecurityActivity;
