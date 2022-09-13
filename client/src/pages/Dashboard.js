import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBCard, MDBCardBody, MDBCardText, MDBCardImage, MDBIcon, MDBCardTitle, MDBRow, MDBCol, MDBBtn, MDBCardGroup } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { deleteTour, getToursByUser } from "../redux/features/tourSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

export default function Dashboard() {
	const { user } = useSelector((state) => ({ ...state.auth }));
	const { userTours, loading } = useSelector((state) => ({ ...state.tour }));
	const userId = user?.result?._id;
	const dispatch = useDispatch();

	const excerpt = (str) => {
		if (str.length > 90) {
			str = str.substring(0, 90) + "...";
		}
		return str;
	};

	useEffect(() => {
		if (userId) dispatch(getToursByUser(userId));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId]);

	if (loading) {
		return <Spinner />;
	}

	const handleDelete = (id) => {
		if (window.confirm("Are you sure you want to delete this tour?")) {
			dispatch(deleteTour({ id, toast }));
		}
	};

	return (
		<div style={{ margin: "auto", maxWidth: "900px", alignContent: "center" }} className="dashboard">
			{userTours.length === 0 && (
				<h3>
					No tour available with the user: <span className="text-success">{user?.result?.name}</span>
				</h3>
			)}

			{userTours.length > 0 && (
				<>
					<h4>
						Dashboard: <span className="text-success">{user?.result?.name}</span>
					</h4>
					<hr style={{ maxWidth: "600px" }} />
				</>
			)}

			{userTours &&
				userTours.map((item) => (
					<MDBCardGroup key={item._id}>
						<MDBCard style={{ maxWidth: "600px" }} className="mt-2 border border-2 border-dark">
							<MDBRow className="g-0">
								<MDBCol md="4" className="d-flex items-center">
									<MDBCardImage className="rounded" src={item.imageFile} alt={item.title} fluid />
								</MDBCol>
								<MDBCol md="8">
									<MDBCardBody>
										<MDBCardTitle className="text-start">{item.title}</MDBCardTitle>
										<MDBCardText className="text-start">
											<small className="text-muted">{excerpt(item.description)}</small>
										</MDBCardText>
										<div style={{ marginLeft: "5px", float: "right", marginTop: "-100px" }}>
											<MDBBtn className="mt-1" tag="a" color="none">
												<MDBIcon fas icon="trash" style={{ color: "#dd4b39" }} size="lg" onClick={() => handleDelete(item._id)} className="dashboard-icon" />
											</MDBBtn>
											<Link to={`/editTour/${item._id}`}>
												<MDBIcon fas icon="edit" style={{ color: "#55acee", marginLeft: "10px" }} size="lg" className="dashboard-icon" />
											</Link>
										</div>
									</MDBCardBody>
								</MDBCol>
							</MDBRow>
						</MDBCard>
					</MDBCardGroup>
				))}
		</div>
	);
}
