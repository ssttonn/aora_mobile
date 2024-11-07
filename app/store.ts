import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './(auth)/reducers/loginReducer';
import registerReducer from "./(auth)/reducers/registerReducer";

export const store = configureStore({
    reducer: {
        login: loginReducer,
        register: registerReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch