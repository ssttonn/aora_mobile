import homeReducer from "@/reducers/main/homeReducer";
import searchReducer from "@/reducers/searchReducer";
import { configureStore } from "@reduxjs/toolkit";

export const mainStore = configureStore({
    reducer: {
        home: homeReducer,
    }
})

export type MainRootState = ReturnType<typeof mainStore.getState>

export type MainAppDispatch = typeof mainStore.dispatch