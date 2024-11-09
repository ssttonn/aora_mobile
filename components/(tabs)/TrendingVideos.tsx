import { Image, Text, FlatList, TouchableOpacity, ImageBackground } from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";
import { Video, ResizeMode } from "expo-av";

const zoomIn: Animatable.CustomAnimation = {
  0: {
    scaleX: 0.9,
    scaleY: 0.9,
  },
  1: {
    scaleX: 1.1,
    scaleY: 1.1,
  },
};

const zoomOut = {
  0: {
    scaleX: 1.1,
    scaleY: 1.1,
  },
  1: {
    scaleX: 0.9,
    scaleY: 0.9,
  },
};

const TrendingItem = ({ activeItemId, currentItem }: { activeItemId: string; currentItem: IVideoPost }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Animatable.View className="mr-5" animation={activeItemId === currentItem.id ? zoomIn : zoomOut}>
      {isPlaying ? (
        <Video
          source={{ uri: currentItem.video }}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping
          useNativeControls
          onPlaybackStatusUpdate={(status) => {
              
          }}
          className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg"
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => {
            setIsPlaying(true);
          }}
        >
          <ImageBackground
            source={{ uri: currentItem.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image className="absolute w-12 h-12" source={icons.play} resizeMode="contain" />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

interface TrendingVideosProps {
  posts: IVideoPost[];
}

const TrendingVideos = ({ posts }: TrendingVideosProps) => {
  const [activeItem, setActiveItem] = useState<string>(posts[0]?.id);

  const viewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length === 0) return;

    setActiveItem(viewableItems[0].key);
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(post) => post.id}
      renderItem={(item) => {
        return <TrendingItem activeItemId={activeItem} currentItem={item.item} />;
      }}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
      contentOffset={{ x: 170, y: 0 }}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
    />
  );
};

export default TrendingVideos;
