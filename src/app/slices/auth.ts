import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from 'app/slices/message';

import AuthService from 'app/services/auth.service';
import UserService from 'app/services/user.service';

interface RegisterType {
  nickname: string;
  email: string;
  password: string;
}

interface LoginType {
  email: string;
  password: string;
}

interface EditProfileType {
  username: string;
  password: string;
  accessToken: string;
}

interface LogoutType {
  accessToken: string | null;
  refreshToken: string | null;
}

interface ReissuanceTokenType {
  refreshToken: string;
}

interface GetUserInfoType {
  accessToken: string;
}

const userString = localStorage.getItem('user');
const user = JSON.parse(userString || 'null');

export const register = createAsyncThunk<any, RegisterType>(
  'auth/register',
  async ({ nickname, email, password }, thunkAPI) => {
    try {
      const response = await AuthService.register(nickname, email, password);
      thunkAPI.dispatch(setMessage(response.data.message));
      thunkAPI.dispatch(registerFulfilled());
      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      thunkAPI.dispatch(registerRejected());
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const login = createAsyncThunk<any, LoginType>(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password);
      thunkAPI.dispatch(loginFulfilled(data));
      return { user: data };
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      thunkAPI.dispatch(loginRejected());
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const socialLogin = createAsyncThunk<any, any>(
  'auth/socailLogin',
  async (accessToken, thunkAPI) => {
    try {
      const data = await UserService.getUserProfile(accessToken);
      thunkAPI.dispatch(socialLoginFulfilled(data.data));
      return { user: data.data };
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      thunkAPI.dispatch(socialLoginRejected());
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const editProfile = createAsyncThunk<any, EditProfileType>(
  'auth/edit',
  async ({ username, password, accessToken }, thunkAPI) => {
    try {
      const data = await UserService.editProfile(
        username,
        password,
        accessToken,
      );
      return { data };
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const logout = createAsyncThunk<any, LogoutType>(
  'auth/logout',
  async ({ refreshToken, accessToken }, thunkAPI) => {
    try {
      if (refreshToken !== null && accessToken !== null) {
        await AuthService.logout(refreshToken, accessToken);
        thunkAPI.dispatch(logoutFulfilled());
      }
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      thunkAPI.dispatch(logoutRejected());
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const reissuanceToken = createAsyncThunk<any, ReissuanceTokenType>(
  'auth/reissuance',
  async ({ refreshToken }, thunkAPI) => {
    try {
      const data = await AuthService.reissuanceToken(refreshToken);
      return { data };
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getUserInfo = createAsyncThunk<any, GetUserInfoType>(
  'auth/login',
  async ({ accessToken }, thunkAPI) => {
    try {
      const data = await UserService.getUserProfile(accessToken);
      return { user: data };
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const reset = createAsyncThunk('auth/reset', async (_, thunkAPI) => {
  try {
    thunkAPI.dispatch(resetFulfilled());
    return { isLoggedIn: false, user: null };
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(error);
  }
});

export const dummyLogin = createAsyncThunk<any, string>(
  'auth/dummyLogin',
  async (email, thunkAPI) => {
    try {
      thunkAPI.dispatch(dummyLoginFulfilled(email));
      return { isLoggedIn: true, user: email };
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const dummyLogout = createAsyncThunk(
  'auth/dummyLogout',
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(dummyLogoutFulfilled());
      return { isLoggedIn: false, user: null };
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const underFourteenCheck = createAsyncThunk<any, boolean>(
  'auth/underFourteenCheck',
  async (isUnderFourteen, thunkAPI) => {
    try {
      thunkAPI.dispatch(underFourteenFulfilled(isUnderFourteen));
      return { underFourteen: isUnderFourteen };
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error);
    }
  },
);

interface AuthState {
  isLoggedIn: boolean;
  user: any[] | null;
  underFourteen: boolean;
}

const initialState: AuthState = user
  ? { isLoggedIn: true, user, underFourteen: false }
  : { isLoggedIn: false, user: null, underFourteen: false };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerFulfilled: (state) => {
      state.isLoggedIn = false;
    },
    registerRejected: (state) => {
      state.isLoggedIn = false;
    },
    loginFulfilled: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    loginRejected: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    socialLoginFulfilled: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    socialLoginRejected: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    logoutFulfilled: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    logoutRejected: (state) => {
      state.isLoggedIn = true;
      state.user = state.user !== null ? [...state.user] : null;
    },
    resetFulfilled: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    dummyLoginFulfilled: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    dummyLogoutFulfilled: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    underFourteenFulfilled: (state, action) => {
      state.underFourteen = action.payload;
    },
  },
});

const {
  registerFulfilled,
  registerRejected,
  loginFulfilled,
  loginRejected,
  socialLoginFulfilled,
  socialLoginRejected,
  logoutFulfilled,
  logoutRejected,
  resetFulfilled,
  dummyLoginFulfilled,
  dummyLogoutFulfilled,
  underFourteenFulfilled,
} = authSlice.actions;
const { reducer } = authSlice;
export default reducer;
