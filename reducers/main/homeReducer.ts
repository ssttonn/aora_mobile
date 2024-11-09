import { fetchAllVideoPosts } from "@/lib/appwrite";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Models } from "react-native-appwrite";

export enum HomeStatus {
  FETCHING_POSTS = "FETCHING_POSTS",
  IDLE = "IDLE",
  REFRESHING_POSTS = "REFRESHING_POSTS",
}

interface HomeState {
  posts: IVideoPost[];
  homeStatus: HomeStatus;
}

const initialState: HomeState = {
  posts: [],
  homeStatus: HomeStatus.IDLE,
};

const fetchVideoPosts = createAsyncThunk<IVideoPost[]>("home/fetchVideoPosts", async () => {
  const posts = await fetchAllVideoPosts();
  return posts.documents.map((post: Models.Document) => {
    return {
      id: post.$id,
      title: post.title,
      video: post.video,
      creator: post.creator,
      thumbnail: post.thumbnail,
      prompt: post.prompt,
    };
  });
});

const refreshVideoPosts = createAsyncThunk<IVideoPost[]>("home/refreshVideoPosts", async () => {
  const posts = await fetchAllVideoPosts();
  return posts.documents.map((post: Models.Document) => {
    return {
      id: post.$id,
      title: post.title,
      video: post.video,
      creator: post.creator,
      thumbnail: post.thumbnail,
      prompt: post.prompt,
    };
  });
});

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<IVideoPost[]>) => {
      state.posts = action.payload;
    },
    setHomeStatus: (state, action: PayloadAction<HomeStatus>) => {
      state.homeStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVideoPosts.pending, (state) => {
      state.homeStatus = HomeStatus.FETCHING_POSTS;
    });
    builder.addCase(fetchVideoPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.homeStatus = HomeStatus.IDLE;
    });
    builder.addCase(fetchVideoPosts.rejected, (state) => {
      state.homeStatus = HomeStatus.IDLE;
    });
    builder.addCase(refreshVideoPosts.pending, (state) => {
      state.homeStatus = HomeStatus.REFRESHING_POSTS;
    });
    builder.addCase(refreshVideoPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.homeStatus = HomeStatus.IDLE;
    });
    builder.addCase(refreshVideoPosts.rejected, (state) => {
      state.homeStatus = HomeStatus.IDLE;
    });
  },
});

export const homeActions = {
  ...homeSlice.actions,
  fetchVideoPosts,
  refreshVideoPosts,
};

export default homeSlice.reducer;
