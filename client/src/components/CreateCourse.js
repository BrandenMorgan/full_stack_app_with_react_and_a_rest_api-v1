import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component {
    state = {
        courseTitle: '',
        courseAuthor: '',
        courseDescription: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: [],
    }

    render() {
        const {
            courseTitle,
            courseAuthor,
            courseDescription,
            estimatedTime,
            materialsNeeded,
            errors,
        } = this.state;
        console.log(courseDescription);



        return (
            <main>
                <div className="wrap">
                    <h2>Create Course</h2>
                    {/* <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            <li>Please provide a value for "Title"</li>
                            <li>Please provide a value for "Description"</li>
                        </ul>
                    </div> */}


                    <Form
                        cancel={this.cancel}
                        submit={this.submit}
                        errors={errors}
                        submitButtonText="Create Course"
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
                                        value={courseTitle}
                                        onChange={this.change}
                                    />
                                    <label htmlFor="courseAuthor">
                                        Course Author
                                            </label>
                                    <input
                                        id="courseAuthor"
                                        name="courseAuthor"
                                        type="text"
                                        value={courseAuthor}
                                        onChange={this.change}
                                    />
                                    <label htmlFor="courseDescription">
                                        Course Description
                                            </label>
                                    <textarea
                                        id="courseDescription"
                                        name="courseDescription"
                                        value={courseDescription}
                                        onChange={this.change}
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
                                        onChange={this.change}
                                    />
                                    <label htmlFor="materialsNeeded">
                                        Materials Needed
                                            </label>
                                    <textarea
                                        id="materialsNeeded"
                                        name="materialsNeeded"
                                        value={materialsNeeded}
                                        onChange={this.change}
                                    />
                                </div>

                            </React.Fragment>
                        )}
                    />
                </div>
            </main>
        );
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    };

    submit = () => {
        const { context } = this.props;

        const {
            courseTitle,
            courseAuthor,
            courseDescription,
            estimatedTime,
            materialsNeeded,
        } = this.state;

        const course = {
            courseTitle,
            courseAuthor,
            courseDescription,
            estimatedTime,
            materialsNeeded
        };

        context.data.createCourse(course)
            .then(errors => {
                if (errors.length) {
                    this.setState({ errors });
                } else {
                    this.props.history.push('/courses');
                    console.log(`Course ${courseTitle} successfully created by ${courseAuthor}!`);
                }
            })
            .catch(err => {
                console.log(err);
                this.props.history.push('/error');
            });
    }

    cancel = () => {
        this.props.history.push('/courses');
    }
}

