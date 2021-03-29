import React, { useState, useEffect } from 'react';


// Ask Whether to use Link or href
const Courses = ({ context }) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        context.data.api('/courses')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(error => console.log('Error fetching and parsing data', error))
            .finally(() => setIsLoading(false));
    }, [context.data]);

    const courses = data.map(course =>
        <a className="course--module course--link" href={`courses/${course.id}`} key={course.id}>
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{course.title}</h3>
        </a>
    );
    // Ask about conditionally rendering the New Course button
    return (
        <main>
            {
                context.authenticatedUser ?
                    <React.Fragment>
                        <div className="wrap main--grid">
                            {
                                isLoading
                                    ? <h2>Loading...</h2>
                                    : <React.Fragment>
                                        {courses}
                                        <a className="course--module course--add--module" href="courses/create">
                                            <span className="course--add--title">
                                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                    viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                                                New Course
                                            </span>
                                        </a>
                                    </React.Fragment>
                            }
                        </div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <div className="wrap main--grid">
                            {
                                isLoading
                                    ? <h2>Loading...</h2>
                                    : <React.Fragment>{courses}</React.Fragment>
                            }
                        </div>
                    </React.Fragment>
            }
        </main>
    );
}

export default Courses;
