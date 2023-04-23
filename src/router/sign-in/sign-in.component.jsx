import SignUpForm from '../../components/sign-up-form/sign-up-form.component.jsx';
import {
    createUserDocumentFromAuth,
    signInWithGooglePopup
} from '../../utils/firebase/firebase.utils.js';


const SignIn = () => {

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup()
        const userDocRef = await createUserDocumentFromAuth(user)
        console.log('userDocRef', userDocRef);
    };

    return (
        <div>
            <h1>
                ĐĂNG NHẬP
            </h1>
            <button onClick={logGoogleUser}>
                đăng nhập bằng Google
            </button>

            <SignUpForm />
        </div>
    )
}
export default SignIn;
