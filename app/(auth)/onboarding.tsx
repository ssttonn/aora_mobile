import { ScrollView, Text, View, Image, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import MainButton from '@/components/MainButton';
import { Href, router } from 'expo-router';
import { images } from '@/constants';

const OnboardingPage = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="w-full min-h-full justify-center items-center px-4">
            <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode="contain" />
            <Image source={images.cards} className="max-w-[380px] w-full h-[300px]" resizeMode="contain" />
            <View className="relative mt-5">
              <Text className="text-3xl text-white font-bold text-center">
                Discover Endless Posibilities with <Text className="text-secondary-200">Aora</Text>
              </Text>
            </View>
            <Text className="text-sm font-pregular text-gray-100 mt-3 text-center">
              Where creativity meets innovation: embark on a journey of limitless exploration with Aora
            </Text>
            <MainButton
              title="Continue with Email"
              className="w-full mt-7 bg-secondary"
              onPress={(e) => {
                router.replace("/login" as Href<"/login">);
              }}
            />
          </View>
        </ScrollView>
        <StatusBar backgroundColor="#161622" barStyle="light-content" />
      </SafeAreaView>
  )
}

export default OnboardingPage
