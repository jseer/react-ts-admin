import { userRegister } from './../api/user';
import { IRoleInfo } from './role';
import { userCreate, userPage } from '@/api/user';
import { IPagination } from '@/utils/typing';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import md5 from 'crypto-js/md5';

export interface IUserState {
  userList: IUserInfo[];
  listLoading: boolean;
}
const initialState: IUserState = {
  userList: [],
  listLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserList(state, { payload }: PayloadAction<IUserState['userList']>) {
      state.userList = payload;
    },
    setListLoading(state, { payload }: PayloadAction<IUserState['listLoading']>) {
      state.listLoading = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(userPageThunk.fulfilled, (state, { payload }) => {
      state.userList = payload.list;
      state.listLoading = false;
    }).addCase(userPageThunk.pending, (state) => {
      state.listLoading = true;
    }).addCase(userPageThunk.rejected, (state) => {
      state.listLoading = false;
    })
  },
});

export interface IUserInfo {
  id: number;
  name: string;
  email: string;
  password: string;
  gender: 1 | 2;
  roles?: IRoleInfo[],
}
export const userCreateThunk = createAsyncThunk(
  'user/create',
  async (params: IUserInfo) => {
    const result = await userCreate(params);
    return result;
  }
);

export const userRegisterThunk = createAsyncThunk(
  'user/register',
  async (params: IUserInfo) => {
    params.password = md5(params.password).toString();
    const result = await userRegister(params);
    return result;
  }
);

export interface IUserParams {
  name?: string;
  email?: string;
  role?: string;
}
export interface IUserPage extends IPagination {
  list: IUserInfo[];
}
export const userPageThunk = createAsyncThunk(
  'user/page',
  async (params: IUserParams) => {
    const result = await userPage(params);
    return result;
  }
);

export const userActions = userSlice.actions;
export default userSlice;


