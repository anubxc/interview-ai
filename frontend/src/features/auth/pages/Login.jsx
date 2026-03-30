import React, { useState } from 'react'
import "../auth.form.scss"
import { useNavigate, Link } from "react-router"
import { useAuth } from '../hooks/useAuth.js'

const SparkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M11 2l1.8 5.2L18 9l-5.2 1.8L11 16l-1.8-5.2L4 9l5.2-1.8L11 2zm7 11l.9 2.6L21.5 16l-2.6.9L18 19.5l-.9-2.6L14.5 16l2.6-.4L18 13zM6 14l1.1 3.1L10 18l-2.9 1L6 22l-1.1-3L2 18l2.9-.9L6 14z" />
    </svg>
)

const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 2l7 3v6c0 5-3.4 9.7-7 11-3.6-1.3-7-6-7-11V5l7-3zm0 5a3 3 0 100 6 3 3 0 000-6z" />
    </svg>
)

const GraphIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M4 19h16v2H2V3h2v16zm3-3l3.5-4 2.5 2.5L18 8l2 1.5-6.8 8.2-2.6-2.6L8.5 18 7 16z" />
    </svg>
)

const Login = () => {

    const navigate = useNavigate();

    const { loading, handleLogin } = useAuth();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await handleLogin({ email, password });
        if (success) navigate("/")
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
                        <h1>Walk in prepared with a <span className="auth-highlight">clear strategy</span>.</h1>
                        <p>Sign in to continue building tailored interview plans, revisit previous reports, and sharpen the story you bring into every conversation.</p>
                    </div>
                    <div className="auth-feature-list">
                        <div className="auth-feature-item">
                            <div className="feature-icon"><SparkIcon /></div>
                            <div>
                                <h3>Personalized prep</h3>
                                <p>Turn a job description and your background into focused interview guidance.</p>
                            </div>
                        </div>
                        <div className="auth-feature-item">
                            <div className="feature-icon"><ShieldIcon /></div>
                            <div>
                                <h3>Your progress stays organized</h3>
                                <p>Come back anytime to review reports and keep improving your approach.</p>
                            </div>
                        </div>
                        <div className="auth-feature-item">
                            <div className="feature-icon"><GraphIcon /></div>
                            <div>
                                <h3>Practice with direction</h3>
                                <p>See the skill gaps, likely questions, and strongest talking points in one place.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="auth-form-panel">
                    <div className="form-container">
                        <div className="form-heading">
                            <h2>Welcome back</h2>
                            <p>Pick up where you left off and continue preparing with confidence.</p>
                        </div>
                        <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            type="email" id="email" placeholder="Enter your email" name="email" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            type="password" id="password" placeholder="Enter your password" name="password" required />
                    </div>

                            <button className="auth-submit" type="submit">Sign In</button>
                        </form>
                        <p className="auth-footer">Don't have an account? <Link to={"/register"}>Create one</Link></p>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Login
