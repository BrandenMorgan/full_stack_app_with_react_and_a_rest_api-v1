import React, { useState, useEffect } from 'react';


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
                <a class="course--module course--add--module" href="create-course.html">
                    <span class="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 13 13" class="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </a>
            </div>
        </main>
    );
}

export default Courses;
