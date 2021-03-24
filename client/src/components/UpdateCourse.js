import React, { useState, useEffect } from 'react';
import Form from './Form';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';

const UpdateCourse = ({ context }) => {

    let history = useHistory();
    const url = history.location.pathname.slice(9);
    const id = url.replace(/\D/g, "");

    let [author, setAuthor] = useState('');
    // let [firstName, setFirstName] = useState('');
    // let [lastName, setLastName] = useState('');
    let [materials, setMaterials] = useState('');
    let [title, setTitle] = useState('');
    let [description, setDescription] = useState('');
    let [estimatedTime, setEstimatedtime] = useState('');
    let [errors, setErrors] = useState([]);


    useEffect(() => {
        context.data.api(`/courses/${id}`)
            .then(res => res.json())
            .then(data => {
                // console.log("Data confirmation: ", data);
                setAuthor(`${data.User.firstName} ${data.User.lastName}`);
                // setAuthor(data.User);
                // setFirstName(data.User.firstName);
                // setLastName(data.User.lastName);
                setMaterials(data.materialsNeeded);
                setTitle(data.title);
                setDescription(data.description);
                setEstimatedtime(data.estimatedTime);
            })
    }, [context.data, id]);


    const change = (event) => {
        const value = event.target.value;
        // console.log("materials field value: ", value);
        const name = event.target.name;
        // console.log("name of field: ", name);

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
    if (materials === null) {
        materials = "";
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
            materials
        }
        console.log("materials: ", materials);

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
                                    value={materials}
                                    onChange={change}
                                />
                            </div>
                        </React.Fragment>
                    )}
                />
            </div>
        </main>
    );
}
export default withRouter(UpdateCourse);
