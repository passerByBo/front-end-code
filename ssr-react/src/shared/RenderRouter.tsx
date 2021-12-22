import React from "react";
import { Link, useNavigate, useLocation, useRoutes } from "react-router-dom";
import routes from './Routes';

const RenderRoute = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const element = useRoutes(routes);
    return element;
}

export default RenderRoute;