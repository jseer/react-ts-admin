import { getAuthMenuList, IMenuInfo } from '@/api/menu';
import { getAllDictionaries, IAllDictionaries } from '@/api/dictionaries';
import { userLogin, userLogout, getCurrentUser } from '@/api/user';
import { IUserInfo } from '@/store/user';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import md5 from 'crypto-js/md5';
import { loopMenuList2PageList } from '@/utils/common';

interface IInitialState {
  collapsed: boolean;
  openKeys: string[];
  selectedKeys: string[];
  isLogin: boolean;
  userInfo: IUserInfo | null;
  allDicItems: IAllDictionaries;
  menuList: IMenuInfo[];
  authPageList: IMenuInfo[];
  authPageListLoading: boolean;
}
const initialState: IInitialState = {
  collapsed: false,
  openKeys: [],
  selectedKeys: [],
  isLogin: false,
  userInfo: null,
  allDicItems: {},
  menuList: [],
  authPageList: [],
  authPageListLoading: true,
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
    }).addCase(getAllDictionariesThunk.fulfilled, (state, { payload }) => {
      state.allDicItems = payload;
    }).addCase(getAuthMenuListThunk.fulfilled, (state, { payload }) => {
      const pageList: IMenuInfo[] = [];
      loopMenuList2PageList(payload, pageList);
      state.authPageListLoading = false;
      state.authPageList = pageList;
      state.menuList = payload;
    }).addCase(getAuthMenuListThunk.rejected, (state, { payload }) => {
      state.authPageListLoading = false;
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
    params.password = md5(params.password).toString();
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

export const getAllDictionariesThunk = createAsyncThunk(
  'global/getAllDictionaries',
  async () => {
    const data = await getAllDictionaries();
    return data;
  }
);

export const getAuthMenuListThunk = createAsyncThunk(
  'global/getAuthMenuList',
  async () => {
    const data = await getAuthMenuList();
    return data;
  }
);

export const globalActions = globalSlice.actions;
export default globalSlice;

