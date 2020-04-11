import React, { useContext } from "react"
import { Formik } from "formik"
import { SubmitButton, Input, Checkbox, Form } from "formik-antd"
import { AuthContext } from "../shared/Context/AuthContext"
import { string, object } from 'yup';
import "./Auth.css"
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Alert } from 'antd';


const loginSchema = object().shape({
    email: string().email("Please enter a valid email").required('Please enter your email'),
    password: string().required('Please enter a password'),
})


const initialValues = { email: "", password: "" }

const LoginForm = () => {
    const auth = useContext(AuthContext)
    const handleSubmit = async (values, actions) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message)
            }
            auth.login(responseData.access_token, responseData.refresh_token)
    
        } catch (e) {
            actions.setStatus(e.toString())
            actions.setSubmitting(false)
        }
    }
    return (
        <div className="form-container">

            <Formik
                onSubmit={(values, actions) => handleSubmit(values, actions)}
                initialValues={initialValues}
                validationSchema={loginSchema}
            >
                {({ status }) => (
                    <Form>
                        {status && <Alert
                            // message="Error"
                            description={status}
                            type="error"
                            showIcon
                            style={{marginBottom:"5px"}}
                            className="tl"
                        />}
                        <Form.Item
                            name="email"
                            hasFeedback={true}
                        >
                            <Input prefix={<MailOutlined className="site-form-item-icon" />} name="email" placeholder="Email" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            hasFeedback={true}
                        >
                            <Input.Password autoComplete="on" prefix={<LockOutlined className="site-form-item-icon" />} name="password" placeholder="Password" />
                        </Form.Item>
                        <Checkbox name="rememberme">Remember Me?</Checkbox>
                        <footer>
                            <SubmitButton className="w-100 mv3" size="large"> Sign in </SubmitButton>
                        </footer>
                    </Form>
                )}
            </Formik>
        </div>)
}

export default LoginForm