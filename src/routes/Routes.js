import {
  Route,
  createRoutesFromElements,
  createHashRouter,
} from "react-router-dom";

import AuditTrial from "../container/Audit/AuditTrials/Audittrial";
import SecurityActivity from "../container/SecurityAdminActivity/SecurityActivity";
import AuditLogin from "../container/Auditor_Login/Login/Audit-Login";
import MainPage from "../container/Pages/mainPage/MainPage";

export const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route exact path="AuditLogin" element={<AuditLogin />} />
      <Route exact path="/" element={<MainPage />}>
        <Route path="" element={<AuditTrial />} />
        <Route path="Audit" element={<AuditTrial />} />
        <Route path="SecurityActivity" element={<SecurityActivity />} />
      </Route>
    </>
  )
);
