import { Fragment } from "react"
import { signInWithGooglePopup, createUserDocFromAuth } from "../../utils/firebase/firebase.utils"

const SignIn = () => {
    const logWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        const userRef = await createUserDocFromAuth(user)
        console.log(userRef);
    }
    return (
        <Fragment>
            <h1>Sign In your account</h1>
            <button onClick={logWithGoogle}>Sign in With Google</button>
        </Fragment>
    )
}
export default SignIn;