import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedID: null,
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    selectMovie(state, action) {
      state.selectedID = action.payload;
    },
  },
});

export const { selectMovie } = listSlice.actions;
export default listSlice.reducer;
