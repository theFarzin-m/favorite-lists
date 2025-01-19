import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileId: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addProfileId(state, action) {
      state.profileId = action.payload;
    },
  },
});

export const { addProfileId } = profileSlice.actions;
export default profileSlice.reducer;
