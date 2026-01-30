import Header from '@/components/ui/header'
import Layout from '@/components/ui/layout'
import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { selectCartItems, selectCartTotalPrice, useAppSelector } from '@/store/hooks';
import useFetch from '@/hooks/useFetch';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import { usePlace } from '@/hooks/usePlace';
import { config } from '@/constants/config';
import BottomPaper from '@/components/ui/bottom-paper';
import BottomSheet from '@gorhom/bottom-sheet';
import colors from '@/constants/colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import NoAreaFound from '@/components/screens/checkout/no-area-found';

import Input from '@/components/ui/input';
import CheckoutSummery from '@/components/screens/checkout/checkout-summery';
import CheckoutAction from '@/components/screens/checkout/checkout-action';
import CheckoutSuccessModal from '@/components/screens/checkout/checkout-success-modal';

export default function Checkout() {
  const { t } = useTranslation();
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);
  const { auth } = useAuth();
  const { selectedPlace } = usePlace()
  const cart = useAppSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { data: areas } = useFetch(`/areas/place/${selectedPlace?.id}`);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState<any>(null);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const filteredAreas = areas?.filter((area: any) =>
    area.name.toLowerCase().includes(searchQuery.toLowerCase())
  );




  const formik = useFormik({
    initialValues: {
      phone: "",
      address: "",
    },

    validationSchema: Yup.object({
      phone: Yup.string()
        .required(t("order.phoneRequired"))
        .min(6, t("order.phoneMin")),
      address: Yup.string()
        .required(t("order.addressRequired"))
        .min(6, t("order.addressMin")),
    }),

    onSubmit: async (values) => {
      try {
        setLoading(true);
        if (cartItems.length === 0) {
          Toast.show({
            type: "error",
            text1: "Your cart is empty",
            position: "bottom",
          });
          return;
        }

        const response = await axios.post(`${config.URL}/orders/create`, {
          user_id: auth?.user?.id || 0,
          store_id: cart.store.id,
          order: cartItems.map((item) => ({
            id: parseInt(item.id),
            name: item.name,
            quantity: item.quantity,
            price: item.selectedAttribute ? item.selectedAttribute.price : item.price,
          })),
          total_price: Number(cart.store.delivery_fee) + Number(totalPrice.toFixed(2)),
          delivery_address: values.address,
          phone: values.phone,
        });

        setLoading(false);
        setSuccessModalVisible(true);
      } catch (error) {
        setLoading(false);
        Toast.show({
          type: "error",
          text1: t("order.orderErrorcreate"),
          position: "top",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Layout>
        <Header title={t('checkout.title')} />
        <ScrollView>
          <View className='p-4 bg-white dark:bg-card-dark'>
            <Input
              label={t("order.phoneNumber")}
              placeholder={t("order.enterPhoneNumber")}
              value={formik.values.phone}
              onChangeText={formik.handleChange("phone")}
              error={
                formik.touched.phone && formik.errors.phone
                  ? formik.errors.phone
                  : undefined
              }
            />

            <TouchableOpacity
              onPress={() => bottomSheetRef.current?.expand()}
              className="bg-primary rounded-xl p-4 mt-2 flex-row items-center justify-between shadow-lg active:opacity-80"
            >
              <View className="flex-row items-center flex-1">
                <AntDesign name="environment" size={20} color="white" />
                <Text className="text-white font-semibold text-base ml-3">
                  {formik.values.address || t("order.selectyourArea")}
                </Text>
              </View>
              <AntDesign name="down" size={16} color="white" />
            </TouchableOpacity>




          </View>
          <CheckoutSummery selectedArea={selectedArea} />
          <CheckoutAction loading={loading} formik={formik} />
        </ScrollView>
        <CheckoutSuccessModal
          successModalVisible={successModalVisible}
          setSuccessModalVisible={setSuccessModalVisible}
        />
      </Layout>



      <BottomPaper ref={bottomSheetRef} snapPoints={['50%']}>
        <View
          className="bg-white rounded-t-3xl w-full"

        >
          {/* Modal Header */}
          <View className="border-b border-gray-100 px-6 pt-5 pb-4">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-xl font-bold text-gray-800">
                {t("order.selectyourArea")}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-gray-100 w-9 h-9 rounded-full flex items-center justify-center active:bg-gray-200"
              >
                <AntDesign name="close" size={16} color="#374151" />
              </TouchableOpacity>
            </View>
            <View className="w-12 h-1 bg-gray-300 rounded-full self-center mt-1" />
          </View>

          {/* Search Input */}
          <View className="px-6 pt-4">
            <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200">
              <AntDesign name="search" size={18} color={colors.light.tabIconSelected} />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder={t("order.searchArea")}
                placeholderTextColor="#9CA3AF"
                className="flex-1 ml-3 text-base text-gray-800"
              />
              {searchQuery ? (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <AntDesign name="check-circle" size={16} color="#9CA3AF" />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>

          {/* Areas List */}
          <ScrollView
            className="px-6 py-2"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {filteredAreas && filteredAreas.length > 0 ? (
              filteredAreas.map((area: any, index: number) => (
                <TouchableOpacity
                  onPress={() => {
                    formik.setFieldValue("address", area.name);
                    setSelectedArea(area);
                    setModalVisible(false);
                  }}
                  key={area.id}
                  className={`py-4 px-4 flex-row items-center justify-between rounded-xl active:bg-gray-50 ${index !== filteredAreas.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  style={{
                    backgroundColor: formik.values.address === area.name ? '#F3F4F6' : 'transparent',
                  }}
                >
                  <View className="flex-row items-center flex-1">
                    <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-3">
                      <AntDesign name="environment" size={18} color="#6B7280" />
                    </View>
                    <View className='flex flex-row justify-between flex-1'>
                      <Text className={`text-base ${formik.values.address === area.name
                        ? 'font-semibold text-primary'
                        : 'font-medium text-gray-700'
                        }`}>
                        {area.name}
                      </Text>
                      <Text className='mx-2'>{area.price}</Text>
                    </View>
                  </View>
                  {formik.values.address === area.name && (
                    <AntDesign name="check-circle" size={20} color="#10B981" />
                  )}
                </TouchableOpacity>
              ))
            ) : (
              <NoAreaFound />
            )}
          </ScrollView>
        </View>
      </BottomPaper>
    </>

  )
}
