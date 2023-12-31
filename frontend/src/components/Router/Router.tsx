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
import AdminArea from '../AdminArea/AdminArea';

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
    {/* go to vacationDetails */}
    <Route path="/vacations/:vacationId" element={<VacationDetails />} />
    {/* add vacation */}
    <Route path="/vacations/add_vacation" element={<AddVacation />} />
    {/* edit vacation */}
    <Route path="/vacations/:vacationId/edit" element={<EditVacation />} />
    {/*all  views */}
    <Route path="/admin" element={<AdminArea />} />
    {/* Page not Found */}
    <Route path="*" element={<PageNotFound />} />
  </Routes>
);

export default Router;
