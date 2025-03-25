import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import jobSearchReducer from "./jobSearchSlice";

const store = configureStore({
  reducer: {
    jobSearch: jobSearchReducer,
  },
});

// TS-typer
export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<Rootstate> = useSelector;

export default store;
