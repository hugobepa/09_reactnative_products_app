import LogoutIconButton from "@/presentation/auth/components/LogoutIconButton";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { useThemeColor } from "@/presentation/theme/hooks/use-theme-color";
import { Redirect, Stack } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const CheckAutenticationLayout = () => {
  const { status, checkStatus } = useAuthStore();
  const backgroundColor = useThemeColor({}, "background");

  useEffect(() => {
    checkStatus();
  }, []);

  if (status === "checking") {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  if (status === "unauthenticated") {
    //TODO: guardar ruta del usuario
    return <Redirect href="/auth/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        //headerShown: false,
        headerStyle: {
          backgroundColor: backgroundColor,
        },
        contentStyle: {
          backgroundColor: backgroundColor,
        },
      }}
    >
      <Stack.Screen
        name="(home)/index"
        options={{
          title: "Productos",
          headerShadowVisible: false,
          headerLeft: () => <LogoutIconButton />,
        }}
      />
      <Stack.Screen
        name="product/[id]"
        options={{
          title: "Producto",
          headerShadowVisible: false,
          //headerShown: false,
        }}
      />
    </Stack>
  );
};

export default CheckAutenticationLayout;
