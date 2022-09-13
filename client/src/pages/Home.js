import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getTours, setCurrentPage } from "../redux/features/tourSlice";
import CardTour from "../components/CardTour";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

export default function Home({ home }) {
	const { tours, loading, currentPage, numberOfPages } = useSelector((state) => ({ ...state.tour }));
	const dispatch = useDispatch();
	const query = useQuery();
	const searchQuery = query.get("searchQuery");
	const location = useLocation();

	useEffect(() => {
		dispatch(getTours(currentPage));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage]);

	if (loading) {
		return <Spinner />;
	}

	return (
		<div style={{ margin: "auto", padding: "15px", maxWidth: "1000px", alignContent: "center" }}>
			{home === "home" && currentPage === 1 && (
				<>
					<h2 style={{ marginTop: "3.5rem", marginBottom: "1rem", color: "#25316D" }}>Welcome to Wonderful Indonesia website!</h2>
					<p className="mt-5">
						Indonesia is famous as one of the international tourist destinations because it has a very beautiful landscape. From Sabang to Merauke, we can easily find beautiful and
						stunning places. As a resident of Indonesia, I feel that I need to introduce tourist attractions in Indonesia. Hopefully Indonesian tourism will be more known by the world
						in the future :)
					</p>
				</>
			)}
			<MDBRow className="mt-5">
				{tours.length === 0 && location.pathname === "/" && <h2 className="mb-0 mt-5">No Tours Found!</h2>}
				{tours.length === 0 && location.pathname !== "/" && <h2 className="mb-0 mt-5">Sorry, we couldn't find any matches for "{searchQuery}"</h2>}
				<MDBCol>
					<MDBContainer>
						<MDBRow className="row-cols-1 row-cols-md-3 g-2">{tours && tours.map((item) => <CardTour key={item._id} {...item} />)}</MDBRow>
					</MDBContainer>
				</MDBCol>
			</MDBRow>
			{tours.length > 0 && !searchQuery && <Pagination setCurrentPage={setCurrentPage} numberOfPages={numberOfPages} currentPage={currentPage} dispatch={dispatch} />}
		</div>
	);
}
