import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegisterState {
  email: string;
  password: string;
  username: string;
}

const initialState: RegisterState = {
  email: "",
  password: "",
  username: "",
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setFormField: (state, action: PayloadAction<{ field: String; value: string }>) => {
      state[action.payload.field as keyof RegisterState] = action.payload.value;
    },
  },
});

export const { setFormField } = registerSlice.actions;

export default registerSlice.reducer;
