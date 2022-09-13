import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { excerpt } from "../utility/utility";

export default function RelatedTours({ relatedTours, tourId }) {
	return (
		<>
			{relatedTours && relatedTours.length > 0 && (
				<>
					{relatedTours.length > 1 && (
						<h4 className="text-dark fw-bold">
							<u>Related Posts</u>
						</h4>
					)}
					<MDBRow className="row-cols-1 row-cols-md-3 g-4">
						{relatedTours
							.filter((item) => item._id !== tourId)
							.splice(0, 6)
							.map((item) => (
								<MDBCol>
									<MDBCard className="border border-2 border-dark">
										<a href={`/tour/${item._id}`}>
											<MDBCardImage src={item.imageFile} alt={item.title} position="top" style={{ minHeight: "219px" }}></MDBCardImage>
										</a>
										<span className="tag-card">
											{item.tags.map((tag) => (
												<Link to={`/tours/tag/${tag}`}>#{tag} </Link>
											))}
										</span>
										<MDBCardBody>
											<a href={`/tour/${item._id}`}>
												<MDBCardTitle>{item.title}</MDBCardTitle>
											</a>

											<MDBCardText>
												{excerpt(item.description, 90)} <a href={`/tour/${item._id}`}>Read More</a>
											</MDBCardText>
										</MDBCardBody>
									</MDBCard>
								</MDBCol>
							))}
					</MDBRow>
				</>
			)}
		</>
	);
}
