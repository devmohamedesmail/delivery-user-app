import AuthProvider from '@/context/auth-provider'
import PlaceProvider from '@/context/place-provider'
import SettingProvider from '@/context/setting-provider'
import { ThemeProvider } from '@/context/theme-provider'
import { ReduxProvider } from '@/store/ReduxProvider'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message';

export default function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider>
                <AuthProvider>
                    <PlaceProvider>
                        <SettingProvider>
                            <ReduxProvider>
                                {children}
                                <Toast />
                            </ReduxProvider>
                        </SettingProvider>
                    </PlaceProvider>
                </AuthProvider>
            </ThemeProvider>
        </GestureHandlerRootView>

    )
}
