import { useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import Button from "../button/button.component"
import FormInput from "../form-input/form-input.component"
import './sign-up.styles.scss'
import { useDispatch } from "react-redux"
import { signUpStart } from "../../store/user/user.action"
const defaultFromField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [formField, setformField] = useState(defaultFromField)
    const { displayName, email, password, confirmPassword } = formField
    const handleChange = (event) => {
        const { name, value } = event.target
        setformField({ ...formField, [name]: value })
    };
    const dispatch = useDispatch()
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            return alert("Mật khẩu của bạn không khớp!")
        }

        try {
          dispatch(signUpStart(email, password, displayName))
            setformField(defaultFromField)
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                return alert('Không thể tạo tài khoản, email này đã đc đăng ký ')
            }
            console.log('handleOnSubmit sign up', error);
        }
    }
    return (
        <div className="sign-up-container">
            <h2>Tạo tài khoản mới</h2>
            <span>Đăng nhập với Email và mật khẩu</span>
            <form onSubmit={handleOnSubmit}>
                <FormInput label={'Tên tài khoản'}
                    type={'text'}
                    required
                    name='displayName'
                    value={displayName}
                    onChange={handleChange} />

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


                <FormInput
                    label={'Nhập lại mật khẩu'}
                    type={'password'}
                    required
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange} />

                <Button type="submit">Đăng ký</Button>
            </form>
        </div>
    )
}
export default SignUpForm