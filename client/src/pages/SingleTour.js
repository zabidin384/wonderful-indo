import React, { useEffect } from "react";
import { MDBCard, MDBCardBody, MDBCardText, MDBCardImage, MDBContainer, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import moment from "moment";
import { getRelatedTours, getTour } from "../redux/features/tourSlice";
import RelatedTours from "../components/RelatedTours";
import DisqusThread from "../components/DisqusThread";
import Spinner from "../components/Spinner";

export default function SingleTour() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, tour, relatedTours } = useSelector((state) => ({ ...state.tour }));
	const { id } = useParams();
	const tags = tour?.tags;

	useEffect(() => {
		tags && dispatch(getRelatedTours(tags));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tags]);

	useEffect(() => {
		if (id) dispatch(getTour(id));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	if (loading) {
		return <Spinner />;
	}

	return (
		<>
			<MDBContainer className="mt-5 pt-3">
				<MDBCard className="mb-3 mt-2">
					<MDBCardImage position="top" style={{ width: "100%", maxHeight: "600px" }} src={tour.imageFile} alt={tour.title} />
					<MDBCardBody>
						<MDBBtn tag="a" color="none" style={{ float: "left", color: "#000" }} onClick={() => navigate("/")}>
							<MDBIcon fas size="lg" icon="long-arrow-alt-left" style={{ float: "left" }}></MDBIcon>
						</MDBBtn>
						<h3 className="text-dark fw-bold">
							<u>{tour.title}</u>
						</h3>
						<span>
							<p className="text-start fw-bold tourName">Created By: {tour.name}</p>
						</span>
						<div style={{ float: "left", color: "#1266f1" }}>
							<span className="text-start">{tour && tour.tags && tour.tags.map((tag) => <Link to={`/tours/tag/${tag}`}>#{tag} </Link>)}</span>
						</div>
						<br />
						<MDBCardText className="text-start mt-2 text-success">
							<MDBIcon style={{ float: "left", margin: "5px" }} far icon="calendar-alt" size="lg" />
							<small className="fw-bold">{tour.createdAt && moment(tour.createdAt).fromNow()}</small>
						</MDBCardText>
						<MDBCardText className="mb-0 text-start tourDesc">{tour.description}</MDBCardText>
					</MDBCardBody>
					<RelatedTours relatedTours={relatedTours} tourId={id} />
				</MDBCard>
				<DisqusThread id={id} title={tour.title} path={`/tour/${id}`} />
			</MDBContainer>
		</>
	);
}
