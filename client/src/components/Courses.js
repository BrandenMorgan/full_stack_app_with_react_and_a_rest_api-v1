import React from 'react';

const Courses = props => {
    const results = props.data;

    const courses = results.map(course =>
        <a className="course--module course--link" href="course-detail.html" key={course.id}>
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