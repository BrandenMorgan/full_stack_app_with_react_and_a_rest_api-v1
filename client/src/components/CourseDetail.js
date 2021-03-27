import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { withRouter } from 'react-router';
import { useHistory, Redirect } from 'react-router-dom';

// Do description and materials needed need to be rendered as markdown automatically?
// or does the user have all control of that?

const CourseDetail = ({ context }) => {

    let history = useHistory();
    const id = history.location.pathname.slice(9);
    const [course, setCourse] = useState({});
    const [author, setAuthor] = useState({});
    const [materials, setMaterials] = useState();

    useEffect(() => {
        let mounted = true;
        context.data.api(`/courses/${id}`)
            .then(res => res.json())
            .then(data => {
                if (mounted) {
                    console.log("Data confirmation in course detail: ", data);
                    setCourse(data);
                    setAuthor(data.User);
                    setMaterials(data.materialsNeeded);
                }
            })
        return () => mounted = false;
    }, [context.data, id]);


    const courseOwner = author.id;
    let authenticatedUser;
    let emailAddress;


    if (context.authenticatedUser) {
        authenticatedUser = context.authenticatedUser.id;
        emailAddress = context.authenticatedUser.emailAddress;
    }

    let materialsNeeded;
    if (typeof materials === 'string') {
        materialsNeeded = materials.split(",");
    }

    const password = context.authenticatedPassword;
    const handleDelete = (e) => {
        e.preventDefault();
        context.data.deleteCourse(id, emailAddress, password);
        history.push('/');
    }


    return (

        <main>
            {
                (!course.message)
                    ?
                    <>
                        <div className="actions--bar">
                            <div className="wrap">
                                {
                                    (context.authenticatedUser && authenticatedUser === courseOwner)
                                        ?
                                        (
                                            <>
                                                <a className="button" href={`/courses/${id}/update`}>Update Course</a>
                                                <a className="button" href="/" onClick={handleDelete}>Delete Course</a>
                                                <a className="button button-secondary" href="/">Return to List</a>
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                <a className="button button-secondary" href="/">Return to List</a>
                                            </>
                                        )

                                }


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
                                        <ReactMarkdown children={course.description} />
                                    </div>
                                    <div>
                                        <h3 className="course--detail--title">Estimated Time</h3>
                                        {
                                            (course.estimatedTime === null || course.estimatedTime === '')
                                                ? <p>No time estimate available</p>
                                                : <p>{course.estimatedTime}</p>
                                        }
                                        <h3 className="course--detail--title">Materials Needed</h3>
                                        <ul className="course--detail--list">
                                            {
                                                (materials === null || materialsNeeded === undefined || materials === '')
                                                    ? <p>No materials required for this course</p>
                                                    : (materialsNeeded.map((material, index) =>
                                                        <ReactMarkdown key={index} children={material} />))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </>
                    :
                    <Redirect to={{
                        pathname: '/notfound'
                    }} />

            }

        </main>

    );
}
export default withRouter(CourseDetail);