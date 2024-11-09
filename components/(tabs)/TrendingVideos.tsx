import { Image, FlatList, TouchableOpacity, ImageBackground, View, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";
import { Video, ResizeMode } from "expo-av";
import useVideoPlayer from "@/hooks/useVideoPlayer";

const zoomIn: Animatable.CustomAnimation = {
  0: {
    scaleX: 0.9,
    scaleY: 0.9,
  },
  1: {
    scaleX: 1,
    scaleY: 1,
  },
};

const zoomOut = {
  0: {
    scaleX: 1,
    scaleY: 1,
  },
  1: {
    scaleX: 0.9,
    scaleY: 0.9,
  },
};


const TrendingItem = ({
  activeItemId,
  currentItem,
  onPlayCurrentItem,
}: {
  activeItemId: string;
  currentItem: IVideoPost;
  onPlayCurrentItem: (id: string) => void;
}) => {
  const { video, fadeAnim, isPlaying, setIsPlaying, setVideoStatus } = useVideoPlayer();

  useEffect(() => {
    if (activeItemId !== currentItem.id && video.current) {
      setIsPlaying(false);
      video.current.pauseAsync();
    }
  }, [activeItemId]);

  return (
    <Animatable.View className="mr-5" animation={activeItemId === currentItem.id ? zoomIn : zoomOut}>
      <View className="z-0 w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40">
        <Video
          ref={video}
          source={{ uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" }}
          useNativeControls
          resizeMode={ResizeMode.COVER}
          isLooping
          style={{ width: "100%", height: "100%" }}
          onPlaybackStatusUpdate={(status) => {
            setVideoStatus(status);
          }}
        />
      </View>
      <Animated.View
        style={{
          opacity: fadeAnim,
        }}
        className={`absolute w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40 ${
          isPlaying ? "pointer-events-none" : ""
        }`}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={async () => {
            onPlayCurrentItem(currentItem.id);
            await video.current?.setPositionAsync(0);
            await video.current.playAsync();
          }}
        >
          <ImageBackground
            source={{ uri: currentItem.thumbnail }}
            className="w-full h-full overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <View className="absolute w-full h-full justify-center items-center">
            <Image className="w-[40px] h-[40px]" source={icons.play} resizeMode="contain" />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animatable.View>
  );
};

interface TrendingVideosProps {
  posts: IVideoPost[];
}

const TrendingVideos = ({ posts }: TrendingVideosProps) => {
  const [activeItem, setActiveItem] = useState<string>(posts[0]?.id);
  const flatListRef = useRef<any>(null);

  const viewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length === 0) return;

    setActiveItem(viewableItems[0].key);
  };

  return (
    <FlatList
      ref={flatListRef}
      data={posts}
      keyExtractor={(post) => post.id}
      renderItem={(item) => {
        return (
          <TrendingItem
            onPlayCurrentItem={(itemId) => {
              setActiveItem(itemId);
              flatListRef.current.scrollToIndex({ index: item.index, animated: true, viewPosition: 0.5 });
            }}
            activeItemId={activeItem}
            currentItem={item.item}
          />
        );
      }}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
    />
  );
};

export default TrendingVideos;
