import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const login = createAsyncThunk("auth/login", async ({ formValue, navigate, toast }, { rejectWithValue }) => {
	try {
		const res = await api.login(formValue);
		toast.success("Login Successfully!");
		navigate("/");
		return res.data;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});

export const register = createAsyncThunk("auth/register", async ({ formValue, navigate, toast }, { rejectWithValue }) => {
	try {
		const res = await api.signUp(formValue);
		toast.success("Register Successfully!");
		navigate("/");
		return res.data;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});

export const googleLogin = createAsyncThunk("auth/googleLogin", async ({ result, navigate, toast }, { rejectWithValue }) => {
	try {
		const res = await api.googleLogin(result);
		toast.success("Login with Google Successfully!");
		navigate("/");
		return res.data;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: null,
		error: "",
		loading: false,
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setLogout: (state, action) => {
			localStorage.removeItem("profile");
			state.user = null;
		},
	},
	extraReducers: {
		[login.pending]: (state, action) => {
			state.loading = true;
		},
		[login.fulfilled]: (state, action) => {
			state.loading = false;
			localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
			state.user = action.payload;
		},
		[login.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		},
		[register.pending]: (state, action) => {
			state.loading = true;
		},
		[register.fulfilled]: (state, action) => {
			state.loading = false;
			localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
			state.user = action.payload;
		},
		[register.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		},
		[googleLogin.pending]: (state, action) => {
			state.loading = true;
		},
		[googleLogin.fulfilled]: (state, action) => {
			state.loading = false;
			localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
			state.user = action.payload;
		},
		[googleLogin.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		},
	},
});

export const { setLogout, setUser } = authSlice.actions;

export default authSlice.reducer;
