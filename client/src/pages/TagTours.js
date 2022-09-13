import React, { useEffect } from "react";
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBBtn, MDBCardGroup } from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getToursByTag } from "../redux/features/tourSlice";
import Spinner from "../components/Spinner";
import { excerpt } from "../utility/utility";

export default function TagTours() {
	const { tagTours, loading } = useSelector((state) => ({ ...state.tour }));
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { tag } = useParams();

	useEffect(() => {
		if (tag) dispatch(getToursByTag(tag));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tag]);

	if (loading) {
		return <Spinner />;
	}

	return (
		<div style={{ margin: "auto", padding: "120px", maxWidth: "900px", alignContent: "center" }}>
			<h3 className="text-center">All posts with tag: #{tag}</h3>
			<hr style={{ maxWidth: "600px" }} />
			{tagTours &&
				tagTours.map((item) => (
					<MDBCardGroup key={item._id}>
						<MDBCard style={{ maxWidth: "600px" }} className="mt-2 border border-2 border-dark">
							<MDBRow className="g-0">
								<MDBCol md="4" className="d-flex items-center">
									<MDBCardImage className="rounded" src={item.imageFile} alt={item.title} fluid />
								</MDBCol>
								<MDBCol md="8">
									<MDBCardBody>
										<MDBCardTitle>{item.title}</MDBCardTitle>
										<MDBCardText>{excerpt(item.description, 90)}</MDBCardText>
										<div style={{ float: "left", marginTop: "-10px" }}>
											<MDBBtn size="sm" rounded color="info" onClick={() => navigate(`/tour/${item._id}`)} className="mb-4">
												Read More
											</MDBBtn>
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
