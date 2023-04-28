import SignInForm from '../../components/sign-in-form/sign-in-form.component.jsx';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component.jsx';
import {
    createUserDocumentFromAuth,
    signInWithGooglePopup
} from '../../utils/firebase/firebase.utils.js';


const Authentication = () => {

    return (
        <div>
            <h1>
                ĐĂNG NHẬP
            </h1>
            <SignInForm />
            <SignUpForm />
        </div>
    )
}
export default Authentication;
