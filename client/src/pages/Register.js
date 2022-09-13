import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import { MDBCard, MDBCardBody, MDBInput, MDBCardFooter, MDBValidation, MDBValidationItem, MDBBtn, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../redux/features/authSlice";

const initialState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

export default function Register() {
	const [formValue, setFormValue] = useState(initialState);
	const { loading, error } = useSelector((state) => ({ ...state.auth }));
	const { email, password, firstName, lastName, confirmPassword } = formValue;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		error && toast.error(error);
	}, [error]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) return toast.error("Password doesn't match!");
		if (email && password && firstName && lastName && confirmPassword) {
			dispatch(register({ formValue, navigate, toast }));
		}
	};
	const handleChange = (e) => {
		let { name, value } = e.target;
		setFormValue({ ...formValue, [name]: value });
	};

	return (
		<div style={{ margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "120px" }}>
			<MDBCard alignment="center">
				<MDBIcon fas icon="user-circle" className="fa-2x" />
				<h5>Sign Up</h5>
				<MDBCardBody>
					<MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
						<MDBValidationItem feedback="Please input your first name!" invalid className="col-md-6">
							<MDBInput label="First Name" type="text" value={firstName} name="firstName" onChange={handleChange} required />
						</MDBValidationItem>
						<MDBValidationItem feedback="Please input your last name!" invalid className="col-md-6">
							<MDBInput label="Last Name" type="text" value={lastName} name="lastName" onChange={handleChange} required />
						</MDBValidationItem>
						<MDBValidationItem feedback="Please input your correct email!" invalid className="col-md-12">
							<MDBInput label="Email" type="email" value={email} name="email" onChange={handleChange} required />
						</MDBValidationItem>
						<MDBValidationItem feedback="Please input your password!" invalid className="col-md-12">
							<MDBInput label="Password" type="password" value={password} name="password" onChange={handleChange} required />
						</MDBValidationItem>
						<MDBValidationItem feedback="Please input your correct password!" invalid className="col-md-12">
							<MDBInput label="Confirm Password" type="password" value={confirmPassword} name="confirmPassword" onChange={handleChange} required />
						</MDBValidationItem>
						<div className="col-12">
							<MDBBtn style={{ width: "100%" }} className="mt-2" type="submit">
								{loading && <MDBSpinner size="sm" role="status" tag="span" className="me-2" />}
								Register
							</MDBBtn>
						</div>
					</MDBValidation>
				</MDBCardBody>
				<MDBCardFooter>
					<Link to="/login">
						<p>Already have an account? Please login!</p>
					</Link>
				</MDBCardFooter>
			</MDBCard>
		</div>
	);
}
