import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import PageNotFound from '../PageNotFound/PageNotFound';
import Home from '../Home/Home';
import SomeOtherComponent from '../SomeOtherComponent/SomeOtherComponent';
import AddVacation from '../Vacations/AddVacation/AddVacation';
import EditVacation from '../Vacations/EditVacation/EditVacation';
import VacationDetails from '../Vacations/VacationDetails/VacationDetails';

interface RouterProps {}

const Router: FC<RouterProps> = () => (
  <Routes>
    {/* Home */}
    <Route path="/" element={<Home />} />
    
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
