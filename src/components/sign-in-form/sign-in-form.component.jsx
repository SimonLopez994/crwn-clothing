import { useState } from "react";
import { createAuthWithEmailAndPassword, signInWithGooglePopup, createUserDocFromAuth, signInUserAuthWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button from "../button/button.component";

const defaultFormField = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formField, setFormField] = useState(defaultFormField);
    const { email, password } = formField;


    console.log(formField)

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            const { user } = await signInUserAuthWithEmailAndPassword(email, password)
 
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break
                case 'auth/invalid-credential':
                    alert('invalid credentials');
                    break
                case 'auth/weak-password':
                    alert('Password should be at least 6 characters');
                    break

                default:
                    console.log('this is the error:', error)
            }




        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormField({ ...formField, [name]: value })
    }


    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Email" type="email" onChange={handleChange} required name="email" value={email} />

                <FormInput label="Password" type="password" onChange={handleChange} required name="password" value={password} />

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button  buttonType="google" type="button" onClick={signInWithGoogle}>Google Sign In</Button>
                </div>

            </form>
        </div>
    )
}
export default SignInForm;