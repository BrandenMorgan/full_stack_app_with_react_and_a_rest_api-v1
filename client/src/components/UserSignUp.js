import React, { Component } from 'react';

export default class UserSignUp extends Component {
    state = {
        name: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errors: []
    }

    render() {
        const {
            name,
            emailAddress,
            password,
            confirmPassword,
            errors,
        } = this.state;

        return (
            <main>
                <Form
                    cancel={this.cancel}
                    submit={this.submit}
                    errors={errors}
                    submitButtonText="Sign In"
                    elements={() => (
                        <React.Fragment>
                            <label htmlFor="emailAddress">
                                Email Address
                                </label>
                            <input
                                id="emailAddress"
                                name="emailAddress"
                                value={emailAddress}
                                onChange={this.change}

                            />
                            <label htmlFor="password">
                                Password
                                </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={this.change}

                            />
                        </React.Fragment>
                    )}
                />
                <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
            </main>
        );
    }
}