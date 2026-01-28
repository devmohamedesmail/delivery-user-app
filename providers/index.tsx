import AuthProvider from '@/context/auth-provider'
import PlaceProvider from '@/context/place-provider'
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
                        <ReduxProvider>
                            {children}
                            <Toast />
                        </ReduxProvider>
                    </PlaceProvider>
                </AuthProvider>
            </ThemeProvider>
        </GestureHandlerRootView>

    )
}
