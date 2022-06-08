
import {configureStore} from "@reduxjs/toolkit";
import {authApi} from "../apis/authApi";
import {apartmentApi} from "../apis/apartmentApi";
import {setupListeners} from "@reduxjs/toolkit/query";
import {authSlice} from '../slices/authSlice';
import { ruleApi } from "../apis/ruleApi";
import { reportApi } from "../apis/reportApi";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [apartmentApi.reducerPath]: apartmentApi.reducer,
        [reportApi.reducerPath]: reportApi.reducer,
        [ruleApi.reducerPath]: ruleApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            authApi.middleware,
            apartmentApi.middleware,
            ruleApi.middleware,
            reportApi.middleware
        )
});

setupListeners(store.dispatch);