import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';


import PageNotFound from '../PageNotFound/PageNotFound';
import Home from "../Home/Home";
import SomeOtherComponent from "../SomeOtherComponent/SomeOtherComponent";


interface RouterProps { }

const Router: FC<RouterProps> = () => (
    <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

         {/* Default route
        <Route path="/" element={<Navigate to="/home" />} /> */}

        {/*all  views*/}
        <Route path="/otherComponent" element={<SomeOtherComponent />} />




        {/* Page not Found */}
        <Route path="*" element={<PageNotFound />} />

    </Routes>
);

export default Router;

