import React, { useState, useEffect } from "react";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import Spinner from "../components/Spinner";
import { MDBCard, MDBCardBody, MDBValidation, MDBValidationItem, MDBBtn } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTour, updateTour } from "../redux/features/tourSlice";

const initialState = {
	title: "",
	description: "",
	tags: [],
};

export default function AddEditTour() {
	const [tourData, setTourData] = useState(initialState);
	const [tagErrMsg, setTagErrMsg] = useState(null);
	const { title, description, tags } = tourData;
	const { id } = useParams();
	const { error, loading, userTours } = useSelector((state) => ({ ...state.tour }));
	const { user } = useSelector((state) => ({ ...state.auth }));
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (id) {
			const singleTour = userTours.find((tour) => tour._id === id);
			setTourData({ ...singleTour });
		}
	}, [id, userTours]);

	useEffect(() => {
		error && toast.error(error);
	}, [error]);

	if (loading) {
		return <Spinner />;
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!tags.length) setTagErrMsg("Please input some tags!");

		if (title && description && tags) {
			const updatedTourData = { ...tourData, name: user?.result?.name };

			if (!id) dispatch(createTour({ updatedTourData, navigate, toast }));
			else dispatch(updateTour({ id, updatedTourData, navigate, toast }));
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setTourData({ ...tourData, [name]: value });
	};

	const handleAddTag = (tag) => {
		setTagErrMsg(null);
		setTourData({ ...tourData, tags: [...tourData.tags, tag] });
	};

	const handleDeleteTag = (tag) => {
		setTourData({ ...tourData, tags: tourData.tags.filter((t) => t !== tag) });
	};

	const handleClear = () => {
		setTourData({ title: "", description: "", tags: [] });
	};

	return (
		<div style={{ margin: "auto", marginTop: "30px", padding: "15px", maxWidth: "1300px", alignContent: "center" }} className="container">
			<MDBCard alignment="center">
				<MDBCardBody>
					<h2>{id ? "Update Post" : "Add Post"}</h2>
					<MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
						<MDBValidationItem className="col-md-12" feedback="Please input a title!" invalid>
							<input type="text" placeholder="Enter Title" value={title} name="title" onChange={handleChange} className="form-control" required />
						</MDBValidationItem>
						<MDBValidationItem className="col-md-12" feedback="Please input a description!" invalid>
							<textarea cols="10" rows="10" placeholder="Enter Description" value={description} name="description" onChange={handleChange} className="form-control" required />
						</MDBValidationItem>
						<MDBValidationItem className="col-md-12" feedback="Please input a tag!" invalid>
							<ChipInput
								style={{ margin: "0px", padding: "0px" }}
								name="tags"
								variant="outlined"
								placeholder="Enter Tag"
								fullWidth
								value={tags}
								onAdd={(tag) => handleAddTag(tag)}
								onDelete={(tag) => handleDeleteTag(tag)}
							/>
							{tagErrMsg && <div className="tagErrMsg">{tagErrMsg}</div>}
						</MDBValidationItem>
						<div className="d-flex justify-content-start">
							<FileBase type="file" multiple={false} onDone={({ base64 }) => setTourData({ ...tourData, imageFile: base64 })}></FileBase>
						</div>
						<MDBValidationItem className="col-md-12 text-start">
							<MDBBtn>{id ? "Update" : "Submit"}</MDBBtn>
							<MDBBtn className="mt-2 ms-3" color="danger" onClick={handleClear}>
								Clear
							</MDBBtn>
						</MDBValidationItem>
					</MDBValidation>
				</MDBCardBody>
			</MDBCard>
		</div>
	);
}
