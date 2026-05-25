import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthScreen, UserRole } from '../types';

interface AuthState {
  activeScreen: AuthScreen;
  userRole: UserRole;
  emailAddress: string;
  companyName: string;
}

const initialState: AuthState = {
  activeScreen: AuthScreen.WELCOME,
  userRole: 'recruiter',
  emailAddress: 'agent.sourcing@benmyl.ai',
  companyName: 'Alpha Staffing Network',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setActiveScreen: (state, action: PayloadAction<AuthScreen>) => {
      state.activeScreen = action.payload;
    },
    setUserRole: (state, action: PayloadAction<UserRole>) => {
      state.userRole = action.payload;
    },
    setEmailAddress: (state, action: PayloadAction<string>) => {
      state.emailAddress = action.payload;
    },
    setCompanyName: (state, action: PayloadAction<string>) => {
      state.companyName = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<{ email: string }>) => {
      state.emailAddress = action.payload.email;
      state.activeScreen = AuthScreen.WORKSPACE_SELECT;
    },
    signupSuccess: (state, action: PayloadAction<{ role: UserRole; email: string; company: string }>) => {
      state.userRole = action.payload.role;
      state.emailAddress = action.payload.email;
      state.companyName = action.payload.company;
      state.activeScreen = AuthScreen.OTP;
    },
    logout: (state) => {
      state.activeScreen = AuthScreen.LOGIN;
      state.userRole = 'recruiter';
      state.emailAddress = 'agent.sourcing@benmyl.ai';
      state.companyName = 'Alpha Staffing Network';
    },
  },
});

export const {
  setActiveScreen,
  setUserRole,
  setEmailAddress,
  setCompanyName,
  loginSuccess,
  signupSuccess,
  logout,
} = authSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
