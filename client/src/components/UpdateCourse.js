import React, { useState, useEffect } from 'react';
import Form from './Form';
import { withRouter } from 'react-router';
import { useHistory, Redirect } from 'react-router-dom';

const UpdateCourse = ({ context }) => {

    let history = useHistory();
    const url = history.location.pathname.slice(9);
    const id = url.match(/([^/]+)/)[0];

    let [author, setAuthor] = useState('');
    let [materialsNeeded, setMaterials] = useState('');
    let [title, setTitle] = useState('');
    let [description, setDescription] = useState('');
    let [estimatedTime, setEstimatedtime] = useState('');
    let [courseOwnerId, setCourseOwnerId] = useState();
    let [errors, setErrors] = useState([]);
    let [course, setCourse] = useState({});


    // Try adding loading logic

    useEffect(() => {
        let mounted = true;
        context.data.api(`/courses/${id}`)
            .then(res => res.json())
            .then(data => {
                if (mounted) {
                    console.log("Data confirmation: ", data);
                    setCourse(data);
                    setAuthor(data.User);
                    setCourseOwnerId(data.User.id);
                    setMaterials(data.materialsNeeded);
                    setTitle(data.title);
                    setDescription(data.description);
                    setEstimatedtime(data.estimatedTime);
                }
            })
        return () => mounted = false;
    }, [context.data, id]);

    // const courseOwner = author.id;
    let authenticatedUser;

    if (context.authenticatedUser) {
        authenticatedUser = context.authenticatedUser.id;
    }

    console.log(courseOwnerId === authenticatedUser);
    console.log("courseownerId: ", courseOwnerId, "authenticatedUser", authenticatedUser);

    const change = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        switch (name) {
            case "courseTitle":
                setTitle(value);
                break;
            case "courseAuthor":
                setAuthor(value);
                break;
            case "courseDescription":
                setDescription(value);
                break;
            case "estimatedTime":
                setEstimatedtime(value);
                break;
            case "materialsNeeded":
                setMaterials(value);
                break;
            default:
                return;
        }
    }

    if (estimatedTime === null) {
        estimatedTime = "";
    }
    if (materialsNeeded === null) {
        materialsNeeded = "";
    }



    const cancel = () => {
        history.push('/');
    }

    const submit = () => {
        const course = {
            title,
            author,
            description,
            estimatedTime,
            materialsNeeded,
        };

        const emailAddress = context.authenticatedUser.emailAddress;
        const password = context.authenticatedPassword;

        context.data.updateCourse(emailAddress, password, id, course)
            .then(errors => {
                if (errors.length) {
                    setErrors(errors);
                } else {
                    history.push('/');
                    console.log("You have successfully updated the course!")
                }
            })
            .catch((err) => {
                console.log(err);
                history.push('/error');
            });
    }

    console.log("Course data: ", Object.keys(course).length === 0);


    return (
        <main>
            {

                (!course.message)
                    ?
                    (authenticatedUser === courseOwnerId)
                        ?
                        <>
                            <div className="wrap">
                                <h2>Update Course</h2>
                                <Form
                                    id={id}
                                    cancel={cancel}
                                    submit={submit}
                                    errors={errors}
                                    submitButtonText="Update Course"
                                    elements={() => (
                                        <React.Fragment>
                                            <div>
                                                <label htmlFor="courseTitle">
                                                    Course Title
                                            </label>
                                                <input
                                                    id="courseTitle"
                                                    name="courseTitle"
                                                    type="text"
                                                    value={title}
                                                    onChange={change}
                                                />
                                                <label htmlFor="courseAuthor">
                                                    Course Author
                                            </label>
                                                <input
                                                    id="courseAuthor"
                                                    name="courseAuthor"
                                                    type="text"
                                                    value={`${author.firstName} ${author.lastName}`}
                                                    onChange={change}
                                                />
                                                <label htmlFor="courseDescription">
                                                    Course Description
                                            </label>
                                                <textarea
                                                    id="courseDescription"
                                                    name="courseDescription"
                                                    value={description}
                                                    onChange={change}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="estimatedTime">
                                                    Estimated Time
                                            </label>
                                                <input
                                                    id="estimatedTime"
                                                    name="estimatedTime"
                                                    type="text"
                                                    value={estimatedTime}
                                                    onChange={change}
                                                />
                                                <label htmlFor="materialsNeeded">
                                                    Materials Needed
                                            </label>
                                                <textarea
                                                    id="materialsNeeded"
                                                    name="materialsNeeded"
                                                    value={materialsNeeded}
                                                    onChange={change}
                                                />
                                            </div>
                                        </React.Fragment>
                                    )}
                                />
                            </div>
                        </>
                        :
                        <Redirect
                            to={{
                                pathname: '/forbidden'
                            }}
                        />
                    :
                    <Redirect
                        to={{
                            pathname: '/notfound'
                        }}
                    />

            }

        </main>
    );
}
export default withRouter(UpdateCourse);
