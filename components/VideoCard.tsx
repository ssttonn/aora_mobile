import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import useVideoPlayer from "@/hooks/useVideoPlayer";
import { ResizeMode, Video } from "expo-av";

interface VideoCardProps {
  videoPost: IVideoPost;
}

const VideoCard = ({
  videoPost: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}: VideoCardProps) => {
  const { video: videoRef, fadeAnim, isPlaying, setIsPlaying, setVideoStatus } = useVideoPlayer();

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image source={{ uri: avatar }} className="w-full h-full rounder-lg" resizeMode="cover" />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text className="text-white font-psemibold text-sm" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      <View className="w-full h-60 mt-3 rounded-xl overflow-hidden relative justify-center items-center">
        <Video
          ref={videoRef}
          source={{ uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" }}
          useNativeControls
          resizeMode={ResizeMode.COVER}
          isLooping
          style={{ width: "100%", height: "100%" }}
          onPlaybackStatusUpdate={(status) => {
            setVideoStatus(status);
          }}
        />
        <Animated.View
          style={{
            opacity: fadeAnim,
          }}
          className={`absolute w-full h-full ${isPlaying ? "pointer-events-none" : ""}`}
        >
          <TouchableOpacity
            onPress={async () => {
              await videoRef.current?.setPositionAsync(0);
              await videoRef.current.playAsync();
            }}
          >
            <Image source={{ uri: thumbnail }} className="w-full h-full" resizeMode="cover" />
            <View className="absolute w-full h-full justify-center items-center">
              <Image source={icons.play} className="w-12 h-12" resizeMode="contain" />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default VideoCard;
