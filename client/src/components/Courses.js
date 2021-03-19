import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Ask Whether to use Link or href
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
            {
                context.authenticatedUser ?
                    <React.Fragment>
                        <div className="wrap main--grid">
                            {courses}
                            <a className="course--module course--add--module" href="/create">
                                <span className="course--add--title">
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                                    New Course
                                </span>
                            </a>
                        </div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <div className="wrap main--grid">
                            {courses}
                        </div>
                    </React.Fragment>
            }
        </main>
    );
}

export default Courses;
