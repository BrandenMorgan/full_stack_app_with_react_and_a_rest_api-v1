import config from "./config";

export default class Data {
  /**
   * A class providing basic functionality to the application
   *
   * A Fucntion that calls an API endpoint and returns some data on the response
   * @param {string} path the url of the api
   * @param {string} method the HTTP request to send
   * @param {Object} body either the course or the user
   * @param {bool} requiresAuth confirms if the function requires an authenticated user to execute
   * @param {Object} credentials user credentials
   * @return {Object} data returned by fetch
   */
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // Check if auth is required
    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.emailAddress}:${credentials.password}`
      );
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  /**
   * Function to retrieve user data stored in db
   * @param {string} emailAddress the users email address
   * @param {string} password the users password
   * @return user data if it exists. null if not
   */
  async getUser(emailAddress, password) {
    const response = await this.api("/users", "GET", null, true, {
      emailAddress,
      password
    });

    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  /**
   * Function to create a new user
   * @param {Object} user the user just created
   * @return an empty array if the user was created successfully. Errors if not
   */
  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
  /**
   * Function to create a new course
   * @param {Object} course  the course to create
   * @param {string} emailAddress the authenticated users email address
   * @param {string} password the authenticated users password
   * @return an empty array if successful. Errors if not
   */
  async createCourse(course, emailAddress, password) {
    const response = await this.api("/courses", "POST", course, true, {
      emailAddress,
      password
    });

    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
  /**
   * Function to update an existing course
   * @param {string} emailAddress the authenticated users email address
   * @param {string} password the authenticated users password
   * @param {string} id the unique id of the course to update
   * @param {Object} course the course to update
   * @return an empty array if successful. Errors if not
   */
  async updateCourse(emailAddress, password, id, course) {
    const response = await this.api(`/courses/${id}`, "PUT", course, true, {
      emailAddress,
      password
    });

    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
  /**
   * Function to delete a course
   * @param {string} id the unique id of the course to delete
   * @param {string} emailAddress the email address of the current authenticated user
   * @param {string} password the password of the current authenticated user
   * @return an empty array if successful. Errors if not.
   */
  async deleteCourse(id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, "DELETE", null, true, {
      emailAddress,
      password
    });
    if (response.status === 204) {
      return [];
    } else if (response.status === 403) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
}
