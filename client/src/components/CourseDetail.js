import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

const CourseDetail = props => {
    // console.log(props.url);
    // console.log(props.history.location.pathname.slice(9));
    const id = props.history.location.pathname.slice(9);
    const [course, setCourse] = useState({});

    useEffect(() => {
        fetch(`${props.url}/${id}`)
            .then(res => res.json())
            .then(data => setCourse(data))
            .catch(err => console.log(err));
    }, [props.url, id]);

    console.log("Course data: ", course);
    // console.log(course.materialsNeeded);
    // let materials;
    // let materialsNeeded;
    // if (course.materialsNeeded !== null) {
    //     materials = course.materialsNeeded.split(',');
    //     materialsNeeded = materials.map((material, index) =>
    //         <li key={index}>{material}</li>
    //     );
    // }


    // if (props.course.materialsNeeded !== null) {
    //     materialsNeeded = props.course.materialsNeeded.split(',');
    // } else {
    //     materialsNeeded = <li>No materials needed for this course.</li>
    // }
    // console.log(materialsNeeded);
    // if (props.course.materialsNeeded !== null) {
    //     materialsNeeded = props.course.materialsNeeded.map(material =>
    //         <li key={props.course.id}>{material}</li>
    //     );
    // } else {
    //     materialsNeeded = <li>No materials needed for this course.</li>
    // }
    // let estimatedTime;
    // if (props.course.estimatedTime === null) {
    //     estimatedTime = <p>Time unavailable</p>;
    // } else {
    //     estimatedTime = <p>props.course.estimatedTime</p>;
    // }


    return (
        // <nav>
        //     <ul className="header--signedin">
        //         <li>Welcome, Joe Smith!</li>
        //         <li><a href="sign-out.html">Sign Out</a></li>
        //     </ul>
        // </nav>
        <main>
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By: {course.User.firstName} {course.User.lastName}</p>
                            <p>{course.description}</p>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            {course.estimatedTime}
                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <li>Stuff</li>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}
export default withRouter(CourseDetail);