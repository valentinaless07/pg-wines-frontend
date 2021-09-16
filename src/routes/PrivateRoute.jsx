import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({
    isAuthenticated,
    path,
    component,
    ...rest
}) => { 
    console.log(rest.location);
    localStorage.setItem('lastPathVisited', rest.location.pathname)
    
    if(isAuthenticated){
        return <Route path={path} component={component} {...rest} />
        
    }else{
        return <Redirect to="/login" {...rest} />
    }
    
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
    // component: PropTypes.func.isRequired
}


export default PrivateRoute;


