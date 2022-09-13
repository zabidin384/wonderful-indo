import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import React, { useState, useEffect } from "react";
import { MDBCard, MDBCardBody, MDBInput, MDBCardFooter, MDBValidation, MDBValidationItem, MDBBtn, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { googleLogin, login } from "../redux/features/authSlice";
// import { GoogleLogin } from "react-google-login";
import { GoogleLogin } from "@react-oauth/google";

const initialState = {
	email: "",
	password: "",
};

export default function Login() {
	const [formValue, setFormValue] = useState(initialState);
	const { loading, error } = useSelector((state) => ({ ...state.auth }));
	const { email, password } = formValue;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// prod -> 1098943213119-52v21lnfa0vag48auan9e864sq3mgolm.apps.googleusercontent.com

	// const devEnv = process.env.NODE_ENV !== "production";
	// const clientId = devEnv ? "1098943213119-5b0in2elbeivs4u3e11s8iie17uin8e0.apps.googleusercontent.com" : "1098943213119-52v21lnfa0vag48auan9e864sq3mgolm.apps.googleusercontent.com";

	useEffect(() => {
		error && toast.error(error);
	}, [error]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (email && password) dispatch(login({ formValue, navigate, toast }));
	};
	const handleChange = (e) => {
		let { name, value } = e.target;
		setFormValue({ ...formValue, [name]: value });
	};

	// // Someone says it's deprecated!
	// const googleSuccess = (resp) => {
	// 	const email = resp?.profileObj?.email; // resp && resp.profileObj && resp.profileObj.email
	// 	const name = resp?.profileObj?.name;
	// 	const token = resp?.tokenId;
	// 	const googleId = resp?.googleId;
	// 	const result = { email, name, token, googleId };
	// 	dispatch(googleLogin({ result, navigate, toast }));
	// };

	// const googleFailure = (error) => {
	// 	toast.error(error);
	// };

	const googleSuccess = (resp) => {
		const token = resp?.credential;
		const decoded = token && jwt_decode(token);
		const email = decoded?.email;
		const name = decoded?.given_name;
		const googleId = decoded?.sub;
		const result = { email, name, token, googleId };
		dispatch(googleLogin({ result, navigate, toast }));
	};

	const googleError = (err) => {
		toast.error(err);
		console.log(err);
	};

	return (
		<div style={{ margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "120px" }}>
			<MDBCard alignment="center">
				<MDBIcon fas icon="user-circle" className="fa-2x" />
				<h4>Login</h4>
				<MDBCardBody>
					<MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
						<MDBValidationItem feedback="Please input your correct email!" invalid className="col-md-12">
							<MDBInput label="Email" type="email" value={email} name="email" onChange={handleChange} required />
						</MDBValidationItem>
						<MDBValidationItem feedback="Please input your correct password!" invalid className="col-md-12">
							<MDBInput label="Password" type="password" value={password} name="password" onChange={handleChange} required />
						</MDBValidationItem>
						<div className="col-12">
							<MDBBtn style={{ width: "100%" }} className="mt-2" type="submit">
								{loading && <MDBSpinner size="sm" role="status" tag="span" className="me-2" />}
								Login
							</MDBBtn>
						</div>
					</MDBValidation>
					<br />
					{/* <GoogleLogin
						clientId={clientId}
						render={(renderProps) => (
							<MDBBtn style={{ width: "100%" }} color="danger" onClick={renderProps.onClick} disabled={renderProps.disabled}>
								<MDBIcon className="me-2" fab icon="google" /> Google Login
							</MDBBtn>
						)}
						onSuccess={googleSuccess}
						onFailure={googleFailure}
						// isSignedIn={true}
						cookiePolicy="single_host_origin"
					/> */}
					<h5>Login with Google</h5>
					<div className="d-flex justify-content-center">
						<GoogleLogin onSuccess={googleSuccess} onError={googleError} />
					</div>
				</MDBCardBody>
				<MDBCardFooter>
					<Link to="/register">
						<p>Don't have an account? Please sign up!</p>
					</Link>
				</MDBCardFooter>
			</MDBCard>
		</div>
	);
}
