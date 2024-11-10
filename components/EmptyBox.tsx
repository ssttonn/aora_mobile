import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import MainButton from "./MainButton";

interface EmptyBoxProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const EmptyBox = ({ title, subtitle, className }: EmptyBoxProps) => {
  return (
    <View className={className || "justify-center items-center pl-[14px] pr-[14px]"}>
      <Image source={images.empty} className="w-[270px] h-[215px]" resizeMode="contain" />
      <Text className="text-2xl color-white font-pmedium text-center">{title}</Text>
      {subtitle &&<Text className="text-xl color-white font-pextralight text-center">{subtitle}</Text>}
    </View>
  );
};

export default EmptyBox;
