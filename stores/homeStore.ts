import homeReducer from "@/reducers/main/homeReducer";
import searchReducer from "@/reducers/main/searchReducer";
import { configureStore } from "@reduxjs/toolkit";

export const homeStore = configureStore({
    reducer: {
        home: homeReducer,
        search: searchReducer,
    }
})

export type HomeRootState = ReturnType<typeof homeStore.getState>

export type HomeAppDispatch = typeof homeStore.dispatch