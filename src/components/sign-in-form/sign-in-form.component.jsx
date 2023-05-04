import { useState } from "react"
import { createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils"
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
        await signInWithGooglePopup()
    };

    const handleChange = (event) => {
        const { name, value } = event.target
        setformField({ ...formField, [name]: value })
    };
    const handleOnSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password)
            setformField(defaultFromField)
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Sai mật khẩu!! Vui lòng kiểm tra lại.')
                    break;
                case 'auth/user-not-found':
                    alert('Không tìm thấy thông tin tài khoản.')
                    break;

                default:
                    alert(error.code)
                    break;
            }
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
                        type="button">Google</Button>
                </div>
            </form>
        </div>
    )
}
export default SignInForm