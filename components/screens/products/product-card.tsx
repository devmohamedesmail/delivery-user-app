import React from "react";
import { View } from "react-native";
import { Product } from "@/@types/stores";
import ProductImage from "@/components/ui/product/product-image";
import ProductTitle from "@/components/ui/product/product-title";
import ProductPrice from "@/components/ui/product/product-price";
import ProductAction from "@/components/ui/product/product-action";
import ProductCartQuantity from "@/components/ui/product/product-cart-quantity";

export default function ProductCard({ item, store }: { item: Product; store: any }) {

  
  return (
    <View className="w-1/2 mb-5 bg-white dark:bg-card-dark rounded-lg overflow-hidden relative">
      <ProductImage
        item={item}
        store={store}
        containerClass="w-full"
        imageClass="w-full h-40"
      />
      <ProductTitle item={item} />
      <View className="flex flex-row justify-between items-center px-4 pb-2 ">
        <ProductPrice item={item} />
        <ProductAction item={item} store={store} />
      </View>
      <ProductCartQuantity item={item} />
    </View>
  );
}
