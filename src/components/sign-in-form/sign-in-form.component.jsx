import { useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils"
import Button from "../button/button.component"
import FormInput from "../form-input/form-input.component"
import './sign-in.styles.scss'
const defaultFromField = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formField, setformField] = useState(defaultFromField)
    const { email, password } = formField

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup()
        const userDocRef = await createUserDocumentFromAuth(user)
    };

    const handleChange = (event) => {
        const { name, value } = event.target
        setformField({ ...formField, [name]: value })
    };
    const handleOnSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password)
            console.log('response', response);
            setformField(defaultFromField)
        } catch (error) {
            alert(error.message)
            console.log('handleOnSubmit Sign In', error);
        }
    }
    return (
        <div className="sign-up-container">
            <h2>Đã có tài khoản</h2>
            <span>Đăng nhập bằng email và password của bạn</span>
            <form onSubmit={handleOnSubmit}>

                <FormInput
                    label={'Email'}
                    type={'email'}
                    required
                    name='email'
                    value={email}
                    onChange={handleChange} />

                <FormInput
                    label={'Mật khẩu'}
                    type={'password'}
                    required
                    name='password'
                    value={password}
                    onChange={handleChange} />
                <div className="buttons-container">
                    <Button type="submit">Đăng nhập</Button>
                    <Button
                        onClick={signInWithGoogle}
                        buttonType={'google'}
                        type="submit">Google</Button>
                </div>
            </form>
        </div>
    )
}
export default SignInForm