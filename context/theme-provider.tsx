import { ReactNode, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useColorScheme } from "nativewind"

const THEME_KEY = "APP_THEME"

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { colorScheme, setColorScheme } = useColorScheme()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    async function loadTheme() {
      const savedTheme = await AsyncStorage.getItem(THEME_KEY)

      if (savedTheme === "light" || savedTheme === "dark") {
        setColorScheme(savedTheme)
      }

      setReady(true)
    }

    loadTheme()
  }, [])

  useEffect(() => {
    if (!colorScheme) return
    AsyncStorage.setItem(THEME_KEY, colorScheme)
  }, [colorScheme])

  if (!ready) return null // أو Splash Screen

  return children
}
