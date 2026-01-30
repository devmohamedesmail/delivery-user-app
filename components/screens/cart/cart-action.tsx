import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch } from '@/store/store';
import { clearCart } from '@/store/slices/cartSlice';
import Modal from 'react-native-modal';
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from '@/constants/colors';


export default function CartAction() {
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toggleModal();
  };

  return (
    <>
      <View
        className="absolute bottom-0 left-0 right-0"
      >
        <View className="flex-row ">
          {/* Clear Cart Button */}
          <TouchableOpacity
            onPress={toggleModal}
            className="flex-1 flex-row items-center justify-center py-4 bg-red-600 dark:bg-red-600"
            
            activeOpacity={0.8}
          >
            <Ionicons name="trash-outline" size={22} color="white" />
            <Text
              className="text-base font-bold ml-2 text-white"
              
            >
              {t("cart.clearCart")}
            </Text>
          </TouchableOpacity>

          {/* Proceed to Checkout Button */}
          <View className="flex-1">
            <TouchableOpacity
              onPress={() => router.push("/checkout")}
              className="flex-1 flex-row items-center justify-center py-4  bg-primary dark:bg-primary-dark"
             
              activeOpacity={0.8}
            >
              <MaterialIcons name="shopping-cart-checkout" size={22} color="white" />
              <Text
                className="text-base font-bold ml-2 text-white"
                
              >
                {t("cart.proceedToCheckout")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Clear Cart Confirmation Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        animationIn="zoomIn"
        animationOut="zoomOut"
        backdropOpacity={0.5}
      >
        <View
          className="p-6 rounded-2xl bg-white dark:bg-card-dark"
          
        >
          {/* Close Button */}
          <View className="flex flex-row justify-end mb-2">
            <TouchableOpacity
              onPress={toggleModal}
              className="w-10 h-10 rounded-full flex justify-center items-center"
              
              activeOpacity={0.8}
            >
              <AntDesign name="close" size={18} color={colors.light.tabIconSelected} />
            </TouchableOpacity>
          </View>

          {/* Icon */}
          <View className="items-center mb-4">
            <View
              className="w-16 h-16 rounded-full items-center justify-center"
              
            >
              <Ionicons name="warning" size={32} color="#dc2626" />
            </View>
          </View>

          {/* Title */}
          <Text
            className="text-center text-2xl font-extrabold mb-3"
            
          >
            {t("cart.clearCart")}
          </Text>

          {/* Description */}
          <Text
            className="text-center text-base mb-6"
            
          >
            {t("cart.areYouSureClearCart")}
          </Text>

          {/* Action Buttons */}
          <View className="flex flex-row gap-3">
            <TouchableOpacity
              className="flex-1 rounded-xl py-4 bg-red-600 dark:bg-red-600"
             
              onPress={toggleModal}
              activeOpacity={0.8}
            >
              <Text
                className="text-center font-bold text-base text-white"
                
              >
                {t("cart.cancel")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 rounded-xl py-4 bg-primary dark:bg-primary-dark"
              
              onPress={handleClearCart}
              activeOpacity={0.8}
            >
              <Text className="text-white text-center font-bold text-base">
                {t("cart.clear_all")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  )
}


