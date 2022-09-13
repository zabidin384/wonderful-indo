import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

const devEnv = process.env.NODE_ENV !== "production";
const clientId = devEnv ? "1098943213119-5b0in2elbeivs4u3e11s8iie17uin8e0.apps.googleusercontent.com" : "1098943213119-52v21lnfa0vag48auan9e864sq3mgolm.apps.googleusercontent.com";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <React.StrictMode>
	<GoogleOAuthProvider clientId={clientId}>
		<Provider store={store}>
			<App />
		</Provider>
	</GoogleOAuthProvider>
	// </React.StrictMode>
);
