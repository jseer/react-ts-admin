import { rolePage, createRole } from '@/api/role';
import { IPagination } from '@/utils/typing';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IRoleState {
  roleList: IRoleInfo[];
  listLoading: boolean;
}
const initialState: IRoleState = {
  roleList: [],
  listLoading: false,
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setRoleList(state, { payload }: PayloadAction<IRoleState['roleList']>) {
      state.roleList = payload;
    },
    setListLoading(state, { payload }: PayloadAction<IRoleState['listLoading']>) {
      state.listLoading = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(rolePageThunk.fulfilled, (state, { payload }) => {
      state.roleList = payload.list;
      state.listLoading = false;
    }).addCase(rolePageThunk.pending, (state) => {
      state.listLoading = true;
    }).addCase(rolePageThunk.rejected, (state) => {
      state.listLoading = false;
    })
  },
});

export const userCreateThunk = createAsyncThunk(
  'user/create',
  async (params: IRoleInfo) => {
    const result = await createRole(params);
    return result;
  }
);

export interface IRoleInfo {
  name: string;
  code: string;
}
export interface IRolePage extends IPagination {
  list: IRoleInfo[];
}
export const rolePageThunk = createAsyncThunk(
  'role/page',
  async (data: IRolePage) => {
    const result = await rolePage(data);
    return result;
  }
);

export const roleActions = roleSlice.actions;
export default roleSlice;
