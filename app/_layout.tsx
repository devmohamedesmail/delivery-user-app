import React from 'react'
import { Stack } from 'expo-router'
import '../global.css'
import AppProviders from '@/providers'
import '../i18n/i18n'




export default function RootLayout() {
    return (
        <AppProviders>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)/index" />
            </Stack>
        </AppProviders>
    )
}
