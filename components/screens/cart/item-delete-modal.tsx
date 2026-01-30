import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTranslation } from "react-i18next";

export default function ItemDeleteModal({
  toggleModal,
  isModalVisible,
  selectedItemId,
  delete_item,
  item,
}: any) {
  const { t } = useTranslation();
  return (
    <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} animationIn="zoomIn" animationOut="zoomOut">
      <View className="bg-white dark:bg-card-dark p-4 rounded-lg">
        <View className="flex flex-row justify-end">
          <TouchableOpacity
            onPress={toggleModal}
            className="bg-red-600 w-10 h-10 rounded-full flex justify-center items-center"
          >
            <AntDesign name="close" size={16} color="white" />
          </TouchableOpacity>
        </View>

        <View>
          <Text className="text-center text-3xl font-bold">
            {t("cart.removeItem")}
          </Text>

          <Text className="text-center">
            {t("cart.areYouSureRemove", { itemName: item.name })}
          </Text>
        </View>

        <View className="flex flex-row justify-center px-10 my-5 gap-5">
          <TouchableOpacity
            className="bg-red-600 w-1/2 rounded-lg px-10 py-5"
            onPress={() => delete_item(selectedItemId)}
          >
            <Text className="text-white text-center font-extrabold">{t("common.yes")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-primary w-1/2  rounded-lg px-10 py-5"
            onPress={toggleModal}
          >
            <Text className="text-white text-center font-extrabold">{t("common.no")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
