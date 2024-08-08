import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',

  initialState: {
    currentUser: null,
    loading: false,
    error: false,
    isAdmin: false,
    token: null,
    refreshToken: null,
  },

  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload.user.email;
      state.token = payload.bearer.accessToken;
      state.refreshToken = payload.bearer.refreshToken;
    },

    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload?.user?._id;
      state.isAdmin = payload?.user?.isAdmin;
      state.token = payload?.bearer?.accessToken;
      state.refreshToken = payload?.bearer?.refreshToken;
      // state.currentUser = payload.user.email;
      // state.userId = payload?.user?._id;
    },

    refresh: (state, { payload }) => {
      state.loading = false;
      state.token = payload.bearer.accessToken;
    },

    logoutSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.isAdmin = false;
      state.token = null;
      state.refreshToken = null;
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  registerSuccess,
  logoutSuccess,
  loginSuccess,
  fetchFail,
  refresh,
} = authSlice.actions;
export default authSlice.reducer;
