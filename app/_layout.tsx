import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import '../global.css'
import AppProviders from '@/providers'
import '../i18n/i18n'
import IntroModal from '@/components/ui/intro-modal'
import Splash from '@/components/ui/splash'




export default function RootLayout() {
    const [showSplash, setShowSplash] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false)
        }, 3000) // 1 second

        return () => clearTimeout(timer)
    }, [])

    if (showSplash) {
        return <Splash />
    }
    return (
        <AppProviders>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)/index" />
            </Stack>
            {/* <IntroModal /> */}
        </AppProviders>
    )
}
