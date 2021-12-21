# full_stack_app_with_react_and_a_rest_api-v1

## Description

I built this project to demonstrate and exercise my fullstack skills implementing basic CRUD (Create, Read, Update, Delete) functionality.

This is a hypothetical organization tool that allows you to create, read and modify school courses all in one place, safely through the implementation of basic user authentication. This was a great learning experience. I first built REST API endpoints with Express.js. I also worked with the React Context API for the first time. Private routes, basic user-auth. Cookies in the browser.

## Installation

Since this project includes a REST API on the backend and a frontend client you will need to open two terminal windows.

To install dependencies, from one window change directories to /api and run:

```bash

npm install

```

From the other terminal window, change directories to /client and run the same command.

To run the project follow the same steps but from each window run:

```bash

npm start

```

## Usage

When you first start the application you will be brought to the homepage.

![User signup](/screenshots/CreateNewUser.png)

From here you can click on any of the existing courses to see a detailed view.

```md
![Detail view](/screenshots/DetailView.png)
```

In order to create or modify data click the “Sign Up” button in the header of the top right corner of the page.

```md
![Signup button](/screenshots/SignUp.png)
```

From here you can create a new user account.

```md
![Signup form](/screenshots/NewUserSignUp.png)
```

The first time you create a new account you will be signed in immediately. Now that you are signed in you can create and modify your own content. screen shot by clicking the “New course” card at the bottom of the courses.

```md
![Create course](/screenshots/CreateCourse.png)
```

You will be brought to an empty form to fill out.

```md
![Empty form](/screenshots/EmptyForm.png)
```

After filling out the form click the “Create Course” button at the bottom of the screen.

```md
![Filled out form](/screenshots/FilledOutFormForm.png)
```

You should see your new course listed at the bottom of the screen! To update or delete the post click one of the buttons that appear in the header.

```md
![Edit or delete](/screenshots/EditOrDelete.png)
```

## License

MIT License

Copyright (c) [2021][branden morgan]

Permission is hereby granted, free of charge, to any person obtaining a copy

of this software and associated documentation files (the "Software"), to deal

in the Software without restriction, including without limitation the rights

to use, copy, modify, merge, publish, distribute, sublicense, and/or sell

copies of the Software, and to permit persons to whom the Software is

furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all

copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR

IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,

FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE

AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER

LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,

OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE

SOFTWARE.
