import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert, ScrollView, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";
import Modal from "react-native-modal";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart, clearCart } from "@/store/slices/cartSlice";
import Toast from "react-native-toast-message";
import AddCartModal from "@/components/ui/add-cart-modal";
import { useAddToCart } from "@/hooks/useAddToCart";
import QuantityControlSection from "@/components/ui/quantity-control-section";
import AddCartModalHeader from "@/components/ui/add-cart-modal-header";
import ModalSelectOption from "@/components/ui/modal-select-option";


interface Attribute {
  name: string;
  values: { value: string; price: number }[];
}

interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  on_sale: boolean;
  sale_price: number | null;
  stock: number;
  business_id: number;
  category_id: number;
  attributes?: Attribute[];
  product_type: string;
}

export default function ProductCard({ item, store }: { item: Product; store: any }) {
  const { t } = useTranslation();
  const { handleAddToCart, getCartQuantity } = useAddToCart();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState<{
    name: string;
    value: string;
    price: number;
  } | null>(null);

  const [modalQuantity, setModalQuantity] = useState(1);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    if (!isModalVisible) {
      setSelectedAttribute(null);
      setModalQuantity(1);
    }
  };


  const handleAddButtonPress = () => {
    setModalVisible(true);
  };

  const quantity = getCartQuantity(item.id);
  const basePrice = item.on_sale && item.sale_price ? item.sale_price : item.price;


  const getPriceRange = (item: Product) => {
    if (!item.attributes) return null;

    let prices: number[] = [];

    item.attributes.forEach(attr => {
      attr.values.forEach(v => {
        if (v.price) prices.push(v.price);
      });
    });

    if (!prices.length) return null;

    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return { min, max };
  };

  const priceRange = getPriceRange(item);

  return (
    <View className="w-1/2 mb-5 bg-white dark:bg-card-dark rounded-lg overflow-hidden relative">
      {/* product Image */}
      <View className="relative">
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            className="w-full h-40 object-cover"
            resizeMode="cover"
          />
        ) : (
          <View className="bg-gray-200 h-44 items-center justify-center">
            <Text className="text-gray-600 text-xl text-center mt-1">
              {store.name}
            </Text>
          </View>
        )}
        {quantity > 0 && (
          <View className="flex-row mt-2 absolute top-2 right-2 bg-green-600   rounded-full w-8 h-8 flex items-center justify-center">
            <MaterialIcons name="shopping-cart" size={14} color="white" />
            <Text className="text-white font-semibold text-xs">
              {quantity}
              {/* {t("cart.inCart")} */}
            </Text>
          </View>
        )}
      </View>




      <View className="my-2 px-2">
        <Text className="text-black dark:text-white text-center font-semibold mt-2">
          {item.name}
        </Text>
      </View>




      <View className="flex flex-row justify-between items-center px-4 pb-2">
        <View className="flex-row justify-center items-center mt-1">



          {item.product_type === "simple" ? (
            <>
              {item.on_sale && item.sale_price ? (
                <>
                  <Text className="text-primary font-bold text-md">
                    {item.sale_price} {t("common.currency")}
                  </Text>
                  <Text className="text-gray-400 line-through text-xs ml-2">
                    {item.price} {t("common.currency")}
                  </Text>
                </>
              ) : (
                <Text className="text-primary font-bold text-sm">
                  {item.price} {t("common.currency")}
                </Text>
              )}


            </>) : (<Text>
              <Text className="text-primary font-bold text-sm">
                {priceRange?.min} - {priceRange?.max} {t("common.currency")}
              </Text>
            </Text>)}







          {/* {item.on_sale && item.sale_price ? (
            <>
              <Text className="text-primary font-bold text-md">
                {item.sale_price} {t("common.currency")}
              </Text>
              <Text className="text-gray-400 line-through text-xs ml-2">
                {item.price} {t("common.currency")}
              </Text>
            </>
          ) : (
            <Text className="text-primary font-bold text-sm">
              {item.price} {t("common.currency")}
            </Text>
          )} */}
        </View>
        <Pressable
          onPress={handleAddButtonPress}
          className="bg-primary rounded-full w-10 h-10 flex items-center justify-center"
        >
          <View className="flex flex-row justify-center">
            <MaterialIcons name="add" size={18} color="white" />
            {/* <Text className="text-white text-sm font-bold ml-1">
              {t("cart.addToCart")}
            </Text> */}
          </View>
        </Pressable>
      </View>










      <Modal
        animationIn="zoomIn"
        animationOut="zoomOut"
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
      >
        <View className="bg-white py-5 px-4 rounded-lg max-h-96">
          <AddCartModalHeader
            toggleModal={toggleModal}
          />

          {/* قائمة الصفات */}
          <ScrollView className="mb-4">
            {item.attributes?.map((attribute, attrIndex) => (
              <View key={attrIndex} className="mb-4">
                <Text className="text-lg font-semibold mb-2">
                  {attribute.name}
                </Text>
                {attribute.values.map((attrValue, valueIndex) => {
                  const isSelected =
                    selectedAttribute?.value === attrValue.value;
                  return (
                    <ModalSelectOption
                      key={valueIndex}
                      attrValue={attrValue}
                      attribute={attribute}
                      valueIndex={valueIndex}
                      setSelectedAttribute={setSelectedAttribute}
                      isSelected={isSelected}
                    />
                  );
                })}
              </View>
            ))}
          </ScrollView>



          {/* <QuantityControlSection
            modalQuantity={modalQuantity}
            onQuantityChange={setModalQuantity}
          /> */}

 <View className="flex-row items-center justify-center mb-4 bg-gray-100 rounded-full p-2">
            <TouchableOpacity
              onPress={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
              className="bg-white w-10 h-10 rounded-full items-center justify-center"
            >
              <Text className="text-primary text-2xl font-bold">-</Text>
            </TouchableOpacity>
            <Text className="text-xl font-bold mx-6">{modalQuantity}</Text>
            <TouchableOpacity
              onPress={() => setModalQuantity(modalQuantity + 1)}
              className="bg-primary w-10 h-10 rounded-full items-center justify-center"
            >
              <Text className="text-white text-2xl font-bold">+</Text>
            </TouchableOpacity>
          </View>
          {/* Action Button */}

          <TouchableOpacity
            onPress={() => {
              handleAddToCart(
                {
                  ...item,
                  store,
                },
                modalQuantity,
                selectedAttribute || undefined
              );

              toggleModal();
            }}
            className={`py-3 rounded-full ${item.attributes && item.attributes.length > 0 && !selectedAttribute
              ? "bg-gray-300"
              : "bg-primary"
              }`}
            disabled={
              item.attributes &&
              item.attributes.length > 0 &&
              !selectedAttribute
            }
          >
            <Text className="text-white text-center font-bold">
              {t("cart.confirmAdd")}
            </Text>
          </TouchableOpacity>

        </View>
      </Modal>
    </View>
  );
}
