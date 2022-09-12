import React, { Component } from 'react'
import { Link } from 'react-router-dom'
const ContentLoginRegister = ({ setEmailogin, setPasswordlogin, setEmail,
    setFirstname, setLastname, setAddress, setPhone, setPassword, setConfirm,
    notificationRegister, notificationLogin, registerSubmit, loginSubmit }) => (
        <section id="form">
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 col-sm-offset-1">
                        <div className="login-form">
                            <h2>Login to your account</h2>
                            <div className="noti">{notificationLogin}</div>
                            <input type="email"
                                placeholder="Email address"
                                onChange={(e) => { setEmailogin(e.target.value) }}
                            />
                            <input type="password"
                                placeholder="Password"
                                onChange={(e) => { setPasswordlogin(e.target.value) }}
                            />
                            <Link to='/forgotpass'>Forgot password</Link>
                            <br/>
                            <span>
                                <input type="checkbox" className="checkbox" />
                                Keep me signed in
                            </span>                          
                            <button
                                className="btn btn-default"
                                onClick={() => loginSubmit()}
                            >Login</button>

                        </div>
                    </div>
                    <div className="col-sm-1">
                        <h2 className="or">OR</h2>
                    </div>
                    <div className="col-sm-4">
                        <div className="signup-form">
                            <h2>New User Signup!</h2>
                            <div className="noti">{notificationRegister}</div>

                            <input type="email"
                                placeholder="Email address"
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                            <input type="text"
                                placeholder="First name"
                                onChange={(e) => { setFirstname(e.target.value) }}
                            />
                            <input type="text"
                                placeholder="Last name"
                                onChange={(e) => { setLastname(e.target.value) }}
                            />
                            <input type="text"
                                placeholder="Address"
                                onChange={(e) => { setAddress(e.target.value) }}
                            />
                            <input type="number"
                                placeholder="Phone number"
                                onChange={(e) => { setPhone(e.target.value) }}
                            />
                            <input type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input type="password"
                                placeholder="Confirm"
                                onChange={(e) => { setConfirm(e.target.value) }}
                            />
                            <button
                                className="btn btn-default"
                                onClick={() => registerSubmit()}
                            >Signup
                                </button>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
export default ContentLoginRegister