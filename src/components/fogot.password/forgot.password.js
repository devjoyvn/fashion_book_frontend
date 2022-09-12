import React, { Component } from 'react'
import { Link } from 'react-router-dom'
const ForgotPassword = ({ setEmail, submit, notification }) => (
	<div className="container text-center">
		<div className="logo-404">
			<Link to="/"><img src="/assets/images/home/logo.png" alt="" /></Link>
		</div>
		<div className="content-404 forgotpass">
			<h1><b>FORGOT PASSWORD
			</b></h1>
			<span>{notification}</span>
			<input
			type="email"
				placeholder="Email"
				onChange={e => setEmail(e.target.value)}
			/>
			<br />
			<button
				className="btn btn-default"
				onClick={() => submit()}
			>
				submit
			</button>
			<h2><Link to="/">Bring me back Home</Link></h2>
		</div>
	</div>
)
export default ForgotPassword