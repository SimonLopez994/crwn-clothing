import { useState } from "react";
import { createAuthWithEmailAndPassword, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {

    const [formField, setFormField] = useState(defaultFormField);
    const { displayName, email, password, confirmPassword } = formField;

    console.log('hit')

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        try {
            const { user } = await createAuthWithEmailAndPassword(email, password);


            await createUserDocFromAuth(user, { displayName })


        } catch (error) {
            console.log('user creation encountered an error', error)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormField({ ...formField, [name]: value })
    }


    return (
        <div className="sign-up-container">
            <h2>Dont have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="DisplayName" type="text" onChange={handleChange} required name="displayName" value={displayName} />

                <FormInput label="Email" type="email" onChange={handleChange} required name="email" value={email} />

                <FormInput label="Password" type="password" onChange={handleChange} required name="password" value={password} />

                <FormInput label="Confirm Password" type="password" onChange={handleChange} required name="confirmPassword" value={confirmPassword} />

                <Button buttonType="google" type="submit">Sign Up</Button>
            </form>
        </div>
    )
}
export default SignUpForm;