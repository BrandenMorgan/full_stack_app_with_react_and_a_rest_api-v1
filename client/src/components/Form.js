import React from 'react';
import { useHistory } from 'react-router-dom';

const Form = (props) => {
    let history = useHistory();
    const form = history.location.pathname.slice(1);

    const {
        cancel,
        errors,
        submit,
        submitButtonText,
        elements
    } = props;

    function handleSubmit(event) {
        event.preventDefault();
        submit();
    }

    function handleCancel(event) {
        event.preventDefault();
        cancel();
    }

    return (
        <div className="form--centered">
            {
                (form === 'signup')
                    ? <h2>Sign Up</h2>
                    : <h2>Sign In</h2>
            }

            <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
                {elements()}
                <button className="button" type="submit">{submitButtonText}</button>
                <button className="button button-secondary" onClick={handleCancel} >Cancel</button>
            </form>
        </div>

    );
}

function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;

    if (errors.length) {
        errorsDisplay = (
            <div>
                {/* Look into validation error styling */}
                <h2 className="validation--errors--label">Validation errors</h2>
                <div className="validation-errors">
                    <ul>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                </div>
            </div>
        );
    }
    return errorsDisplay;
}


export default Form;