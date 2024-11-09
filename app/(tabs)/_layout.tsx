import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { router, Tabs } from "expo-router";
import { icons } from "../../constants";
import { RootState } from "../../stores/rootStore";
import { Provider, useSelector } from "react-redux";
import { AuthStatus } from "@/reducers/auth/authReducer";
import { homeStore } from "@/stores/homeStore";

interface TabIconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image source={icon} resizeMode="contain" tintColor={color} className="w-6 h-6" />
      <Text className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`} style={{ color: color }}>
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  const status = useSelector((state: RootState) => state.auth.status)

  useEffect(() => {
    if (status === AuthStatus.UNAUTHENTICATED) {
      router.replace("/onboarding");
    }
  }, [status])

  return (
    <Provider store={homeStore}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,

            tabBarIcon: ({ color, focused }) => {
              return <TabIcon icon={icons.home} color={color} name="Home" focused={focused} />;
            },
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => {
              return <TabIcon icon={icons.bookmark} color={color} name="Bookmark" focused={focused} />;
            },
          }}
        />
        <Tabs.Screen
          name="createVideo"
          options={{
            title: "Create",
            headerShown: false,

            tabBarIcon: ({ color, focused }) => {
              return <TabIcon icon={icons.plus} color={color} name="Create" focused={focused} />;
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => {
              return <TabIcon icon={icons.profile} color={color} name="Profile" focused={focused} />;
            },
          }}
        />
      </Tabs>
    </Provider>
  );
};

export default TabsLayout;
