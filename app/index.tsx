import { View, Image } from "react-native";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../stores/rootStore";
import { authActions } from "../reducers/auth/authReducer";
import { router } from "expo-router";
import { images } from "../constants";

const SplashPage = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
   dispatch(authActions.checkUserProfile()).then((user) => {
      if (user) {
        router.replace("/home")
      } else {
        router.replace("/onboarding")
      }
   }).catch((error) => {
    console.error(error)
      router.replace("/onboarding")
   })
  }, [])

  return (
    <View className="bg-primary h-full justify-center items-center">
      <Image source={images.logo} className="w-[60%]" resizeMode="contain" />
    </View>
  );
}


export default SplashPage;