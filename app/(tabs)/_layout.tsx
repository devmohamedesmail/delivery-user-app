import { Tabs } from 'expo-router'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useAppSelector, selectCartTotalItems } from "@/store/hooks";
import colors from '@/constants/colors';
export default function Layout() {
    const totalItems = useAppSelector(selectCartTotalItems);
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="index" options={{
                title: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home-outline" size={size} color={color} />
                ),
            }} />


            <Tabs.Screen
                name="cart/index"
                options={{
                    title: 'Cart',
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
                name="account/index"
                options={{
                    title: 'Account',
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
        </Tabs>
    )
}
