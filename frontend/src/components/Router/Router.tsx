import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import PageNotFound from '../PageNotFound/PageNotFound';
import Home from '../Home/Home';
import SomeOtherComponent from '../SomeOtherComponent/SomeOtherComponent';
import VacationDetails from '../Vacations/VacationDetails/VacationDetails';
import AddVacation from '../Vacations/AddVacation/AddVacation';

interface RouterProps {}

const Router: FC<RouterProps> = () => (
  <Routes>
    {/* Home */}
    <Route path="/" element={<Home />} />
    {/* Default route*/}
    <Route path="/" element={<Navigate to="/Home" />} />
    go to vacationDetails
    <Route path="/vacations/:vacationId" element={<VacationDetails />} />
    {/* edit vacation */}
    {/* <Route path={`/vacations/edit/:vacationId`} element={<EditVacation />} /> */}
    {/* add vacation */}
    <Route path={`/vacations/add_vacation`} element={<AddVacation />} />
    {/*all  views */}
    {/*all  views */}
    <Route path="/otherComponent" element={<SomeOtherComponent />} />
    {/* Page not Found */}
    <Route path="*" element={<PageNotFound />} />
  </Routes>
);

export default Router;
