import CartAction from '@/components/screens/cart/cart-action'
import CartItem from '@/components/screens/cart/cart-item'
import CartSummary from '@/components/screens/cart/cart-summery'
import EmptyCart from '@/components/screens/cart/empty-cart'
import Header from '@/components/ui/header'
import Layout from '@/components/ui/layout'
import { selectCart, selectCartItems, useAppSelector } from '@/store/hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, ScrollView } from 'react-native'

export default function Cart() {
  const { t } = useTranslation();
  const cartItems = useAppSelector(selectCartItems);
  const cart = useAppSelector(selectCart);
  return (
    <Layout>
      <Header title={t('navigation.cart')} />

      {cartItems.length === 0 ? <EmptyCart /> : (<>
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View className="px-4 py-4 flex flex-row flex-wrap gap-4">
            {cart.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </View>

          <CartSummary />


          {/* Extra spacing for fixed bottom buttons */}
          <View className="h-8" />
        </ScrollView>
        <CartAction />


      </>)}
    </Layout>
  )
}
