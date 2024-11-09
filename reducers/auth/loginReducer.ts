import { loginUserWithEmailPassword } from "@/lib/appwrite";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum LoginStatus {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed",
  SUCCESS = "success",
}

interface LoginState {
  form: LoginForm;
  errorMessage?: string;
  loginStatus: LoginStatus;
}

interface LoginForm {
  email: string;
  password: string;
}

const initialState: LoginState = {
  form: {
    email: "",
    password: "",
  },
  loginStatus: LoginStatus.IDLE,
};

const loginUser = createAsyncThunk("login/loginUser", async ({ email, password }: LoginForm) => {
  await loginUserWithEmailPassword({ email, password });
  // localStorage.setItem("TOKEN", session.providerAccessToken)
});

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setFormField: (state, action: PayloadAction<{ field: string; value: string }>) => {
      state.form[action.payload.field as keyof LoginForm] = action.payload.value;
    },
    setErrorMessage: (state, action: PayloadAction<string | undefined>) => {
      state.errorMessage = action.payload;
    },
    reset: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loginStatus = LoginStatus.LOADING;
      state.errorMessage = undefined;
    });
    builder.addCase(loginUser.fulfilled, (state) => {
      state.loginStatus = LoginStatus.SUCCESS;
      state.errorMessage = undefined;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loginStatus = LoginStatus.FAILED;
      state.errorMessage = action.error.message;
    });
  },
});

export const loginActions = { ...loginSlice.actions, loginUser };

export default loginSlice.reducer;
