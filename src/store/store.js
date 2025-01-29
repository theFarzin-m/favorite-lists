import { configureStore } from "@reduxjs/toolkit";

import profileReducer from "./profile/profileSlice";
import listReducer from "./list/listSlice";

const store = configureStore({
  reducer: {
    profile: profileReducer,
    list: listReducer,
  },
});

export default store;
