import React, { useContext, useState } from 'react';
import { AuthContext } from "../shared/Context/AuthContext"
import { Alert, Button, Typography } from 'antd';
import "./Auth.css"

const TempAccess = () => {
    const auth = useContext(AuthContext)
    const [error, setError] = useState(undefined);
    const genTempAccount = async () => {
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        firstName: "temp",
                        lastName: "temp",
                        email: `temp@${Math.random().toString(36).substring(7)}.tmp`,
                        password: "tempp"
                    }
                )
            });
            const responseData = await response.json();
            if (!response.ok) { // if 500 or 400 this is true
                throw new Error(responseData.message) // message coming back from backend
                // this will be caught in the catch block
            }
            auth.login(responseData.access_token, responseData.refresh_token)
        } catch (e) {
            setError(e)
        }
    }
    return (
    <div className="form-container">
        {error && <Alert> {error} </Alert>}
        <Typography.Paragraph strong type={"warning"} copyable={false}>
            All data created in this temporary session will be deleted when you log out.
        </Typography.Paragraph>
        <Button type="danger" size="large" className="w-100 mv2" onClick={genTempAccount}>Continue with a temporary account</Button>
    </div>)
}
export default TempAccess;