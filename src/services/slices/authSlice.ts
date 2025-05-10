import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { TUser } from '@utils-types';

interface UserState {
  user: TUser | null;
  isAuth: boolean | null;
  loading: boolean;
  error: string | undefined;
}

const initialState: UserState = {
  user: null,
  isAuth: null,
  loading: false,
  error: undefined
};

export const registerUser = createAsyncThunk<
  TUser,
  TRegisterData,
  { rejectValue: string }
>('user/register', (data, { rejectWithValue }) =>
  registerUserApi(data)
    .then((response) => response.user)
    .catch((err) => rejectWithValue(err.message))
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData, { rejectWithValue }) =>
    loginUserApi(data)
      .then((response) => response.user)
      .catch((err) => rejectWithValue(err.message))
);

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'user/logout',
  (_, { rejectWithValue }) =>
    logoutApi()
      .then(() => {})
      .catch((err) => rejectWithValue(err.message))
);

export const fetchUser = createAsyncThunk(
  'user/fetch',
  (_, { rejectWithValue }) =>
    getUserApi()
      .then((response) => response.user)
      .catch((err) => rejectWithValue(err.message))
);

export const updateUser = createAsyncThunk(
  'user/update',
  (user: Partial<TRegisterData>, { rejectWithValue }) =>
    updateUserApi(user)
      .then((response) => response.user)
      .catch((err) => rejectWithValue(err.message))
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.isAuth = true;
        } else {
          state.user = null;
          state.isAuth = false;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.isAuth = true;
        } else {
          state.user = null;
          state.isAuth = false;
        }
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuth = false;
        state.user = null;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.isAuth = true;
        } else {
          state.user = null;
          state.isAuth = false;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
        state.loading = false;
        state.error = undefined;
      });
  }
});

export default userSlice.reducer;
