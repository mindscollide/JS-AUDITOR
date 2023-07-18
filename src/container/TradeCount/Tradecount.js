import React, { Fragment, useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
  Loader,
} from "../../components/elements";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../assets/common/functions/emailValidation";
import { tradeCountSearchGetApi } from "../../store/actions/Auditor-Action";
import { getAllCorporateCategoryApi } from "../../store/actions/Auth-Actions";
import { downloadTradeCountReport } from "../../store/actions/Download-Report";
import { corporateNameByBankId } from "../../store/actions/System-Admin";
import Select from "react-select";
import { Pagination, Spin } from "antd";
import moment from "moment";
import DatePicker from "react-multi-date-picker";
import "./Tradecount.css";

const TradeCount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { auditorReducer, auth, systemReducer, reportReducer } = useSelector(
    (state) => state
  );

  // state for category dropdown
  const [selectAllCategory, setSelectAllCategory] = useState([]);
  const [selectAllCategoryValue, setSelectAllCategoryValue] = useState([]);

  const [totalRecords, setTotalRecord] = useState(0);

  // select current date
  const minDate = new Date();

  //get bankID from local storage
  let CustomerUserListBankId =
    localStorage.getItem("bankID") != undefined &&
    localStorage.getItem("bankID") != null
      ? localStorage.getItem("bankID")
      : 1;

  let currentPageSize = localStorage.getItem("tradeCountSize")
    ? localStorage.getItem("tradeCountSize")
    : 50;
  let currentPage = localStorage.getItem("tradeCountPage")
    ? localStorage.getItem("tradeCountPage")
    : 1;

  //start date state of multi datepicker
  const [startDateProps, setStartDateProps] = useState({
    value: new Date(),
    format: "MM-DD-YYYY",
    onChange: (date) => console.log(date.format()),
  });

  //end date state of multi datepicker
  const [endDateProps, setEndDateProps] = useState({
    value: new Date(),
    format: "MM-DD-YYYY",
    onChange: (date) => console.log(date.format()),
  });

  // state for company dropdown by using corporateNameByBankId API
  const [companyDropdown, setCompanyDropdown] = useState([]);
  const [companyDropdownValue, setCompanyDropdownValue] = useState([]);

  // state for table rows
  const [rows, setRows] = useState([]);

  // state for LoginHistory fields
  const [userTradeCount, setUserTradeCount] = useState({
    transactionID: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    Name: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

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

    corporateNames: {
      value: "",
      label: "",
      errorMessage: "",
      errorStatus: false,
    },

    corporateCategoryID: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },

    Email: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    BankID: {
      value: CustomerUserListBankId ? CustomerUserListBankId : 1,
      errorMessage: "",
      errorStatus: false,
    },

    securityType: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },

    Position: {
      value: "",
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
  });

  //start date state of multi datepicker
  const changeDateStartHandler = (date) => {
    let newDate = moment(date).format("YYYY-MM-DD");
    setUserTradeCount({
      ...userTradeCount,
      startDate: {
        value: newDate,
      },
    });
    console.log(newDate, "changeDateStartHandler");
  };

  //end date state of multi datepicker
  const changeDateEndHandler = (date) => {
    let newEndDate = moment(date).format("YYYY-MM-DD");
    setUserTradeCount({
      ...userTradeCount,
      endDate: {
        value: newEndDate,
      },
    });
  };

  //ON CHANGE HANDLER FOR CATEGORY DROPDOWN
  const selectAllCategoryOnchangeHandler = async (selectedCategory) => {
    console.log(selectedCategory, "selectedOptionselectedOption");
    setSelectAllCategoryValue(selectedCategory);
    setUserTradeCount({
      ...userTradeCount,
      corporateCategoryID: {
        value: selectedCategory.value,
        label: selectedCategory.label,
      },
    });
  };

  //ON CHANGE HANDLER FOR CORPORATE COMPANY DROPDOWN
  const selectBankCompanyOnchangeHandler = async (selectedCompany) => {
    console.log(selectedCompany, "selectedNatureselectedNature");
    setCompanyDropdownValue(selectedCompany);
    setUserTradeCount({
      ...userTradeCount,
      corporateNames: {
        label: selectedCompany.label,
      },
    });
  };

  // download report in Trade count page
  const downloadReportTradeCount = () => {
    let reportTrade = {
      TransactionID: userTradeCount.transactionID.value,
      FirstName: userTradeCount.firstName.value,
      LastName: userTradeCount.lastName.value,
      CompanyName: userTradeCount.corporateNames.label,
      CategoryID: userTradeCount.corporateCategoryID.value,
      Email: userTradeCount.Email.value,
      SecurityTypeID: userTradeCount.securityType.value,
      FromDate:
        userTradeCount.startDate.value !== ""
          ? moment(userTradeCount.startDate.value).format("YYYYMMDD")
          : "",
      ToDate:
        userTradeCount.endDate.value !== ""
          ? moment(userTradeCount.endDate.value).format("YYYYMMDD")
          : "",
    };
    dispatch(downloadTradeCountReport(reportTrade));
  };

  // for corporate company in select drop down we use bankCorporate
  useEffect(() => {
    if (Object.keys(systemReducer.corporateNameByBankId).length > 0) {
      let tem = [];
      systemReducer.corporateNameByBankId.map((data, index) => {
        console.log(data, "corporateNamecorporateName");
        tem.push({
          label: data.corporateName,
          value: data.corporateName,
        });
      });
      setCompanyDropdown(tem);
    }
  }, [systemReducer.corporateNameByBankId]);

  //useEffect for dispatch data in table
  useEffect(() => {
    let newDataa = {
      TransactionID: "",
      FirstName: "",
      LastName: "",
      CompanyName: "",
      CategoryID: 0,
      Email: "",
      SecurityTypeID: 0,
      FromDate: "",
      ToDate: "",
      PageNumber: 1,
      Length: 50,
    };
    dispatch(getAllCorporateCategoryApi(navigate));
    dispatch(tradeCountSearchGetApi(navigate, newDataa));

    let corporateBank = {
      BankID: parseInt(userTradeCount.BankID.value),
    };
    dispatch(corporateNameByBankId(navigate, corporateBank));
  }, []);

  // for category Corporate in select drop down
  useEffect(() => {
    if (Object.keys(auth.getAllCategoryCorporate).length > 0) {
      let tem = [];
      auth.getAllCategoryCorporate.map((data, index) => {
        console.log(data, "datadatadatadatassssss");
        tem.push({
          label: data.category,
          value: data.corporateCategoryID,
        });
      });
      setSelectAllCategory(tem);
    }
  }, [auth.getAllCategoryCorporate]);

  // render data in table of tradeCountSearchGetApi
  useEffect(() => {
    if (
      auditorReducer.getSearchTransactionDetails.length > 0 &&
      auditorReducer.getSearchTransactionDetails !== null &&
      auditorReducer.getSearchTransactionDetails !== undefined
    ) {
      setRows(auditorReducer.getSearchTransactionDetails);
    } else {
      setRows([]);
    }
  }, [auditorReducer.getSearchTransactionDetails]);
  console.log("getSearchTransactionDetails", rows);

  const userTradeValidation = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "transactionID" && value !== "") {
      let valueCheck = value.replace(/[^\d]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setUserTradeCount({
          ...userTradeCount,
          transactionID: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "transactionID" && value === "") {
      setUserTradeCount({
        ...userTradeCount,
        transactionID: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Name" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setUserTradeCount({
          ...userTradeCount,
          Name: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Name" && value === "") {
      setUserTradeCount({
        ...userTradeCount,
        Name: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "firstName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setUserTradeCount({
          ...userTradeCount,
          firstName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "firstName" && value === "") {
      setUserTradeCount({
        ...userTradeCount,
        firstName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "lastName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setUserTradeCount({
          ...userTradeCount,
          lastName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "lastName" && value === "") {
      setUserTradeCount({
        ...userTradeCount,
        lastName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "companyName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setUserTradeCount({
          ...userTradeCount,
          companyName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "companyName" && value === "") {
      setUserTradeCount({
        ...userTradeCount,
        companyName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Contact" && value !== "") {
      let valueCheck = value.replace(/[^\d]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setUserTradeCount({
          ...userTradeCount,
          Contact: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Contact" && value === "") {
      setUserTradeCount({
        ...userTradeCount,
        Contact: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Email" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setUserTradeCount({
          ...userTradeCount,
          Email: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Email" && value === "") {
      setUserTradeCount({
        ...userTradeCount,
        Email: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }

    if (name === "securityType" && value !== "") {
      let valueCheck = value.replace(/[^\d]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setUserTradeCount({
          ...userTradeCount,
          securityType: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "securityType" && value === "") {
      setUserTradeCount({
        ...userTradeCount,
        securityType: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Position" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setUserTradeCount({
          ...userTradeCount,
          Position: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Position" && value === "") {
      setUserTradeCount({
        ...userTradeCount,
        Position: { value: "", errorMessage: "", errorStatus: false },
      });
    }
  };

  //email validation handler
  const handlerEmail = () => {
    if (userTradeCount.Email.value !== "") {
      if (validateEmail(userTradeCount.Email.value)) {
        console.log("Email verified");
      } else {
        console.log("Email Not Verified");
      }
    }
  };

  //on search of Trade Count list Api
  const onHitSearchTradeCount = async () => {
    let newData = {
      TransactionID: userTradeCount.transactionID.value,
      FirstName: userTradeCount.firstName.value,
      LastName: userTradeCount.lastName.value,
      CompanyName: userTradeCount.corporateNames.label,
      CategoryID: userTradeCount.corporateCategoryID.value,
      Email: userTradeCount.Email.value,
      SecurityTypeID: userTradeCount.securityType.value,
      FromDate:
        userTradeCount.startDate.value !== ""
          ? moment(userTradeCount.startDate.value).format("YYYYMMDD")
          : "",
      ToDate:
        userTradeCount.endDate.value !== ""
          ? moment(userTradeCount.endDate.value).format("YYYYMMDD")
          : "",
      PageNumber: currentPage !== null ? parseInt(currentPage) : 1,
      Length: currentPageSize !== null ? parseInt(currentPageSize) : 50,
    };
    console.log("tradeCountSearchGetApi", newData);
    await dispatch(tradeCountSearchGetApi(navigate, newData));
  };

  // onChange handler for pagination
  const tradeCountPagination = (current, pageSize) => {
    let newData = {
      TransactionID: userTradeCount.transactionID.value,
      FirstName: userTradeCount.firstName.value,
      LastName: userTradeCount.lastName.value,
      CompanyName: userTradeCount.corporateNames.label,
      CategoryID: userTradeCount.corporateCategoryID.value,
      Email: userTradeCount.Email.value,
      SecurityTypeID: userTradeCount.securityType.value,
      FromDate:
        userTradeCount.startDate.value !== ""
          ? moment(userTradeCount.startDate.value).format("YYYYMMDD")
          : "",
      ToDate:
        userTradeCount.endDate.value !== ""
          ? moment(userTradeCount.endDate.value).format("YYYYMMDD")
          : "",
      PageNumber: currentPage !== null ? parseInt(currentPage) : 1,
      Length: currentPageSize !== null ? parseInt(currentPageSize) : 50,
    };
    localStorage.setItem("tradeCountSize", pageSize);
    localStorage.setItem("tradeCountPage", current);
    dispatch(tradeCountSearchGetApi(navigate, newData));
  };

  // reset handler in trade count
  const resetTradeHandler = () => {
    setUserTradeCount({
      ...userTradeCount,
      transactionID: {
        value: "",
        errorMessage: "",
        errorStatus: false,
      },
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

      corporateNames: {
        value: "",
        label: "",
        errorMessage: "",
        errorStatus: false,
      },

      corporateCategoryID: {
        value: 0,
        errorMessage: "",
        errorStatus: false,
      },

      Email: {
        value: "",
        errorMessage: "",
        errorStatus: false,
      },

      securityType: {
        value: 0,
        errorMessage: "",
        errorStatus: false,
      },

      Position: {
        value: "",
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
    });
    setSelectAllCategoryValue([]);
    setCompanyDropdownValue([]);

    let newDataa = {
      TransactionID: "",
      FirstName: "",
      LastName: "",
      CompanyName: "",
      CategoryID: 0,
      Email: "",
      SecurityTypeID: 0,
      FromDate: "",
      ToDate: "",
      PageNumber: 1,
      Length: 50,
    };
    dispatch(tradeCountSearchGetApi(navigate, newDataa));
  };

  // column for LoginHistory
  const tradeColumns = [
    {
      title: <label className="bottom-table-header">Transaction ID</label>,
      dataIndex: "transactionID",
      key: "transactionID",
      width: "200px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Buyer Name</label>,
      dataIndex: "buyerName",
      key: "buyerName",
      width: "120px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Seller Name</label>,
      dataIndex: "sellerName",
      key: "sellerName",
      width: "120px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Company Name</label>,
      dataIndex: "companyName",
      key: "companyName",
      width: "150px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Category</label>,
      dataIndex: "category",
      key: "category",
      width: "120px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Seller Email</label>,
      dataIndex: "sellerEmail",
      key: "sellerEmail",
      width: "250px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Buyer Email</label>,
      dataIndex: "buyerEmail",
      key: "buyerEmail",
      width: "250px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Security Type</label>,
      dataIndex: "securityType",
      key: "securityType",
      align: "center",
      width: "150px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Position</label>,
      dataIndex: "position",
      key: "position",
      width: "100px",
      align: "center",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Amount</label>,
      dataIndex: "amount",
      key: "amount",
      align: "center",
      width: "100px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Rate quoted</label>,
      dataIndex: "rateQouted",
      key: "rateQouted",
      align: "center",
      width: "120px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Rate done</label>,
      dataIndex: "rateDone",
      key: "rateDone",
      align: "center",
      width: "100px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Trade Rate</label>,
      dataIndex: "tradeRate",
      key: "tradeRate",
      align: "center",
      width: "150px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Transaction Status</label>,
      dataIndex: "transactionStatus",
      key: "transactionStatus",
      align: "center",
      width: "170px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Buyer ID</label>,
      dataIndex: "buyerID",
      key: "buyerID",
      align: "center",
      width: "100px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
    {
      title: <label className="bottom-table-header">Seller ID</label>,
      dataIndex: "sellerID",
      key: "sellerID",
      align: "center",
      width: "100px",
      ellipsis: true,
      render: (text) => <label className="issue-date-column">{text}</label>,
    },
  ];

  // data for Columns loginHistory
  const tradeData = [
    {
      key: "1",
      transactionID: "TB-3m-30 Apr 23",
      name: "Muhammad Ahmed",
      company: "Gulahmed",
      category: "Category 1",
      email: "muhammad.ahmed@gmail.com",
      securityType: "Tbill",
      position: "Buy",
      amount: "10,000",
      rateQuoted: "13.5",
      rateDone: "13.5",
      tradeDate: "19/04/2023",
      status: "Enable",
    },
    {
      key: "1",
      transactionID: "TB-3m-30 Apr 23",
      name: "Muhammad Ahmed",
      company: "Gulahmed",
      category: "Category 1",
      email: "muhammad.ahmed@gmail.com",
      securityType: "Tbill",
      position: "Buy",
      amount: "10,000",
      rateQuoted: "13.5",
      rateDone: "13.5",
      tradeDate: "19/04/2023",
      status: "Enable",
    },
  ];

  return (
    <Fragment>
      <section className="tradeCount-container">
        <Row>
          <Col lg={12} md={12} sm={12}>
            <span className="tradeCount-label">Trade Count</span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={12} md={12} sm={12}>
            <CustomPaper className="tradeCount-paper">
              <Row className="mt-3">
                <Col lg={2} md={2} sm={12}>
                  <TextField
                    placeholder="Transaction ID"
                    name="transactionID"
                    value={userTradeCount.transactionID.value}
                    onChange={userTradeValidation}
                    labelClass="d-none"
                    className="tradeCount-textField-fontsize"
                  />
                </Col>
                <Col lg={2} md={2} sm={12}>
                  <TextField
                    placeholder="First Name"
                    name="firstName"
                    value={userTradeCount.firstName.value}
                    onChange={userTradeValidation}
                    labelClass="d-none"
                    className="tradeCount-textField-fontsize"
                  />
                </Col>
                <Col lg={2} md={2} sm={12}>
                  <TextField
                    placeholder="Last Name"
                    name="lastName"
                    value={userTradeCount.lastName.value}
                    onChange={userTradeValidation}
                    labelClass="d-none"
                    className="tradeCount-textField-fontsize"
                  />
                </Col>
                <Col lg={2} md={2} sm={12}>
                  <Select
                    placeholder="Company"
                    name="corporateNames"
                    options={companyDropdown}
                    value={companyDropdownValue}
                    isSearchable={true}
                    onChange={selectBankCompanyOnchangeHandler}
                    className="tradeCount-select"
                  />
                </Col>
                <Col lg={2} md={2} sm={12}>
                  <Select
                    placeholder="Category"
                    name="corporateCategoryID"
                    options={selectAllCategory}
                    value={selectAllCategoryValue}
                    isSearchable={true}
                    onChange={selectAllCategoryOnchangeHandler}
                    className="tradeCount-select"
                  />
                </Col>
                <Col lg={2} md={2} sm={12}>
                  <TextField
                    placeholder="Email"
                    name="Email"
                    value={userTradeCount.Email.value}
                    onBlur={handlerEmail}
                    onChange={userTradeValidation}
                    labelClass="d-none"
                    className="tradeCount-textField-fontsize"
                  />
                </Col>
              </Row>

              <Row className="mt-3">
                <Col lg={2} md={2} sm={12}>
                  <TextField
                    placeholder="Security Type"
                    name="securityType"
                    value={userTradeCount.securityType.value || ""}
                    onChange={userTradeValidation}
                    labelClass="d-none"
                    className="tradeCount-textField-fontsize"
                  />
                </Col>
                <Col lg={2} md={2} sm={12}>
                  <TextField
                    placeholder="Position"
                    name="Position"
                    value={userTradeCount.Position.value}
                    onChange={userTradeValidation}
                    labelClass="d-none"
                    className="tradeCount-textField-fontsize"
                  />
                </Col>

                <Col lg={6} md={6} sm={12} className="Tradecount-Datepicker">
                  <DatePicker
                    highlightToday={true}
                    onOpenPickNewDate={false}
                    minDate={minDate}
                    autoComplete="off"
                    value={userTradeCount.startDate.value}
                    placeholder="Start date"
                    onChange={(value) =>
                      changeDateStartHandler(value?.toDate?.().toString())
                    }
                    showOtherDays={true}
                    inputClass="Tradecount-Datepicker-left"
                  />
                  <label className="Tradecount-date-to">to</label>

                  <DatePicker
                    highlightToday={true}
                    onOpenPickNewDate={false}
                    minDate={minDate}
                    autoComplete="off"
                    value={userTradeCount.endDate.value}
                    placeholder="End date"
                    onChange={(value) =>
                      changeDateEndHandler(value?.toDate?.().toString())
                    }
                    showOtherDays={true}
                    inputClass="Tradecount-Datepicker-right"
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="tradeCount-col-search-download-btn"
                >
                  <Button
                    text="Search"
                    icon={<i className="icon-search icons-spaces"></i>}
                    onClick={onHitSearchTradeCount}
                    className={"Search-tradeCount-btn"}
                  />
                  <Button
                    text="Downlaod Excel"
                    onClick={downloadReportTradeCount}
                    icon={<i className="icon-download-excel icons-spaces"></i>}
                    className={"tradeCount-Download-Excel-btn"}
                  />
                  <Button
                    text="Reset"
                    icon={<i className="icon-refresh user-reset"></i>}
                    onClick={resetTradeHandler}
                    className="Trade-count-reset"
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col lg={12} md={12} sm={12}>
                  {auditorReducer.Spinner === true ? (
                    <span className="TradeCount-spinner">
                      <Spin size="large" />
                    </span>
                  ) : (
                    <Table
                      column={tradeColumns}
                      rows={rows}
                      pagination={false}
                      // scroll={{ x: "max-content" }}
                      className="tradeCount-table"
                    />
                  )}
                </Col>
              </Row>
              <Row className="mt-2">
                <Col lg={12} md={12} sm={12}>
                  <Pagination
                    total={totalRecords}
                    onChange={tradeCountPagination}
                    current={currentPage !== null ? currentPage : 1}
                    showSizeChanger
                    pageSizeOptions={[50, 100, 200]}
                    pageSize={currentPageSize !== null ? currentPageSize : 50}
                    className="PaginationStyle-TradeCount"
                  />
                </Col>
              </Row>
            </CustomPaper>
          </Col>
        </Row>
      </section>
      {auditorReducer.Loading || reportReducer.Loading ? <Loader /> : null}
    </Fragment>
  );
};

export default TradeCount;
