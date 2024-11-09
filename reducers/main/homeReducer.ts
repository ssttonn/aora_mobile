import { convertToPostModel } from "@/helpers/extensions";
import { fetchAllVideoPosts, fetchLatestVideoPosts } from "@/lib/appwrite";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Models } from "react-native-appwrite";

export enum HomeStatus {
  FETCHING_POSTS = "FETCHING_POSTS",
  IDLE = "IDLE",
  REFRESHING_POSTS = "REFRESHING_POSTS",
}

interface HomeState {
  allPosts: IVideoPost[];
  latestPosts: IVideoPost[];
  homeStatus: HomeStatus;
}

const initialState: HomeState = {
  allPosts: [],
  latestPosts: [],
  homeStatus: HomeStatus.IDLE,
};

const fetchHomeData = createAsyncThunk<{ allPosts: IVideoPost[]; latestPosts: IVideoPost[] }>(
  "home/fetchHomeData",
  async () => {
    const [allPosts, latestPosts] = await Promise.all([fetchAllVideoPosts(), fetchLatestVideoPosts()]);

    return {
      allPosts: allPosts.documents.map((post: Models.Document) => convertToPostModel(post)),
      latestPosts: latestPosts.documents.map((post: Models.Document) => convertToPostModel(post)),
    };
  }
);

const refreshHomeData = createAsyncThunk<{ allPosts: IVideoPost[]; latestPosts: IVideoPost[] }>(
  "home/refreshHomeData",
  async () => {
    const [allPosts, latestPosts] = await Promise.all([fetchAllVideoPosts(), fetchLatestVideoPosts()]);

    return {
      allPosts: allPosts.documents.map((post: Models.Document) => convertToPostModel(post)),
      latestPosts: latestPosts.documents.map((post: Models.Document) => convertToPostModel(post)),
    };
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<IVideoPost[]>) => {
      state.allPosts = action.payload;
    },
    setHomeStatus: (state, action: PayloadAction<HomeStatus>) => {
      state.homeStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHomeData.pending, (state) => {
      state.homeStatus = HomeStatus.FETCHING_POSTS;
    });
    builder.addCase(fetchHomeData.fulfilled, (state, action) => {
      state.allPosts = action.payload.allPosts;
      state.latestPosts = action.payload.latestPosts;
      state.homeStatus = HomeStatus.IDLE;
    });
    builder.addCase(fetchHomeData.rejected, (state) => {
      state.homeStatus = HomeStatus.IDLE;
    });
    builder.addCase(refreshHomeData.pending, (state) => {
      state.homeStatus = HomeStatus.REFRESHING_POSTS;
    });
    builder.addCase(refreshHomeData.fulfilled, (state, action) => {
      state.allPosts = action.payload.allPosts;
      state.latestPosts = action.payload.latestPosts;
      state.homeStatus = HomeStatus.IDLE;
    });
    builder.addCase(refreshHomeData.rejected, (state) => {
      state.homeStatus = HomeStatus.IDLE;
    });
  },
});

export const homeActions = {
  ...homeSlice.actions,
  fetchHomeData,
  refreshHomeData,
};

export default homeSlice.reducer;
