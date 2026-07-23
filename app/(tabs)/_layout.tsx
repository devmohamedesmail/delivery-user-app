import colors from '@/constants/colors';
import useImports from '@/hooks/common/use-import';
import { selectCartTotalItems, useAppSelector } from "@/redux/hooks";
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';

export default function Layout() {
    const totalItems = useAppSelector(selectCartTotalItems);
    const { colorScheme } = useColorScheme();
    const { t, i18n } = useImports();
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.light.tint, 
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: colorScheme === 'dark' ? colors.dark.background : colors.light.background,
                    height: 80,
                    paddingBottom: 10,
                    paddingTop: 10,
                },
                tabBarLabelStyle: {
                    fontFamily: i18n.language === 'ar' ? 'Cairo_400Regular' : 'Poppins_400Regular',
                    fontSize: 9,
                },

            }}>


            <Tabs.Screen name="index" options={{
                title: t('common.home'),
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home-outline" size={size} color={color} />
                ),
            }} />




            <Tabs.Screen
                name="offers/index"
                options={{
                    title: t('common.offers'),
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="gift-outline" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="cart/index"
                options={{
                    title: t('common.cart'),
                    tabBarBadge: totalItems > 0 ? totalItems : undefined,
                    tabBarBadgeStyle: {
                        backgroundColor: colors.light.tint,
                        color: 'white',
                        fontSize: 10,
                        fontWeight: 'bold',
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cart-outline" size={size} color={color} />
                    ),
                }}
            />


            <Tabs.Screen
                name="notifications/index"
                options={{
                    title: t('common.notifications'),
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="notifications-outline" size={size} color={color} />
                    ),
                }}
            />


            <Tabs.Screen
                name="account/index"
                options={{
                    title: t('common.account'),
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                }}
            />






            <Tabs.Screen
                name="stores/index"
                options={{ href: null }}
            />

            <Tabs.Screen
                name="stores/products/index"
                options={{ href: null }}
            />

            <Tabs.Screen
                name="stores/reviews/index"
                options={{ href: null }}
            />

            <Tabs.Screen
                name="search/index"
                options={{ href: null }}
            />

            <Tabs.Screen
                name="checkout/index"
                options={{ href: null }}
            />

            <Tabs.Screen
                name="account/edit-profile"
                options={{ href: null }}
            />
            <Tabs.Screen
                name="account/address"
                options={{ href: null }}
            />

            <Tabs.Screen
                name="stores/product-details/index"
                options={{ href: null }}
            />

            <Tabs.Screen
                name="stores"
                options={{ href: null }}
            />


        </Tabs>
    )
}
