import React from "react";
import { MDBCard, MDBCardImage, MDBCardGroup, MDBBtn, MDBIcon, MDBTooltip } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { likeTour } from "../redux/features/tourSlice";

export default function CardTour({ imageFile, description, title, name, tags, _id, likes }) {
	const { user } = useSelector((state) => state.auth);
	const userId = user?.result?._id || user?.result?.googleId;
	const dispatch = useDispatch();

	const excerpt = (str) => {
		if (str.length > 95) {
			str = str.substring(0, 95) + "...";
		}
		return str;
	};

	const Likes = () => {
		if (likes.length > 0) {
			return likes.find((like) => like === userId) ? (
				<>
					<MDBIcon fas icon="thumbs-up" />
					&nbsp;
					{likes.length > 2 ? (
						<MDBTooltip tag="a" title={`You and ${likes.length - 1} other people likes`}>
							{likes.length} Likes
						</MDBTooltip>
					) : (
						`${likes.length} Like${likes.length > 1 ? "s" : ""}`
					)}
				</>
			) : (
				<>
					<MDBIcon far icon="thumbs-up" />
					&nbsp; {likes.length} {likes.length === 1 ? "Like" : "Likes"}
				</>
			);
		}
		return (
			<>
				<MDBIcon far icon="thumbs-up" />
				&nbsp;Like
			</>
		);
	};

	const handleLike = () => {
		dispatch(likeTour({ _id }));
	};

	return (
		<MDBCardGroup>
			<MDBCard className="h-100 mt-2 d-sm-flex pb-2 border border-2 border-dark" style={{ maxWidth: "20rem" }}>
				<MDBCardImage src={imageFile} alt={title} position="top" style={{ maxWidth: "100%", height: "180px" }} />

				{/* Title */}
				<h4 className="mt-2">
					<Link to={`/tour/${_id}`}>{title}</Link>
				</h4>

				{/* Like and author */}
				<span className="d-flex justify-content-between mx-2">
					<MDBBtn tag="a" color="none" onClick={!user?.result ? null : handleLike}>
						{!user?.result ? (
							<MDBTooltip title="Please login to like post!" tag="a">
								<Likes />
							</MDBTooltip>
						) : (
							<Likes />
						)}
					</MDBBtn>
					<div>
						<b>Author:</b> {name}
					</div>
				</span>

				{/* Description */}
				<p className="mx-2 mt-2">
					{excerpt(description)} <Link to={`/tour/${_id}`}>Read More</Link>
				</p>

				{/* Tags */}
				<div className="ms-2 fw-bold">Tags:</div>
				<span className="d-flex gap-1 flex-wrap ms-2" style={{ color: "#5F6F94" }}>
					{tags.map((tag, i) => (
						<Link key={i} to={`/tours/tag/${tag}`}>
							{" "}
							#{tag}
						</Link>
					))}
				</span>
			</MDBCard>
		</MDBCardGroup>
	);
}
