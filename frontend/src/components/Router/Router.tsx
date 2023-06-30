import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import PageNotFound from '../PageNotFound/PageNotFound';
import Home from '../Home/Home';
import SomeOtherComponent from '../SomeOtherComponent/SomeOtherComponent';
import AddVacation from '../Vacations/AddVacation/AddVacation';
import EditVacation from '../Vacations/EditVacation/EditVacation';
import VacationDetails from '../Vacations/VacationDetails/VacationDetails';
import Logout from '../AuthArea/Logout/Logout';
import Login from '../AuthArea/Login/Login';
import Register from '../AuthArea/Register/Register';

interface RouterProps {}

const Router: FC<RouterProps> = () => (
  <Routes>
    {/* Home */}
    <Route path="/" element={<Home />} />
    {/* Register */}
    <Route path="/register" element={<Register />}></Route>
    {/* Logout */}
    <Route path="/Logout" element={<Logout />}></Route>
    {/* Login */}
    <Route path="/login" element={<Login />}></Route>
    {/* Default route*/}
    <Route path="/" element={<Navigate to="/Home" />} />
    go to vacationDetails
    <Route path="/vacations/:vacationId" element={<VacationDetails />} />
    {/* add vacation */}
    <Route path="/vacations/add_vacation" element={<AddVacation />} />
    {/*all  views */}
    <Route path="/otherComponent" element={<SomeOtherComponent />} />
    {/* Page not Found */}
    <Route path="*" element={<PageNotFound />} />
  </Routes>
);

export default Router;
