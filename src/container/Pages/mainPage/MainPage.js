import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../../components/layout/Header/Header";
import Sidebar from "../../../components/layout/Sidebar/Sidebar";

const MainPage = () => {
  return (
    <Fragment>
      <Header />
      <Sidebar />
      <Outlet />
    </Fragment>
  );
};

export default MainPage;
