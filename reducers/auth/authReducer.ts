import { getCurrentUser, logoutUser } from "@/lib/appwrite";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginActions } from "./loginReducer";
import { registerActions } from "./registerReducer";

export enum AuthStatus {
    AUTHENTICATED = "authenticated",
    UNAUTHENTICATED = "unauthenticated",
    AUTHENTICATING = "authenticating",
}

interface AuthState {
    status: AuthStatus;
}

const initialState: AuthState = {
    status: AuthStatus.UNAUTHENTICATED,
};

const checkUserProfile = createAsyncThunk("auth/checkUserProfile", async () => {
   const user = getCurrentUser()
    if (!user) {
         throw new Error("No user found")
    }

    return user;
})

const logout = createAsyncThunk("auth/logout", async () => {
    await logoutUser()
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthStatus: (state, action) => {
            state.status = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(checkUserProfile.pending, (state) => {
            state.status = AuthStatus.AUTHENTICATING;
        });
        builder.addCase(checkUserProfile.fulfilled, (state) => {
            state.status = AuthStatus.AUTHENTICATED;
        });
        builder.addCase(checkUserProfile.rejected, (state) => {
            state.status = AuthStatus.UNAUTHENTICATED;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.status = AuthStatus.UNAUTHENTICATED;
        });
        builder.addCase(loginActions.loginUser.fulfilled, (state) => {
            state.status = AuthStatus.AUTHENTICATED;
        })
        builder.addCase(registerActions.registerUser.fulfilled, (state) => {
            state.status = AuthStatus.AUTHENTICATED;
        })
    }
})

export const authActions = {
    ...authSlice.actions,
    checkUserProfile,
    logout
}

export default authSlice.reducer;