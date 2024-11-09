import { createUser } from "@/lib/appwrite";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum RegisterStatus {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed",
  SUCCESS = "success",
}

interface RegisterState {
  form: RegisterForm;
  errorMessage?: string;
  registerStatus: RegisterStatus;
}

interface RegisterForm {
  email: string;
  password: string;
  username: string;
}

const initialState: RegisterState = {
  form: {
    email: "",
    password: "",
    username: "",
  },
  errorMessage: "",
  registerStatus: RegisterStatus.IDLE,
};

const registerUser = createAsyncThunk("register/register", async (registerForm: RegisterForm) => {
  await createUser({
    email: registerForm.email,
    password: registerForm.password,
    username: registerForm.username,
  });
});

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setFormField: (state, action: PayloadAction<{ field: String; value: string }>) => {
      state.form[action.payload.field as keyof RegisterForm] = action.payload.value;
    },
    setErrorMessage: (state, action: PayloadAction<string | undefined>) => {
      if (action.payload) {
        state.registerStatus = RegisterStatus.FAILED;
      } else {
        state.registerStatus = RegisterStatus.IDLE;
      }
      state.errorMessage = action.payload;
    },
    reset: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.registerStatus = RegisterStatus.SUCCESS;
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.registerStatus = RegisterStatus.FAILED;
      state.errorMessage = action.error.message;
    });
    builder.addCase(registerUser.pending, (state, action) => {
      state.registerStatus = RegisterStatus.LOADING;
    });
  },
});

export const registerActions = {
  ...registerSlice.actions,
  registerUser,
};

export default registerSlice.reducer;
