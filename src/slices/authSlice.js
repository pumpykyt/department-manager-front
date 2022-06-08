import {createSlice} from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const token = localStorage.getItem('token');

const initialState = {
    isAuthenticated: !!token,
    isAdmin: token ? jwtDecode(token).role === 'admin' : false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload;
        }
    }
});

export const { setIsAuthenticated, setIsAdmin } = authSlice.actions;
export default authSlice.reducer;