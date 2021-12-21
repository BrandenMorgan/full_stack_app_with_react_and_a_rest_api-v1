import React, { Component } from "react";
import Cookies from "js-cookie";
import Data from "./Data";

const Context = React.createContext();

export class Provider extends Component {
  /**
   * Provider class component that gives the application access globally to data
   */

  // Set cookies on the user and their password to use in the application
  state = {
    authenticatedUser: Cookies.getJSON("authenticatedUser") || null,
    authenticatedPassword: Cookies.getJSON("authenticatedPassword") || null
  };

  // Get access to Data.js
  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser, authenticatedPassword } = this.state;

    // Object passed to Context.Provider component
    const value = {
      authenticatedUser,
      authenticatedPassword,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      }
    };

    // Make all data/methods available globally
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }
  /**
   * Function to sign in existing user
   * @param {string} emailAddress The users email address
   * @param {string} password The users password
   * @return {Object} The user object requested when a user signs in
   */
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
          authenticatedPassword: password
        };
      });
      // Set cookie
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
      Cookies.set("authenticatedPassword", JSON.stringify(password), {
        expires: 1
      });
    }
    return user;
  };

  /**
   * Function to sign out user and remove them from global state and cookies
   */
  signOut = () => {
    this.setState({
      authenticatedUser: null,
      authenticatedPassword: null
    });
    Cookies.remove("authenticatedUser");
    Cookies.remove("authenticatedPassword");
  };
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
