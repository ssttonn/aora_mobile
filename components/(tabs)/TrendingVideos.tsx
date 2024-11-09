import { View, Text, FlatList } from "react-native";
import React from "react";

interface TrendingVideosProps {
  posts: any[];
}

const TrendingVideos = ({ posts }: TrendingVideosProps) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(post) => post.id}
      renderItem={() => {
        return <Text className="text-3xl text-white">Post</Text>;
      }}
      horizontal={true}
    />
  );
};

export default TrendingVideos;
