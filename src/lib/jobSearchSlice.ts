import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JobSearchState {
  searchQuery: string;
  category: string | null;
}

const initialState: JobSearchState = {
  searchQuery: "",
  category: null,
};

const JobSearchSlice = createSlice({
  name: "jobSearch",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.category = action.payload;
    },
  },
});

export const { setSearchQuery, setCategory } = JobSearchSlice.actions;
export default JobSearchSlice.reducer;
