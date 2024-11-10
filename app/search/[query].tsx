import { FlatList, Text, View, Image, Alert } from "react-native";
import React, { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { MainAppDispatch, MainRootState } from "@/stores/mainStore";
import { searchActions } from "@/reducers/searchReducer";
import VideoCard from "@/components/VideoCard";
import EmptyBox from "@/components/EmptyBox";
import MainButton from "@/components/MainButton";
import SearchInput from "@/components/SearchInput";
import { images } from "@/constants";
import { AppDispatch, RootState } from "@/stores/rootStore";
import DismissKeyboard from "@/components/DismissKeyboard";

const SearchPage = () => {
  const { query } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = React.useState(query as string);
  const dispatch = useDispatch<AppDispatch>();
  const { posts, status, errorMessage } = useSelector((state: RootState) => {
    return state.search;
  });

  useEffect(() => {
    dispatch(searchActions.searchPosts(searchQuery));
  }, [searchQuery]);

  return (
    <DismissKeyboard>
      <SafeAreaView className="bg-primary h-full">
        <FlatList
          data={posts}
          renderItem={({ item }) => <VideoCard videoPost={item} />}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={() => {
            return (
              <View className="my-6 px-4 space-x-6">
                <View className="justify-between items-start flex-row mb-6">
                  <View>
                    <Text className="font-pmedium text-sm text-gray-100">Search Results</Text>
                    <Text className="text-2xl font-psemibold text-white">{searchQuery}</Text>
                  </View>
                </View>
                <SearchInput initialQuery={searchQuery} onSearchClicked={(query) => {
                  setSearchQuery(query);
                }} />
              </View>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View className="items-center">
                <EmptyBox
                  title={errorMessage || "No Videos Found"}
                  subtitle={errorMessage === undefined ? "Be the first one to upload a video" : undefined}
                />
                <MainButton
                  title="Create video"
                  className="bg-secondary w-[40%] mt-3"
                  onPress={() => {
                    router.replace("/createVideo");
                  }}
                />
              </View>
            );
          }}
        />
      </SafeAreaView>
    </DismissKeyboard>
  );
};

export default SearchPage;
