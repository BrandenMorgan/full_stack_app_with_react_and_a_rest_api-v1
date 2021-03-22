import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';

const CourseDetail = ({ context }) => {

    let history = useHistory();
    const id = history.location.pathname.slice(9);
    const [course, setCourse] = useState({});
    const [author, setAuthor] = useState({});
    const [materials, setMaterials] = useState();

    // if (course.materialsNeeded !== null) {
    //     materials = course.materialsNeeded.split(',');
    //     materialsNeeded = materials.map((material, index) =>
    //         <li key={index}>{material}</li>
    //     );
    // } else {
    //     materialsNeeded = <p>No materials are needed for this course</p>;
    // }


    useEffect(() => {
        context.data.api(`/courses/${id}`)
            .then(res => res.json())
            .then(data => setCourse(data))
    }, [context.data, id]);

    useEffect(() => {
        context.data.api(`/courses/${id}`)
            .then(res => res.json())
            .then(data => setAuthor(data.User))
    }, [context.data, id])

    useEffect(() => {
        context.data.api(`/courses/${id}`)
            .then(res => res.json())
            .then(data => setMaterials(data.materialsNeeded))
    }, [context.data, id])

    // console.log("Course data: ", course.materialsNeeded.split(","));
    // materialsNeeded = materials.map((material, index) =>
    //     <li key={index}>{material}</li>
    // )

    // console.log(typeof materials);
    // for (let material of materials) {
    //     console.log(material);
    // }


    // if (materials !== null || materials !== [null] || materials !== []) {
    //     // let materialsResponse = materials.split(',');
    //     // console.log(materialsResponse);
    //     // console.log(typeof materials);
    //     materialsNeeded = materials.map((material, index) =>
    //         <li key={index}>{material}</li>
    //     )
    // } else {
    //     materialsNeeded = <li>No materials are needed for this course</li>;
    // }



    /**
     *     {
                                    (course.materialsNeeded !== null)
                                        ? materials = course.materialsNeeded.split(',')
                                            (materialsNeeded = materials.map((material, index) =>
                                                <li key={index}>{material}</li>
                                            ))
                                        : materialsNeeded = <p>No materials are needed for this course</p>
                                }
     */


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
    let materialsNeeded;
    if (typeof materials === 'string') {
        console.log("Materials are a string.");
        materialsNeeded = materials.split(",");
    }
    console.log("Materials needed array: ", materialsNeeded);

    console.log("Estimated time: ", course.estimatedTime)
    return (
        // <nav>
        //     <ul className="header--signedin">
        //         <li>Welcome, Joe Smith!</li>
        //         <li><a href="sign-out.html">Sign Out</a></li>
        //     </ul>
        // </nav>
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <a className="button" href="update-course.html">Update Course</a>
                    <a className="button" href="#">Delete Course</a>
                    <a className="button button-secondary" href="/courses">Return to List</a>
                </div>
            </div>

            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By: {author.firstName} {author.lastName}</p>
                            <p>{course.description}</p>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            {
                                (course.estimatedTime === null)
                                    ? <p>No time estimate available</p>
                                    : <p>{course.estimatedTime}</p>
                            }
                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                {
                                    (materials === null || materialsNeeded === undefined)
                                        ? <p>No materials required for this course</p>
                                        : (materialsNeeded.map((material, index) =>
                                            <li key={index}>{material}</li>))
                                }
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}
export default withRouter(CourseDetail);