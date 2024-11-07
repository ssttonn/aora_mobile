import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
    email: string;
    password: string;
}

const initialState: LoginState = {
    email: "",
    password: "",
};

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setFormField: (state, action: PayloadAction<{ field: string; value: string }>) => {
            state[action.payload.field as keyof LoginState] = action.payload.value;
        }
    }
})

export const { setFormField } = loginSlice.actions;

export default loginSlice.reducer;