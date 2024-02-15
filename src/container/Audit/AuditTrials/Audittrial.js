import React, { Fragment, useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Notification,
  Table,
  Paper,
  Loader,
} from "../../../components/elements";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllAuditAction } from "../../../store/actions/Auth-Actions";
import { downloadAuditTrialReport } from "../../../store/actions/Download-Report";
import Select from "react-select";
import moment from "moment";
import DatePicker from "react-multi-date-picker";
import "./Audittrial.css";
// import { auditorUserRoles } from "../../../store/actions/Auth-Actions";
import {
  AcceptsOnlyCharacter,
  removeSpaceandSpecialCharAcptHash,
} from "../../../common/functions/RegexFunctions";

const AuditTrial = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { auth, reportReducer } = useSelector((state) => state);
  console.log(auth, "auutttthhhhh");

  // state for disable the previous date from end date by selecting date from start date
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // state for action by drop down
  const [actionBy, setActionBy] = useState([]);
  const [actionByValue, setActionByValue] = useState([]);

  const [open, setOpen] = useState({
    open: false,
    message: "",
  });

  //get bankID from local storage
  let AuditBankId =
    localStorage.getItem("bankID") != undefined &&
    localStorage.getItem("bankID") != null
      ? localStorage.getItem("bankID")
      : 1;

  // dispatch api of action By
  useEffect(() => {
    dispatch(getAllAuditAction(navigate));
  }, []);

  // states for textfiels in audit trial
  const [auditTrialFields, setAuditTrialFields] = useState({
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
      value: AuditBankId ? AuditBankId : 1,
      errorMessage: "",
      errorStatus: false,
    },
  });
  console.log(auditTrialFields, "auditTrialFieldsauditTrialFields");

  // validation for textfields in audit action
  const userAuditTrialValidation = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "firstName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setAuditTrialFields({
          ...auditTrialFields,
          firstName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "firstName" && value === "") {
      setAuditTrialFields({
        ...auditTrialFields,
        firstName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "lastName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setAuditTrialFields({
          ...auditTrialFields,
          lastName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "lastName" && value === "") {
      setAuditTrialFields({
        ...auditTrialFields,
        lastName: { value: "", errorMessage: "", errorStatus: false },
      });
    }
  };

  //ON CHANGE HANDLER FOR CATEGORY DROPDOWN
  const selectAllActionByChangeHandler = async (selectedAction) => {
    console.log(selectedAction, "selectedActionselectedAction");
    setActionByValue(selectedAction);
    setAuditTrialFields({
      ...auditTrialFields,
      actionBy: {
        value: selectedAction.value,
        label: selectedAction.label,
      },
    });
  };

  // download report in audit trial page
  const downloadReportAuditTrial = () => {
    let reportAudit = {
      DateFrom:
        auditTrialFields.startDate.value !== ""
          ? moment(auditTrialFields.startDate.value).format("YYYYMMDD")
          : "",
      DateTO:
        auditTrialFields.endDate.value !== ""
          ? moment(auditTrialFields.endDate.value).format("YYYYMMDD")
          : "",
      ActionID: auditTrialFields.actionBy.value,
      FirstName: auditTrialFields.firstName.value,
      LastName: auditTrialFields.lastName.value,
      BankID: parseInt(auditTrialFields.BankID.value),
    };
    if (reportAudit !== "") {
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
    dispatch(downloadAuditTrialReport(reportAudit));
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
      setActionBy(tem);
    }
  }, [auth.getAuditActions]);

  //start date state of multi datepicker
  const dateStartChangeHandler = (date) => {
    setStartDate(date);
    setEndDate(null);
    let newDate = moment(date).format("YYYY-MM-DD");
    setAuditTrialFields({
      ...auditTrialFields,
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
    setAuditTrialFields({
      ...auditTrialFields,
      endDate: {
        value: newEndDate,
      },
    });
  };

  // reset handler
  const resetHandler = () => {
    setAuditTrialFields({
      ...auditTrialFields,
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
    setActionByValue([]);
  };

  // const onChange = (date, dateString) => {
  //   setValue(dateString);
  //   console.log(setValue, "dateStringdateStringdateString");
  // };

  // useEffect(() => {
  //   dispatch(auditorUserRoles());
  // }, []);

  return (
    <Fragment>
      <section className="edit-user-container">
        <Row>
          <Col lg={12} md={12} sm={12}>
            <label className="edit-user-label">Audit Trial</label>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <Paper className="span-edit-user">
              <Row className="mt-2">
                <Col lg={3} md={3} sm={12}>
                  <TextField
                    name="firstName"
                    value={auditTrialFields.firstName.value}
                    className="text-fields-edituser"
                    placeholder="First Name"
                    onChange={userAuditTrialValidation}
                    labelClass="d-none"
                  />
                </Col>

                <Col lg={3} md={3} sm={12}>
                  <TextField
                    name="lastName"
                    value={auditTrialFields.lastName.value}
                    className="text-fields-edituser"
                    onChange={userAuditTrialValidation}
                    placeholder="Last Name"
                    labelClass="d-none"
                  />
                </Col>
                <Col lg={3} md={3} sm={12}>
                  <Select
                    name="actionBy"
                    options={actionBy}
                    isSearchable={true}
                    value={actionByValue}
                    className="slect-audit-trial"
                    onChange={selectAllActionByChangeHandler}
                    placeholder="Action By"
                  />
                </Col>

                <Col lg={3} md={3} sm={12} className="AuditTrial-Datepicker">
                  <DatePicker
                    selected={startDate}
                    highlightToday={true}
                    onOpenPickNewDate={false}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    autoComplete="off"
                    value={auditTrialFields.startDate.value}
                    onChange={(value) =>
                      dateStartChangeHandler(value?.toDate?.().toString())
                    }
                    showOtherDays={true}
                    inputClass="Audit-Datepicker-left"
                    placeholder="Start Date"
                  />

                  <label className="date-to">to</label>
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
                    value={auditTrialFields.endDate.value}
                    onChange={(value) =>
                      dateEndChangeHandler(value?.toDate?.().toString())
                    }
                    showOtherDays={true}
                    inputClass="Audit-Datepicker-right"
                    placeholder="End Date"
                  />
                </Col>
              </Row>

              <Row className="mt-3">
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="d-flex justify-content-center"
                >
                  <Button
                    icon={<i className="icon-refresh icon-reset-space"></i>}
                    text="Reset"
                    onClick={resetHandler}
                    className="reset-btn"
                  />
                </Col>
              </Row>

              <Row className="mt-5">
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="d-flex justify-content-center mt-3"
                >
                  <Button
                    icon={<i className="icon-download download-btn-icons"></i>}
                    text="Download To Excel"
                    onClick={downloadReportAuditTrial}
                    className="download-to-excel-btn"
                  />
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
      </section>
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
      {reportReducer.Loading ? <Loader /> : null}
    </Fragment>
  );
};

export default AuditTrial;
