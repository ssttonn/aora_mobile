import { homeActions } from "@/reducers/main/homeReducer";
import { HomeAppDispatch, HomeRootState } from "@/stores/homeStore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useFetchPosts = () => {
  const dispatch = useDispatch<HomeAppDispatch>();
  const { posts, homeStatus } = useSelector((state: HomeRootState) => state.home);

  useEffect(() => {
    dispatch(homeActions.fetchVideoPosts());
  }, []);

  const refreshPosts = () => {
    dispatch(homeActions.refreshVideoPosts());
  }

  return { posts, homeStatus, refreshPosts };
};

export default useFetchPosts;