import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import MainButton from "@/components/MainButton";

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full justify-center items-center px-4">
          <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode="contain" />
          <Image source={images.cards} className="max-w-[380px] w-full h-[300px]" resizeMode="contain" />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Posibilities with {' '}<Text className="text-secondary-200">Aora</Text>
            </Text>
            
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-3 text-center">Where creativity meets innovation: embark on a journey of limitless exploration with Aora</Text>
          <MainButton title="Login" className="pt-2 pb-2 pl-2 pr-2" onPress={(e) => {
            console.log("Clicked")
          }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
