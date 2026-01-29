import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView edges={["right", "left"]} className={`flex-1 bg-background dark:bg-background-dark`}>
        {children}
    </SafeAreaView>
  )
}
