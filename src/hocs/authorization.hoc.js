import React  from 'react';
import { getToken } from '../utils';
import { Route, Navigate  } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    let token =  getToken();
    if(token){
     return <Route {...rest} element={ <Component  />} />
    }
    else {
    return <Route {...rest} element={ <Navigate to={'/login'} replace />} />
   }
}

export default ProtectedRoute;
