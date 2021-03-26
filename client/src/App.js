import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import Header from './components/Header';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import './App.css';
import './global.css';

import withContext from './Context';
import PrivateRoute from './PrivateRoute';
import PrivateUpdateRoute from './PrivateUpdateRoute';

/*
  Weird console warning
  [Deprecation] SharedArrayBuffer will require cross-origin isolation as of M91, around May 2021. See https://developer.chrome.com/blog/enabling-shared-array-buffer/ for more details.
*/

const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const HeaderWithContext = withContext(Header);
const UpdateCourseWithContext = withContext(UpdateCourse);



const App = () => (
  <BrowserRouter>
    <div>
      <HeaderWithContext />
      <Switch>
        <Route exact path='/' component={CoursesWithContext} />
        <PrivateRoute path='/courses/create' component={CreateCourseWithContext} />
        {/* <PrivateRoute path='/courses/:id/update' component={UpdateCourseWithContext} /> */}
        <PrivateUpdateRoute path='/courses/:id/update' component={UpdateCourseWithContext} />
        <Route exact path='/courses/:id' component={CourseDetailWithContext} />
        <Route path='/signin' component={UserSignInWithContext} />
        <Route path='/signup' component={UserSignUpWithContext} />
        <Route path='/signout' component={UserSignOutWithContext} />
        <Route path='/notfound' component={NotFound} />
        <Route path='/forbidden' component={Forbidden} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;

