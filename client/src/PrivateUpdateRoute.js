import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

const PrivateUpdateRoute = ({ component: Component, data, ...rest }) => {
    return (
        <Consumer>
            {(context, data) => (
                <Route
                    {...rest}
                    render={props => (context.authenticatedUser && context.authenticatedUser.id === data.User.id) ? (
                        <Component {...rest} {...props} />
                    ) : (
                            <Redirect to={{
                                pathname: '/forbidden',
                            }} />
                        )
                    }
                />
            )}
        </Consumer>
    );
};
export default PrivateUpdateRoute;