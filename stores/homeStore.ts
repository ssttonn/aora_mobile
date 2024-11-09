import homeReducer from "@/reducers/main/homeReducer";
import { configureStore } from "@reduxjs/toolkit";

export const homeStore = configureStore({
    reducer: {
        home: homeReducer
    }
})

export type HomeRootState = ReturnType<typeof homeStore.getState>

export type HomeAppDispatch = typeof homeStore.dispatch