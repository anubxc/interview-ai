import React, { useState } from 'react'
import "../auth.form.scss"
import { useNavigate, Link } from "react-router"
import { useAuth } from '../hooks/useAuth.js'

const RocketIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M14 3c3.9 0 7 3.1 7 7 0 4.8-3.8 8.6-8.5 8.9l-2.6 2.6-1.4-1.4 2-2c-.6-.2-1.2-.4-1.8-.8L5 21l-2-2 3.8-3.7c-.4-.6-.6-1.2-.8-1.8l-2 2-1.4-1.4 2.6-2.6C5.4 6.8 9.2 3 14 3zm0 2c-2.8 0-5 2.2-5 5s2.2 5 5 5a5 5 0 000-10z" />
    </svg>
)

const LayersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 2l10 5-10 5L2 7l10-5zm0 8l10 5-10 5-10-5 10-5zm0 4l8.2 4.1L12 22l-8.2-3.9L12 14z" />
    </svg>
)

const TargetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 1.1A8.9 8.9 0 0120.9 11H18a6 6 0 00-5-5.9V3.1zM11 3.1V6a6 6 0 00-5 5H3.1A8.9 8.9 0 0111 3.1zM3.1 13H6a6 6 0 005 5v2.9A8.9 8.9 0 013.1 13zM13 20.9V18a6 6 0 005-5h2.9A8.9 8.9 0 0113 20.9zM12 9a3 3 0 110 6 3 3 0 010-6z" />
    </svg>
)

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
        return (<main className="auth-loading"><h1>Loading...</h1></main>)
    }

    return (
        <main className="auth-page">
            <div className="auth-shell">
                <section className="auth-showcase">
                    <div className="auth-copy">
                        <span className="auth-badge">Interview Studio</span>
                        <h1>Start building smarter interviews with a <span className="auth-highlight">single workspace</span>.</h1>
                        <p>Create your account to save tailored reports, compare roles, and keep your interview prep focused from first application to final round.</p>
                    </div>
                    <div className="auth-feature-list">
                        <div className="auth-feature-item">
                            <div className="feature-icon"><RocketIcon /></div>
                            <div>
                                <h3>Fast setup</h3>
                                <p>Get your profile ready in a minute and start generating interview strategies right away.</p>
                            </div>
                        </div>
                        <div className="auth-feature-item">
                            <div className="feature-icon"><LayersIcon /></div>
                            <div>
                                <h3>All your reports together</h3>
                                <p>Track multiple roles and keep every preparation plan in one place.</p>
                            </div>
                        </div>
                        <div className="auth-feature-item">
                            <div className="feature-icon"><TargetIcon /></div>
                            <div>
                                <h3>Focused outcomes</h3>
                                <p>Understand what matters most for each role and practice with better intent.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="auth-form-panel">
                    <div className="form-container">
                        <div className="form-heading">
                            <h2>Create your account</h2>
                            <p>Set up your space once and keep every interview strategy within reach.</p>
                        </div>
                        <form className="auth-form" onSubmit={handleSubmit}>
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

                            <button className="auth-submit" type="submit">Create Account</button>
                        </form>
                        <p className="auth-footer">Already have an account? <Link to={"/login"}>Sign in</Link></p>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Register
