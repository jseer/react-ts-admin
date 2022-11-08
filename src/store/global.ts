import { getAuthMenuList, IMenuInfo } from '@/api/menu';
import { getAllDictionaries, IAllDictionaries } from '@/api/dictionaries';
import { userLogin, userLogout, getCurrentUser, ITouristInfo } from '@/api/user';
import { IUserInfo } from '@/store/user';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loopMenuList2PageList } from '@/utils/common';

interface IInitialState {
  collapsed: boolean;
  openKeys: string[];
  selectedKeys: string[];
  userInfo: IUserInfo | ITouristInfo | null;
  allDicItems: IAllDictionaries;
  menuList: IMenuInfo[];
  authPageList: IMenuInfo[];
  authPageListLoading: boolean;
}
const initialState: IInitialState = {
  collapsed: false,
  openKeys: [],
  selectedKeys: [],
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
    setUserInfo(state, { payload }: PayloadAction<IInitialState["userInfo"]>) {
      state.userInfo = payload;
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
    resetState(state) {
      state.openKeys = [];
      state.selectedKeys = [];
      state.userInfo = null;
      state.menuList = [];
      state.authPageList = [];
      state.authPageListLoading = true;
    },
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, {payload}) => {
      state.userInfo = payload;
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
  remember: boolean;
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
  async (params, { dispatch }) => {
    await userLogout();
    dispatch(globalActions.resetState());
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

