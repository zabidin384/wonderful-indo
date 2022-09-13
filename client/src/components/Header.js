import React, { useState } from "react";
import decode from "jwt-decode";
import { MDBNavbar, MDBContainer, MDBIcon, MDBNavbarNav, MDBNavbarItem, MDBNavbarToggler, MDBNavbarBrand, MDBCollapse } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import { searchTours } from "../redux/features/tourSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Header() {
	const [show, setShow] = useState(false);
	const [search, setSearch] = useState("");
	const { user } = useSelector((state) => ({ ...state.auth }));
	const token = user?.token;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	if (token) {
		const decodedToken = decode(token);
		if (decodedToken.exp * 1000 < new Date().getTime()) {
			dispatch(setLogout());
		}
	}

	const handleLogout = () => {
		dispatch(setLogout());
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (search) {
			setShow(false);
			dispatch(searchTours(search));
			navigate(`/tours/search?searchQuery=${search}`);
		} else navigate("/");
	};

	return (
		<MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#25316D" }}>
			<MDBContainer className="d-sm-flex justify-content-sm-between">
				<MDBNavbarBrand style={{ fontWeight: "600", fontSize: "22px" }}>
					<Link to="/">Wonderful-Indonesia</Link>
				</MDBNavbarBrand>
				{user?.result?._id && (
					<h5 style={{ marginTop: "10px", fontSize: "1rem" }} className="text-success ms-lg-5">
						<MDBIcon fas icon="user-cog" className="d-sm-none d-lg-inline" /> &nbsp;
						{user?.result?.name}
					</h5>
				)}
				<MDBNavbarToggler type="button" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setShow(!show)} style={{ color: "white" }}>
					<MDBIcon icon="bars" fas />
				</MDBNavbarToggler>
				<MDBCollapse show={show} navbar className="headerCollapse">
					<MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0 text-center d-flex gap-2">
						<MDBNavbarItem onClick={() => setShow(false)}>
							<Link to="/">
								<span className="header-text">Home</span>
							</Link>
						</MDBNavbarItem>
						{user?.result?._id && (
							<>
								<MDBNavbarItem onClick={() => setShow(false)}>
									<Link to="/add-tour">
										<span className="header-text">Add Post</span>
									</Link>
								</MDBNavbarItem>
								<MDBNavbarItem onClick={() => setShow(false)}>
									<Link to="/dashboard">
										<span className="header-text">Dashboard</span>
									</Link>
								</MDBNavbarItem>
							</>
						)}
						{user?.result?._id ? (
							<MDBNavbarItem onClick={() => setShow(false)}>
								<Link to="/login">
									<span className="header-text text-danger logout" onClick={handleLogout}>
										Logout
									</span>
								</Link>
							</MDBNavbarItem>
						) : (
							<MDBNavbarItem onClick={() => setShow(false)}>
								<Link to="/login">
									<span className="header-text">Login</span>
								</Link>
							</MDBNavbarItem>
						)}
					</MDBNavbarNav>
					<form className="d-flex input-group w-auto ms-5" onSubmit={handleSubmit}>
						<input type="text" className="form-control" placeholder="Search Post..." value={search} onChange={(e) => setSearch(e.target.value)} />
						<div style={{ marginTop: "5px", marginLeft: "5px", color: "white" }}>
							<MDBIcon fas icon="search" onClick={handleSubmit} style={{ cursor: "pointer" }} />
						</div>
					</form>
				</MDBCollapse>
			</MDBContainer>
		</MDBNavbar>
	);
}
