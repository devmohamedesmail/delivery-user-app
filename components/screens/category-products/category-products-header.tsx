import { View, Pressable, Animated, TextInput } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useColorScheme } from "nativewind"
import { useTranslation } from "react-i18next"
import { useCallback, useRef } from "react"
import Text from "@/components/ui/text"
import { Platform } from "react-native"
import useImports from "@/hooks/common/use-import"

interface CategoryHeaderProps {
  title: string
  productCount: number | null
  viewMode: ViewMode
  onToggleView: () => void
  searchQuery: string
  onSearchChange: (text: string) => void
  onClearSearch: () => void
  searchVisible: boolean
  onToggleSearch: () => void
}
type ViewMode = 'grid' | 'list'
export function CategoryHeader({
  title,
  productCount,
  viewMode,
  onToggleView,
  searchQuery,
  onSearchChange,
  onClearSearch,
  searchVisible,
  onToggleSearch,
}: CategoryHeaderProps) {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const { colorScheme } = useColorScheme()
  const { i18n } = useTranslation()
  const searchInputRef = useRef<TextInput>(null)
  const searchAnim = useRef(new Animated.Value(0)).current
  const { t } = useImports();

  const handleToggleSearch = useCallback(() => {
    onToggleSearch()
    Animated.timing(searchAnim, {
      toValue: searchVisible ? 0 : 1,
      duration: 220,
      useNativeDriver: false,
    }).start(() => {
      if (!searchVisible) searchInputRef.current?.focus()
    })
  }, [searchVisible])

  const searchHeight = searchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 56],
  })

  const iconColor = '#ffffff'
  const isRTL = i18n.language === 'ar'

  return (
    <View
      className="bg-primary dark:bg-gray-900 shadow-lg"
      style={{ paddingTop: insets.top + (Platform.OS === 'ios' ? 0 : 8) }}
    >
      {/* Main row */}
      <View className="flex-row items-center justify-between px-4 pb-4 pt-2">
        {/* Back button */}
        <Pressable
          onPress={() => router.back()}
          className="w-9 h-9 rounded-full bg-white/20 items-center justify-center"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={isRTL ? 'arrow-forward' : 'arrow-back'}
            size={20}
            color={iconColor}
          />
        </Pressable>

        {/* Title + count */}
        <View className="flex-1 mx-3">
          <Text
            className="text-white font-bold text-lg"
            numberOfLines={1}
          >
            {title}
          </Text>
          {productCount !== null && (
            <Text className="text-white/70 text-xs mt-0.5">
              {productCount} {t("products.total",)}
            </Text>
          )}
        </View>

        {/* Right actions */}
        <View className="flex-row items-center gap-x-2">
          {/* Search toggle */}
          <Pressable
            onPress={handleToggleSearch}
            className="w-9 h-9 rounded-full bg-white/20 items-center justify-center"
          >
            <Ionicons
              name={searchVisible ? 'close' : 'search'}
              size={20}
              color={iconColor}
            />
          </Pressable>

          {/* Grid / List toggle */}
          <Pressable
            onPress={onToggleView}
            className="w-9 h-9 rounded-full bg-white/20 items-center justify-center"
          >
            <Ionicons
              name={viewMode === 'grid' ? 'list' : 'grid'}
              size={20}
              color={iconColor}
            />
          </Pressable>
        </View>
      </View>

      {/* Collapsible search bar */}
      <Animated.View style={{ height: searchHeight, overflow: 'hidden' }}>
        <View className="flex-row items-center bg-white/15 mx-4 mb-3 rounded-xl px-3">
          <Ionicons name="search" size={18} color="rgba(255,255,255,0.7)" />
          <TextInput
            ref={searchInputRef}
            value={searchQuery}
            onChangeText={onSearchChange}
            placeholder={t("products.searchPlaceholder")}
            placeholderTextColor="rgba(255,255,255,0.5)"
            className="flex-1 mx-2 text-white text-sm py-3"
            returnKeyType="search"
            cursorColor="#ffffff"
            style={{ color: '#fff' }}
          />
          {!!searchQuery && (
            <Pressable onPress={onClearSearch}>
              <Ionicons name="close-circle" size={18} color="rgba(255,255,255,0.7)" />
            </Pressable>
          )}
        </View>
      </Animated.View>
    </View>
  )
}
