import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import Header from './components/Header';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import './App.css';
import './global.css';

import withContext from './Context';

const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const CreateCourseWithContext = withContext(CreateCourse);

const App = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route exact path='/courses' component={CoursesWithContext} />
        <Route path='/courses/:id' component={CourseDetailWithContext} />
        <Route path='/signin' component={UserSignInWithContext} />
        <Route path='/signup' component={UserSignUpWithContext} />
        <Route path='/create' component={CreateCourseWithContext} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;

// Main container
// function App() {
//   const apiUrl = 'http://localhost:5000/api/courses';

//   const [data, setData] = useState([]);
//   // const [course, setCourse] = useState({});
//   // const [author, setAuthor] = useState({});
//   // const [materialsNeeded, setMaterialsNeeded] = useState('');

//   // const getCourseById = (id) => {
//   //   const url = `http://localhost:5000/api/courses/${id}`;
//   //   fetch(url)
//   //     .then(res => res.json())
//   //     .then(course => setCourse(course))
//   // };

//   useEffect(() => {
//     fetch(apiUrl)
//       .then(res => res.json())
//       .then(data => setData(data))
//   }, []);
//   // useEffect(() => {
//   //   fetch(`http://localhost:5000/api/courses/9`)
//   //     .then(res => res.json())
//   //     .then(data => setCourse(data))
//   // }, []);
//   // useEffect(() => {
//   //   fetch(`http://localhost:5000/api/courses/9`)
//   //     .then(res => res.json())
//   //     .then(data => setAuthor(data.User))
//   // }, []);

//   // useEffect(() => {
//   //   fetch(`http://localhost:5000/api/courses/9`)
//   //     .then(res => res.json())
//   //     .then(data => setMaterialsNeeded(data.materialsNeeded))
//   // }, []);
//   // console.log("from App: ", course);
//   // console.log("user from App: ", course.User);
//   // let materials = course.materialsNeeded.split(', ');
//   // console.log("Materials: ", materials);

//   return (
//     <BrowserRouter>
      // <div className="App">
      //   <header>
      //     <div className="wrap header--flex">
      //       <h1 className="header--logo"><a href="index.html">Courses</a></h1>
      //       <nav>
      //         <ul className="header--signedout">
      //           <li><a href="sign-up.html">Sign Up</a></li>
      //           <li><a href="sign-in.html">Sign In</a></li>
      //         </ul>
      //       </nav>
      //     </div>
      //   </header>
//         <Switch>
//           <Route exact path='/courses' render={() => <Courses data={data} />} />
//           <Route path='/courses/:id' render={() => <CourseDetail url={apiUrl} data={data} />} />
//           {/* <main>
//           <div class="wrap main--grid">
//             <a class="course--module course--link" href="course-detail.html">
//               <h2 class="course--label">Course</h2>
//               <h3 class="course--title">Build a Basic Bookcase</h3>
//             </a>
//             <a class="course--module course--link" href="course-detail.html">
//               <h2 class="course--label">Course</h2>
//               <h3 class="course--title">Learn How to Program</h3>
//             </a>
//             <a class="course--module course--link" href="course-detail.html">
//               <h2 class="course--label">Course</h2>
//               <h3 class="course--title">Learn How to Test Programs</h3>
//             </a>
//             <a class="course--module course--add--module" href="create-course.html">
//               <span class="course--add--title">
//                 <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
//                   viewBox="0 0 13 13" class="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
//                 New Course
//                       </span>
//             </a>
//           </div>
//         </main> */}
//         </Switch>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;
