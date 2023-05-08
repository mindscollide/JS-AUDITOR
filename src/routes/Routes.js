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
      <Route exact path="/" element={<AuditLogin />} />
      <Route exact path="/JS/" element={<MainPage />}>
        <Route path="Home" element={<AuditTrial />} />
        <Route path="" element={<AuditTrial />} />
        <Route path="SecurityActivity" element={<SecurityActivity />} />
      </Route>
    </>
  )
);
