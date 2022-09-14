import { userLogin, userLogout, getCurrentUser } from '@/api/user';
import { IUserInfo } from '@/store/user';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  collapsed: boolean;
  openKeys: string[];
  selectedKeys: string[];
  isLogin: boolean;
  userInfo: IUserInfo | null;
}
const initialState: IInitialState = {
  collapsed: false,
  openKeys: [],
  selectedKeys: [],
  isLogin: false,
  userInfo: null,
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
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, {payload}) => {
      state.isLogin = true;
      state.userInfo = payload;
    }).addCase(logout.fulfilled, (state) => {
      state.isLogin = false;
      state.userInfo = null;
    }).addCase(getUserInfo.fulfilled, (state, { payload }) => {
      state.userInfo = payload;
    })
  },
});

export interface IUserLogin {
  name: string;
  password: string;
}
export const login = createAsyncThunk(
  'global/login',
  async (params: IUserLogin) => {
    const result = await userLogin(params);
    return result;
  }
);

export const logout = createAsyncThunk(
  'global/logout',
  async () => {
    await userLogout();
  }
);


export const getUserInfo = createAsyncThunk(
  'global/getCurrentUser',
  async () => {
    const data = await getCurrentUser();
    return data;
  }
);

export const globalActions = globalSlice.actions;
export default globalSlice;
