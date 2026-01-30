import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import Modal from "react-native-modal";
import { useRouter } from "expo-router";



export default function CheckoutSuccessModal({
  successModalVisible,
  setSuccessModalVisible,
}: any) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <View>
      {successModalVisible && (
        <Modal isVisible={successModalVisible} animationIn="zoomIn" animationOut="zoomOut">
          <View className="bg-white p-6 rounded-lg py-10 items-center">
            <Image
              source={require("../../../assets/images/icons/success.png")}
              style={{ width: 100, height: 100, marginBottom: 20 }}
            />
            <Text className="font-bold text-xl">{t("order.orderSuccesscreate")}</Text>
           <View className="flex flex-row mt-10">
             <TouchableOpacity className="bg-green-600 px-10 py-3 w-1/2 mx-2 rounded-lg" onPress={() => setSuccessModalVisible(false)}>
                <Text className="text-white text-center">{t("common.close")}</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-primary px-10 py-3 w-1/2 mx-2 rounded-lg" onPress={() => router.push("/")}>
                <Text className="text-white text-center">{t("navigation.home")}</Text>
            </TouchableOpacity>
           </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
