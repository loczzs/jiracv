import { configureStore } from "@reduxjs/toolkit";
import authSlice from "modules/Authentication/slices/authSlice";
import projectSlices from "modules/List/slices/projectSlices";
import taskSlices from "modules/List/slices/taskSlices";
import userSlices from "modules/List/slices/userSlices";

const store = configureStore({
    reducer: {
      auth : authSlice,
      project : projectSlices,
      task : taskSlices,
      user: userSlices,
    },
  });
  
  export default store;