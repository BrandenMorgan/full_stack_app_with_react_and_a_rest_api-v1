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

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    // validate() {
    //     const {
    //         password,
    //         confirmPassword
    //     } = this.state;

    //     // let isValid = true;
    //     let passwordError;
    //     if (password !== '') {
    //         if (password !== confirmPassword) {
    //             // isValid = false;
    //             passwordError = "Passwords don't match";

    //         }
    //     }

    //     // this.setState({ errors: [...this.state.errors, passwordError] });
    //     // return isValid;
    //     return passwordError;

    // }

    submit = () => {
        const { context } = this.props;

        const {
            name,
            emailAddress,
            confirmPassword,
            password,
        } = this.state;

        // Break up name into firstName, lastName to persist to db. 
        const fullNameSeperator = name.indexOf(' ');
        let firstName;
        let lastName;
        if (fullNameSeperator === -1 && name !== '') {
            firstName = name;
        }
        else {
            firstName = name.substr(0, fullNameSeperator);
            lastName = name.substr(fullNameSeperator + 1);
        }
        console.log("firstName: ", firstName);
        console.log("lastName: ", lastName);


        // New user payload
        const user = {
            firstName,
            lastName,
            emailAddress,
            password
        };

        // Validate passwords client side. No 'Confirm password' field on the User model
        let passwordMatchError;
        if (password !== '') {
            if (password !== confirmPassword) {
                // isValid = false;
                passwordMatchError = "Passwords don't match";

            }
        }

        // let passwordConfirmationMessage;
        // if (confirmPassword === '') {
        //     passwordConfirmationMessage = 'Please retype your password';
        // }


        context.data.createUser(user)
            .then(errors => {
                if (errors.length) {
                    this.setState({ errors: [...errors, passwordMatchError] });
                } else {
                    if (!passwordMatchError && confirmPassword !== '') {
                        context.actions.signIn(emailAddress, password)
                            .then(() => {
                                this.props.history.push('/authenticated');
                            });
                        console.log(`${firstName} ${lastName} is successfully signed up and authenticated!`);
                    }
                    // context.actions.signIn(emailAddress, password)
                    //     .then(() => {
                    //         this.props.history.push('/authenticated');
                    //     });
                    // console.log(`${firstName} ${lastName} is successfully signed up and authenticated!`);

                }
            })
            .catch(err => { //Handle rejected promises
                console.log(err);
                this.props.history.push('/error');
            });


        // const passwordMatchError = this.validate();
        // this.setState({ errors: [...this.state.errors, passwordMatchError] });


        // context.data.createUser(user)
        //     .then(errors => {
        //         if (errors.length) {
        //             this.setState({ errors });
        //         } else {
        //             context.actions.signIn(emailAddress, password)
        //                 .then(() => {
        //                     this.props.history.push('/authenticated');
        //                 });
        //             console.log(`${firstName} ${lastName} is successfully signed up and authenticated!`);

        //         }
        //     })
        //     .catch(err => { //Handle rejected promises
        //         console.log(err);
        //         this.props.history.push('/error');
        //     });
    }

    cancel = () => {
        this.props.history.push('/courses');
    }
}