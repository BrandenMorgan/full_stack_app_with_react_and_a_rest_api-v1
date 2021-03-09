import React, { useState, useEffect } from 'react';
// import CourseDetail from './CourseDetail';


const Courses = ({ context }) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        context.data.api('/courses')
            .then(res => res.json())
            .then(data => setData(data))
    }, [context.data]);

    const courses = data.map(course =>
        <a className="course--module course--link" href={`courses/${course.id}`} key={course.id}>
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{course.title}</h3>
        </a>
    );

    return (
        <main>
            <div className="wrap main--grid">
                {courses}
            </div>
        </main>
    );
}

export default Courses;
