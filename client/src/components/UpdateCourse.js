import React, { useState, useEffect } from 'react';
import Form from './Form';
import { withRouter } from 'react-router';
import { useHistory, Redirect } from 'react-router-dom';

const UpdateCourse = ({ context }) => {

    let history = useHistory();
    const url = history.location.pathname.slice(9);
    const id = url.replace(/\D/g, "");

    let [author, setAuthor] = useState('');
    // let [firstName, setFirstName] = useState('');
    // let [lastName, setLastName] = useState('');
    let [materialsNeeded, setMaterials] = useState('');
    let [title, setTitle] = useState('');
    let [description, setDescription] = useState('');
    let [estimatedTime, setEstimatedtime] = useState('');
    let [errors, setErrors] = useState([]);
    let [course, setCourse] = useState({});


    useEffect(() => {
        let mounted = true;
        context.data.api(`/courses/${id}`)
            .then(res => res.json())
            .then(data => {
                if (mounted) {
                    // console.log("Data confirmation: ", data);
                    setCourse(data);
                    setAuthor(`${data.User.firstName} ${data.User.lastName}`);
                    // setAuthor(data.User);
                    // setFirstName(data.User.firstName);
                    // setLastName(data.User.lastName);
                    setMaterials(data.materialsNeeded);
                    setTitle(data.title);
                    setDescription(data.description);
                    setEstimatedtime(data.estimatedTime);
                }
                // console.log("Data confirmation: ", data);
                // setCourse(data);
                // setAuthor(`${data.User.firstName} ${data.User.lastName}`);
                // // setAuthor(data.User);
                // // setFirstName(data.User.firstName);
                // // setLastName(data.User.lastName);
                // setMaterials(data.materialsNeeded);
                // setTitle(data.title);
                // setDescription(data.description);
                // setEstimatedtime(data.estimatedTime);
            })
        return () => mounted = false;
    }, [context.data, id]);

    console.log(course.message);

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


    return (
        <main>
            {
                (!course.message)
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
                                                value={author}
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
                            pathname: '/notfound'
                        }}
                    />
            }

        </main>
    );
}
export default withRouter(UpdateCourse);
