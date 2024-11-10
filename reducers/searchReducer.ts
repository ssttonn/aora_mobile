import { convertToPostModel } from "@/helpers/extensions";
import { searchVideoPosts } from "@/lib/appwrite";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Models } from "react-native-appwrite";

export enum SearchStatus {
    IDLE = "IDLE",
    FETCHING = "FETCHING",
    REFRESHING = "REFRESHING",
}

interface SearchState {
    posts: IVideoPost[];
    status: SearchStatus;
    errorMessage?: string;
}

const initialState: SearchState = {
    posts: [],
    status: SearchStatus.IDLE,
    errorMessage: undefined,
};

const searchPosts = createAsyncThunk("search/fetchPosts", async (query: string) => {
    try {
        const response = await searchVideoPosts(query);
        return response.documents.map((post: Models.Document) => convertToPostModel(post));
    } catch (error) {
        throw error;
    }
})

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(searchPosts.pending, (state) => {
            state.status = SearchStatus.FETCHING;
        });
        builder.addCase(searchPosts.fulfilled, (state, action: PayloadAction<IVideoPost[]>) => {
            console.log('action.payload', action.payload)
            state.posts = action.payload;
            state.status = SearchStatus.IDLE;
        });
        builder.addCase(searchPosts.rejected, (state, action) => {
            state.status = SearchStatus.IDLE;
            state.errorMessage = action.error.message;
        });
    },
});

export const searchActions = {
    ...searchSlice.actions,
    searchPosts,
}

export default searchSlice.reducer;



