import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';

const CourseDetail = ({ context }) => {

    let history = useHistory();
    const id = history.location.pathname.slice(9);
    const [course, setCourse] = useState({});
    const [author, setAuthor] = useState({});
    const [materials, setMaterials] = useState();


    useEffect(() => {
        context.data.api(`/courses/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log("Data confirmation in course detail: ", data);
                setCourse(data);
                setAuthor(data.User);
                setMaterials(data.materialsNeeded);
            })
    }, [context.data, id]);


    let materialsNeeded;
    if (typeof materials === 'string') {
        materialsNeeded = materials.split(",");
    }

    const emailAddress = context.authenticatedUser.emailAddress;
    const password = context.authenticatedPassword;
    const handleDelete = (e) => {
        e.preventDefault();
        context.data.deleteCourse(id, emailAddress, password);
        history.push('/');
    }

    return (

        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <a className="button" href={`/courses/${id}/update`}>Update Course</a>
                    <a className="button" href="/" onClick={handleDelete}>Delete Course</a>
                    <a className="button button-secondary" href="/">Return to List</a>
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