import React from 'react';

const CourseDetail = props => {
    console.log(props.course);
    let materialsNeeded;
    if (props.course.materialsNeeded !== null) {
        materialsNeeded = props.course.materialsNeeded.map(material =>
            <li key={props.course.id}>{material}</li>
        );
    } else {
        materialsNeeded = <li>No materials needed for this course.</li>
    }


    return (
        // <nav>
        //     <ul className="header--signedin">
        //         <li>Welcome, Joe Smith!</li>
        //         <li><a href="sign-out.html">Sign Out</a></li>
        //     </ul>
        // </nav>
        <main>
            <div class="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div class="main--flex">
                        <div>
                            <h3 class="course--detail--title">Course</h3>
                            <h4 class="course--name">{props.course.title}</h4>
                            <p>By: {props.course.author}</p>
                            <p>{props.course.description}</p>
                        </div>
                        <div>
                            <h3 class="course--detail--title">Estimated Time</h3>
                            <p>{props.course.estimatedTime}</p>

                            <h3 class="course--detail--title">Materials Needed</h3>
                            <ul class="course--detail--list">
                                {materialsNeeded}
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}
export default CourseDetail;