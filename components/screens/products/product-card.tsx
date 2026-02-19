import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert, ScrollView } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";
import Modal from "react-native-modal";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart, clearCart } from "@/store/slices/cartSlice";
import  Toast  from "react-native-toast-message";


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
}

export default function ProductCard({ item, store }: { item: Product; store: any }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartStore = useAppSelector((state) => state.cart.store);
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

  // get quantity in cart
  const getCartQuantity = (productId: number) => {
    const filteredItems = cartItems.filter(
      (cartItem) => cartItem.id === productId.toString()
    );
    return filteredItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  // add to cart function
  const handleAddToCart = (
    product: Product,
    quantity: number = 1,
    attribute?: { name: string; value: string; price: number }
  ) => {
    const basePrice =
      product.on_sale && product.sale_price
        ? product.sale_price
        : product.price;

    // السعر النهائي = سعر المنتج + سعر الصفة المختارة
    const finalPrice = attribute ? basePrice + attribute.price : basePrice;

    // إذا السلة فاضية، أضف مباشرة
    if (cartItems.length === 0) {
      // أضف الكمية المطلوبة
      for (let i = 0; i < quantity; i++) {
        dispatch(
          addToCart({
            product: {
              id: product.id.toString(),
              name: product.name,
              description: product.description,
              price: finalPrice,
              image: product.image,
              store_id: store.id,
              store_name: store.name,
              selectedAttribute: attribute,
            },
            store: store,
          })
        );
      }
      Toast.show({
        type: "success", text1: t("cart.addedToCart")
      });
      toggleModal();
      return;
    }

    // لو المحل مختلف، اسأل المستخدم
    if (cartStore && cartStore.id !== store.id) {
      Alert.alert(
        t("cart.differentStoreTitle"),
        t("cart.differentStoreMessage"),
        [
          { text: t("cart.cancel"), style: "cancel" },
          {
            text: t("cart.clearAndContinue"),
            style: "destructive",
            onPress: () => {
              dispatch(clearCart());
              // أضف الكمية المطلوبة
              for (let i = 0; i < quantity; i++) {
                dispatch(
                  addToCart({
                    product: {
                      id: product.id.toString(),
                      name: product.name,
                      description: product.description,
                      price: finalPrice,
                      image: product.image,
                      store_id: store.id,
                      store_name: store.name,
                      selectedAttribute: attribute,
                    },
                    store,
                  })
                );
              }
              Toast.show({ type: "success", text1: t("cart.addedToCart") });
              toggleModal();
            },
          },
        ]
      );
      return;
    }

    // نفس المحل، أضف عادي
    for (let i = 0; i < quantity; i++) {
      dispatch(
        addToCart({
          product: {
            id: product.id.toString(),
            name: product.name,
            description: product.description,
            price: finalPrice,
            image: product.image,
            store_id: store.id,
            store_name: store.name,
            selectedAttribute: attribute,
          },
          store,
        })
      );
    }

    Toast.show({ type: "success", text1: t("cart.addedToCart") });
    toggleModal();
  };

  // عند الضغط على زر الإضافة
  const handleAddButtonPress = () => {
    // افتح المودال دايماً لاختيار الكمية
    setModalVisible(true);
  };

  const quantity = getCartQuantity(item.id);
  const basePrice =
    item.on_sale && item.sale_price ? item.sale_price : item.price;

  return (
    <View className="w-1/2 mb-5 bg-white rounded-lg overflow-hidden relative">
      {/* product Image */}


      <View className="">
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
      </View>




      <View className="my-2 px-2">
        <Text className="text-black text-center font-semibold mt-2">
          {item.name}
        </Text>

        {/* price */}
        <View className="flex-row justify-center items-center mt-1">
          {item.on_sale && item.sale_price ? (
            <>
              <Text className="text-primary font-bold text-lg">
                {item.sale_price} {t("common.currency")}
              </Text>
              <Text className="text-gray-400 line-through text-sm ml-2">
                {item.price} {t("common.currency")}
              </Text>
            </>
          ) : (
            <Text className="text-primary font-bold text-lg">
              {item.price} {t("common.currency")}
            </Text>
          )}
        </View>

        {/*    Quantity */}
        {quantity > 0 && (
          <View className="flex-row justify-center items-center mt-2">
            <MaterialIcons name="shopping-cart" size={16} color="#22c55e" />
            <Text className="text-green-500 font-semibold text-sm ml-1">
              {quantity} {t("cart.inCart")}
            </Text>
          </View>
        )}
      </View>

      {/* زر الإضافة */}
      <View className="px-2 pb-2">
        <TouchableOpacity
          onPress={handleAddButtonPress}
          className="bg-primary rounded-full"
        >
          <View className="flex flex-row justify-center py-2">
            <MaterialIcons name="add-shopping-cart" size={18} color="white" />
            <Text className="text-white text-sm font-bold ml-1">
              {t("cart.addToCart")}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* مودال اختيار الصفات */}
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View className="bg-white py-5 px-4 rounded-lg max-h-96">
          {/* زر الإغلاق */}
          <View className="flex flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold">{t("cart.selectAttribute")}</Text>
            <TouchableOpacity
              onPress={toggleModal}
              className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full"
            >
              <AntDesign name="close" size={20} color="black" />
            </TouchableOpacity>
          </View>

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
                    <TouchableOpacity
                      key={valueIndex}
                      onPress={() =>
                        setSelectedAttribute({
                          name: attribute.name,
                          value: attrValue.value,
                          price: attrValue.price,
                        })
                      }
                      className={`p-3 rounded-lg mb-2 flex-row justify-between items-center ${isSelected ? "bg-primary" : "bg-gray-100"
                        }`}
                    >
                      <Text
                        className={`font-medium ${isSelected ? "text-white" : "text-black"
                          }`}
                      >
                        {attrValue.value}
                      </Text>
                      <Text
                        className={`font-bold ${isSelected ? "text-white" : "text-primary"
                          }`}
                      >
                         {attrValue.price} {t("common.currency")}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </ScrollView>

          {/* التحكم في الكمية */}
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

          {/* زر التأكيد */}
          <TouchableOpacity
            onPress={() => {
              // لو المنتج له صفات، لازم يختار صفة
              if (item.attributes && item.attributes.length > 0) {
                if (selectedAttribute) {
                  handleAddToCart(item, modalQuantity, selectedAttribute);
                } else {
                  Toast.show({
                    type: "error",
                    text1: t("cart.selectAttributeError"),
                  });
                }
              } else {
                // لو مفيش صفات، أضف عادي
                handleAddToCart(item, modalQuantity);
              }
            }}
            className={`py-3 rounded-full ${(item.attributes && item.attributes.length > 0 && !selectedAttribute) ? "bg-gray-300" : "bg-primary"
              }`}
            disabled={item.attributes && item.attributes.length > 0 && !selectedAttribute}
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
