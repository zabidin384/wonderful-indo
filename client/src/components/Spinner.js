import React from "react";
import { MDBSpinner } from "mdb-react-ui-kit";

export default function Spinner() {
	return (
		<div className="text-center">
			<MDBSpinner className="me-2" style={{ width: "3rem", height: "3rem", marginTop: "300px" }}>
				<span className="visually-hidden">Loading</span>
			</MDBSpinner>
			<h5>Loading</h5>
		</div>
	);
}
