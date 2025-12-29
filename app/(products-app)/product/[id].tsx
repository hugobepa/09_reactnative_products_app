import ProductImages from "@/presentation/products/components/ProductImages";
import { useProduct } from "@/presentation/products/hooks/useProduct";
import { ThemedView } from "@/presentation/theme/components/themed-view";
import ThemedActivityIndicator from "@/presentation/theme/components/ThemedActivityIndicator";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

const ProductScreen = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { productQuery } = useProduct(`${id}`);

  useEffect(() => {
    //TODO: nombre de producto
    navigation.setOptions({
      headerRight: () => <Ionicons name="camera-outline" size={25} />,
    });
  }, []);

  useEffect(() => {
    if (productQuery.data) {
      navigation.setOptions({
        title: productQuery.data.title,
      });
    }
  }, [productQuery.data]);

  if (productQuery.isLoading) {
    return <ThemedActivityIndicator />;
  }

  if (!productQuery.data) {
    return <Redirect href="/(products-app)/(home)" />;
  }

  const product = productQuery.data!;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView>
        {/**TODO: Product image*/}
        <ProductImages images={product.images} />

        <ThemedView style={{ marginHorizontal: 10, marginTop: 20 }}>
          <ThemedTextInput placeholder="Titulo" style={{ marginVertical: 5 }} />
          <ThemedTextInput placeholder="Slug" style={{ marginVertical: 5 }} />
          <ThemedTextInput
            placeholder="Descripcion"
            multiline
            numberOfLines={5}
            style={{ marginVertical: 5 }}
          />
        </ThemedView>

        <ThemedView
          style={{
            marginHorizontal: 10,
            marginVertical: 5,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <ThemedTextInput placeholder="Precio" style={{ flex: 1 }} />
          <ThemedTextInput placeholder="Inventario" style={{ flex: 1 }} />
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProductScreen;
