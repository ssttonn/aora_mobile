import {configureStore} from '@reduxjs/toolkit';
import loginReducer from '../reducers/auth/loginReducer';
import registerReducer from "../reducers/auth/registerReducer";
import authReducer from '../reducers/auth/authReducer';

export const rootStore = configureStore({
    reducer: {
        auth: authReducer,
        login: loginReducer,
        register: registerReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof rootStore.dispatch