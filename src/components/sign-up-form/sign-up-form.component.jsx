import { useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import FormInput from "../form-input/form-input.component"

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
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            return alert("Mật khẩu của bạn không khớp!")
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password)
            await createUserDocumentFromAuth(user, { displayName })
            setformField(defaultFromField)
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                return alert('Không thể tạo tài khoản, email này đã đc đăng ký ')
            }
            console.log('handleOnSubmit sign up', error);
        }
    }
    return (
        <div>
            <h1>Đăng nhập với Email và mật khẩu</h1>
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

                <button type="submit">Đăng ký</button>
            </form>
        </div>
    )
}
export default SignUpForm