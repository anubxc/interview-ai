import React, { useState } from 'react'
import { useNavigate, Link } from "react-router"
import { useAuth } from '../hooks/useAuth.js'

const Register = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { loading, handleRegister } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await handleRegister({ username, email, password });
        if (success) navigate("/login")
    }

    if (loading) {
        return (<main><h1>Loading...</h1></main>)
    }

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" id="email" placeholder="Enter your email" name="email" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text" id="username" placeholder="Enter your username" name="username" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" id="password" placeholder="Enter your password" name="password" required />
                    </div>

                    <button className="button button-primary" type="submit">Register</button>
                </form>
                <p>Already have an Account? <Link to={"/login"}>Login</Link></p>
            </div>
        </main>
    )
}

export default Register