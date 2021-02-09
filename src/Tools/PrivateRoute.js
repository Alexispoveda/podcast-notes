//React
import React,{useContext} from 'react';

//React Router
import { Route, Redirect } from 'react-router-dom';

//Context
import {UserContext} from './UserContext';

const PrivateRoute = ({component: Component, ...rest}) => {

    const {currentUser} = useContext(UserContext);

    return (
        <Route {...rest} render={props => (
            !!currentUser ?
                <Component {...props} {...rest}/>
            : <Redirect to="/acceder" />
            )} 
        />
    );
};

export default PrivateRoute;