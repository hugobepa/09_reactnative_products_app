0. crear comp " presentation\products\components\ProductImages.tsx":

```
import { View, Text, Image, FlatList } from 'react-native';

interface Props {
  images: string[];
}

const ProductImages = ({ images }: Props) => {
  if (images.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}
      >
        <Image
          source={require('../../../assets/images/no-product-image.png')}
          style={{ width: 300, height: 300 }}
        />
      </View>
    );
  }

  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Image
          source={{ uri: item }}
          style={{
            width: 300,
            height: 300,
            marginHorizontal: 7,
            borderRadius: 5,
          }}
        />
      )}
    />
  );
};
export default ProductImages;
```

2. poner componente "app\(products-app)\product\[id].tsx":

```
import ProductImages from "@/presentation/products/components/ProductImages";
import { useProduct } from "@/presentation/products/hooks/useProduct";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

const ProductScreen = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { productQuery } = useProduct(`${id}`);


  const product = productQuery.data!;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView>
        {/**TODO: Product image*/}
        <ProductImages images={product.images} />
```
