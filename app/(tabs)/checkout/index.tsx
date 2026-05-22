import Layout from '@/components/ui/layout'
import React from 'react'
import { ScrollView, View} from 'react-native';
import CheckoutSummery from '@/components/screens/checkout/checkout-summery';
import CheckoutAction from '@/components/screens/checkout/checkout-action';
import CheckoutSuccessModal from '@/components/screens/checkout/checkout-success-modal';
import useCreateOrder from '@/hooks/checkout/useCreateOrder';
import useCreateGroupOrder from '@/hooks/checkout/useCreateGroupOrder';
import CheckoutHeader from '@/components/screens/checkout/checkout-header';
import CheckoutPriceNote from '@/components/screens/checkout/checkout-price-note';
import CheckoutAreaPaper from '@/components/screens/checkout/checkout-area-paper';
import CheckoutUserInfo from '@/components/screens/checkout/checkout-user-info';


export default function Checkout() {
  const {
    t,
    bottomSheetRef,
    formik,
    selectedArea,
    loading,
    successModalVisible,
    setSuccessModalVisible,
    searchQuery,
    setSearchQuery,
    filteredAreas,
    setSelectedArea,
    setModalVisible,
    storeCount

  } = useCreateGroupOrder()
  // useCreateGroupOrder()
  return (
    <>
      <Layout>
        <CheckoutHeader />

        <ScrollView>
          <View className='p-4 bg-white dark:bg-card-dark'>


            <CheckoutUserInfo
              formik={formik}
              bottomSheetRef={bottomSheetRef}
            />

          </View>
          <CheckoutPriceNote />
          <CheckoutSummery 
            selectedArea={selectedArea} 
            storeCount={storeCount} 
            />
          <CheckoutAction 
            loading={loading} 
            formik={formik} />
        </ScrollView>
        <CheckoutSuccessModal
          successModalVisible={successModalVisible}
          setSuccessModalVisible={setSuccessModalVisible}
        />
      </Layout>


      <CheckoutAreaPaper
        bottomSheetRef={bottomSheetRef}
        formik={formik}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredAreas={filteredAreas}
        setSelectedArea={setSelectedArea}
      />
    </>

  )
}
