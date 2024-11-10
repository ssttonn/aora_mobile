import { FlatList, View, Text, Image, Alert, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import DismissKeyboard from "@/components/DismissKeyboard";
import { router, usePathname } from "expo-router";
import TrendingVideos from "@/components/(tabs)/TrendingVideos";
import EmptyBox from "@/components/EmptyBox";
import MainButton from "@/components/MainButton";
import VideoCard from "@/components/VideoCard";
import { useSelector } from "react-redux";
import { MainAppDispatch, MainRootState } from "@/stores/mainStore";
import { useDispatch } from "react-redux";
import { homeActions } from "@/reducers/main/homeReducer";
import { useEffect } from "react";

const useHomePage = () => {
  const pathname = usePathname();
  const { allPosts, latestPosts, homeStatus } = useSelector((state: MainRootState) => state.home);
  const dispatch = useDispatch<MainAppDispatch>();

  const refreshPosts = () => {
    dispatch(homeActions.refreshHomeData());
  };

  useEffect(() => {
    dispatch(homeActions.fetchHomeData());
  }, []);

  return {
    pathname,
    allPosts,
    latestPosts,
    homeStatus,
    refreshPosts,
  };
};

const HomePage = () => {
  const { pathname, allPosts, latestPosts, homeStatus, refreshPosts } = useHomePage();
  
  return (
    <DismissKeyboard>
      <SafeAreaView className="bg-primary h-full">
        <FlatList
          data={allPosts}
          renderItem={({ item }) => <VideoCard videoPost={item} />}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={() => {
            return (
              <View className="my-6 px-4 space-x-6">
                <View className="justify-between items-start flex-row mb-6">
                  <View>
                    <Text className="font-pmedium text-sm text-gray-100">Welcome back</Text>
                    <Text className="text-2xl font-psemibold text-white">Sstonn</Text>
                  </View>
                  <View className="mt-1.5">
                    <Image source={images.logoSmall} className="w-9 h-10" resizeMode="contain" />
                  </View>
                </View>
                <SearchInput
                  onSearchClicked={(query) => {
                    if (query === "")
                      return Alert.alert("Missing Query", "Please input something to search results across database");

                    if (pathname.startsWith("/search")) router.setParams({ query });
                    else router.push(`/search/${query}`);
                  }}
                />
                <View className="w-full flex-1 pt-5 pb-8">
                  <Text className="text-gray-100 text-lg font-pregular mb-3">Latest Videos</Text>
                  <TrendingVideos posts={latestPosts} />
                </View>
              </View>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View className="items-center">
                <EmptyBox title="No Videos Found" subtitle="Be the first one to upload a video" />
                <MainButton
                  title="Create video"
                  className="bg-secondary w-[40%] mt-3"
                  onPress={() => {
                    router.push("/createVideo");
                  }}
                />
              </View>
            );
          }}
          // refreshControl={
          //   <RefreshControl refreshing={homeStatus == HomeStatus.REFRESHING_POSTS} onRefresh={refreshPosts} />
          // }
        />
      </SafeAreaView>
    </DismissKeyboard>
  );
};

export default HomePage;
