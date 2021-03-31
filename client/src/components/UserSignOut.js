import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

/**
 * Function component that signs an authenticated user out of the current session
 * @param {Object} context data shared througout the app
 * @return redirect to the main page
 */
const UserSignOut = ({ context }) => {

    useEffect(() => context.actions.signOut());
    return (
        <Redirect to='/' />
    );
}

export default UserSignOut;