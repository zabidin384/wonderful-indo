import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoadingToRedirect() {
	const [count, setCount] = useState(5);
	const navigate = useNavigate();

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((currentCount) => --currentCount);
		}, 1000);
		count === 0 && navigate("/login");
		return () => clearInterval(interval);
	}, [count, navigate]);

	return (
		<div style={{ marginTop: "100px" }} className="text-center">
			<h5>Redirecting you to Login Page in {count} seconds</h5>
		</div>
	);
}
