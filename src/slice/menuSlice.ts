import { MENU_ITEMS } from "@/constants/constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeMenuItem: MENU_ITEMS.PENCIL,
  actionMenuItem: null,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    changeMenuItem: (state, action) => {
      state.activeMenuItem = action.payload;
    },
    actionItemClick: (state, action) => {
      state.actionMenuItem = action.payload;
    },
  },
});

export const { changeMenuItem, actionItemClick } = menuSlice.actions;
export default menuSlice.reducer;
