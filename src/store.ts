import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "@/slice/menuSlice";
import ToolboxSlice from "@/slice/toolboxSlice";

export const store = configureStore({
  reducer: {
    menu: MenuReducer,
    toolbox: ToolboxSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
