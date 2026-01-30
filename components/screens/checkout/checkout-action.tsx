import React from 'react'
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/button';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function CheckoutAction({ loading, formik }: { loading: boolean, formik: any }) {
  const { t } = useTranslation();
  return (
    <View className="mb-8 px-4">
      <Button
        title={loading ? t("order.placingOrder") : t("order.placeOrder")}
        disabled={formik.isSubmitting}
        loading={formik.isSubmitting}
        onPress={formik.handleSubmit as any}
        icon={<MaterialIcons name="done" size={24} color="white" />}
      />
    </View>
  )
}
