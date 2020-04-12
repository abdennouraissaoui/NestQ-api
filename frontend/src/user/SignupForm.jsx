import React, { useContext } from 'react';
import { Formik } from "formik"
import { Input, SubmitButton, Form } from "formik-antd"
import { string, object, ref } from 'yup';
import "./Auth.css"
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { AuthContext } from "../shared/Context/AuthContext"
import { Alert } from 'antd';

const SignupSchema = object().shape({
    email: string().email("Please enter a valid email").required('Please enter your email'),
    password: string().required('Please enter a password').min(5, "Please enter at least 5 charachters"),
    passwordConfirmation: string().oneOf([ref("password"), null], "Passwords must match"),
    firstName: string().required('Please enter your first name'),
    lastName: string().required('Please enter your last name'),
})

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: ""
}

const SignupForm = () => {
    const auth = useContext(AuthContext)
    const handleSubmit = async (values, actions) => {
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            const responseData = await response.json();
            if (!response.ok) { // if 500 or 400 this is true
                throw new Error(responseData.message) // message coming back from backend
                // this will be caught in the catch block
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
                validationSchema={SignupSchema}
            >
                {({ status }) => (
                    <Form>
                        {status && <Alert
                            // message="Error"
                            description={status}
                            type="error"
                            showIcon
                            style={{ marginBottom: "5px" }}
                            className="tl"
                        />}
                        <Form.Item
                            name="firstName"
                            hasFeedback={true}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} name="firstName" placeholder="First name" />
                        </Form.Item>

                        <Form.Item
                            name="lastName"
                            hasFeedback={true}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} name="lastName" placeholder="Last name" />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            hasFeedback={true}
                        >
                            <Input prefix={<MailOutlined className="site-form-item-icon" />} name="email" type="email" placeholder="Email" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            hasFeedback={true}
                            showValidateSuccess={true}
                        >
                            <Input.Password autoComplete="off" prefix={<LockOutlined className="site-form-item-icon" />} name="password" placeholder="Password" />
                        </Form.Item>

                        <Form.Item
                            name="passwordConfirmation"
                            hasFeedback={true}
                            showValidateSuccess={true}
                        >
                            <Input.Password autoComplete="off" prefix={<LockOutlined className="site-form-item-icon" />} name="passwordConfirmation" placeholder="Confirm Password" />
                        </Form.Item>
                        <footer>
                            <SubmitButton className="w-100 mv2" size="large"> Start using NestQ! </SubmitButton>
                        </footer>
                    </Form>
                )}
            </Formik>
        </div>)
}
export default SignupForm;