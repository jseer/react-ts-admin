import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  collapsed: boolean;
  openKeys: string[];
  selectedKeys: string[];
}
const initialState: IInitialState = {
  collapsed: false,
  openKeys: [],
  selectedKeys: [],
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setCollapsed(
      state,
      { payload }: PayloadAction<IInitialState["collapsed"]>
    ) {
      state.collapsed = payload;
    },
    setOpenKeys(state, { payload }: PayloadAction<IInitialState["openKeys"]>) {
      state.openKeys = payload;
    },
    setSelectedKeys(
      state,
      { payload }: PayloadAction<IInitialState["selectedKeys"]>
    ) {
      state.selectedKeys = payload;
    },
  },
});

export const globalActions = globalSlice.actions;
export default globalSlice;
