import { userLogin } from '@/api/user';
import { IUserInfo } from '@/store/user';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  collapsed: boolean;
  openKeys: string[];
  selectedKeys: string[];
  isLogin: boolean;
  userInfo: object;
}
const initialState: IInitialState = {
  collapsed: false,
  openKeys: [],
  selectedKeys: [],
  isLogin: false,
  userInfo: {},
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUserInfo(state, { payload }: PayloadAction<IUserInfo>) {
      state.userInfo = payload;
    },
    setIsLogin(state, { payload }: PayloadAction<IInitialState['isLogin']>) {
      state.isLogin = payload;
    },
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

export interface IUserLogin {
  username: string;
  password: string;
}
export const login = createAsyncThunk(
  'global/login',
  async (params: IUserLogin) => {
    const result = await userLogin(params);
    return result;
  }
);

export const globalActions = globalSlice.actions;
export default globalSlice;
