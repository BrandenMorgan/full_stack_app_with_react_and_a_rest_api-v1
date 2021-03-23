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
import './App.css';
import './global.css';

import withContext from './Context';
import PrivateRoute from './PrivateRoute';

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
        <PrivateRoute path='/courses/:id/update' component={UpdateCourseWithContext} />
        <Route path='/courses/:id' component={CourseDetailWithContext} />
        <Route path='/signin' component={UserSignInWithContext} />
        <Route path='/signup' component={UserSignUpWithContext} />
        <Route path='/signout' component={UserSignOutWithContext} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;

