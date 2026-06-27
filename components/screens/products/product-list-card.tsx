import React from "react";
import { View } from "react-native";
import ProductImage from "@/components/ui/product/product-image";
import { Product } from "@/@types/stores";
import ProductTitle from "@/components/ui/product/product-title";
import ProductPrice from "@/components/ui/product/product-price";
import ProductAction from "@/components/ui/product/product-action";
import ProductCartQuantity from "@/components/ui/product/product-cart-quantity";


export default function ProductListCard({ item, store }: { item: Product; store: any }) {

  return (
    <View className="w-full mb-3 bg-white dark:bg-card-dark rounded-lg overflow-hidden flex-row border border-gray-100 dark:border-gray-800">

      <ProductImage
        item={item}
        store={store}
        containerClass="w-1/3"
        imageClass="w-full h-32"
      />

      {/* Product Details */}
      <View className="flex-1 px-3  justify-between  ">

        <ProductTitle item={item} />
        <ProductCartQuantity item={item} />


        <View className="justify-between items-center  flex-row ">
          <ProductPrice item={item} />
          <ProductAction item={item} store={store} />
        </View>
      </View>
    </View>
  );
}
