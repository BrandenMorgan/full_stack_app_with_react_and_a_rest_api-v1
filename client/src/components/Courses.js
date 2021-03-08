import React from 'react';
// import CourseDetail from './CourseDetail';


const Courses = props => {
    const results = props.data;

    const courses = results.map(course =>
        <a className="course--module course--link" href={`courses/${course.id}`} key={course.id}>
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{course.title}</h3>
        </a>
    );
    // const courses = results.map(course =>
    //     <CourseDetail
    //         href={`courses/${course.id}`}
    //         key={course.id}
    //         title={course.title}
    //         description={course.description}
    //         estimatedTime={course.estimatedTime}
    //         materialsNeeded={course.materialsNeeded}
    //         author={`${course.User.firstName} ${course.User.lastName}`}
    //         id={course.id}
    //     />
    // );
    return (
        <main>
            <div className="wrap main--grid">
                {courses}
            </div>
        </main>
    );
}

export default Courses;