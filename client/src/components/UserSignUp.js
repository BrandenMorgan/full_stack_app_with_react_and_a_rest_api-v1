import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

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
                    submitButtonText="Sign Up"
                    elements={() => (
                        <React.Fragment>
                            <label htmlFor="name">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={name}
                                onChange={this.change}
                            />
                            <label htmlFor="emailAddress">
                                Email Address
                                </label>
                            <input
                                id="emailAddress"
                                name="emailAddress"
                                type="email"
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
                            <label htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={this.change}
                            />
                        </React.Fragment>
                    )}
                />
                <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
            </main>
        );
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;


        // if (name.includes(' ')) {
        //     // console.log("Break up first and last name");
        //     // console.log(name.indexOf(' '));
        //     const fullNameSeperator = name.indexOf(' ');
        //     const firstName = name.substr(0, fullNameSeperator);
        //     const lastName = name.substr(fullNameSeperator + 1);
        //     console.log("firstName: ", firstName);
        //     console.log("lastName: ", lastName);
        // }

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    submit = () => {
        const { context } = this.props;

        const {
            name,
            emailAddress,
            password,
            confirmPassword
        } = this.state;

        // Define firstName, lastName
        const fullNameSeperator = name.indexOf(' ');
        const firstName = name.substr(0, fullNameSeperator);
        const lastName = name.substr(fullNameSeperator + 1);
        // console.log("firstName: ", firstName);
        // console.log("lastName: ", lastName);

        // Define password comparison
        console.log("password: ", password);
        console.log("confirmPassword: ", confirmPassword);

        // New user payload
        const user = {
            firstName,
            lastName,
            emailAddress,
            confirmPassword
        };

        context.data.createUser(user)
            .then(errors => {
                if (errors.length) {
                    this.setState({ errors });
                } else {
                    context.actions.signIn(emailAddress, confirmPassword)
                        .then(() => {
                            this.props.history.push('/authenticated');
                        });
                    console.log(`${firstName} ${lastName} is successfully signed up and authenticated!`);

                }
            })
            .catch(err => { //Handle rejected promises
                console.log(err);
                this.props.history.push('/error');
            });
    }

    cancel = () => {
        this.props.history.push('/courses');
    }
}