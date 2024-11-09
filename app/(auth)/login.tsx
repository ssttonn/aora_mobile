import { Alert, Image, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import MainButton from "@/components/MainButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../stores/rootStore";
import { loginActions, LoginStatus } from "../../reducers/auth/loginReducer";
import { Link, router } from "expo-router";
import { useValidators } from "@/hooks/useValidators";
import { authActions, AuthStatus } from "@/reducers/auth/authReducer";

const LoginPage = () => {
  const {email, password} = useSelector((state: RootState) => state.login.form);
  const {errorMessage, loginStatus} = useSelector((state: RootState) => state.login);
  const {emailValidator, passwordValidator} = useValidators();
  const dispatch = useDispatch<AppDispatch>();

  const onLogin = async (_: any) => {
    await dispatch(loginActions.loginUser({ email, password }));
  }

  useEffect(() => {
    if (loginStatus === LoginStatus.SUCCESS) {
      router.replace("/home");
      dispatch(loginActions.reset());
    } else if (errorMessage) {
      Alert.alert("Error", errorMessage, [
        { text: "OK", onPress: () => dispatch(loginActions.setErrorMessage(undefined)) },
      ]);
    } 
  }, [errorMessage, loginStatus]);

  const isButtonDisabled = emailValidator(email) !== "" || passwordValidator(password) !== "";

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-4 my-6 gap-y-7">
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]" />
          <Text className="text-2xl text-white text-semibold font-psemibold">Log in to Aora</Text>
          <FormField
            title="Email"
            value={email}
            keyboardType="email-address"
            validator={emailValidator}
            onChangeText={(value) => {
              dispatch(loginActions.setFormField({ field: "email", value: value }));
            }}
          />
          <FormField
            title="Password"
            value={password}
            keyboardType="default"
            validator={passwordValidator}
            onChangeText={(value) => dispatch(loginActions.setFormField({ field: "password", value: value }))}
          />
          <MainButton
            title="Login"
            onPress={onLogin}
            isLoading={loginStatus === LoginStatus.LOADING}
            disabled={isButtonDisabled || loginStatus === LoginStatus.LOADING}
            className={`${isButtonDisabled || loginStatus == LoginStatus.LOADING ? "bg-gray-400" : "bg-secondary"}`}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text>
            <Link href="/register" className="text-lg font-psemibold text-secondary">
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginPage;
