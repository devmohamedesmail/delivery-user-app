import { Ionicons } from "@expo/vector-icons"
import Text from "@/components/ui/text"
import useImports from "@/hooks/common/use-import"
import { View } from "react-native"

export default function EmptyState({ searchQuery }: { searchQuery: string }) {
  const { t } = useImports()
  return (
    <View className="flex-1 items-center justify-center py-20 px-8">
      <View className="w-24 h-24 rounded-full bg-orange-50 dark:bg-gray-800 items-center justify-center mb-5">
        <Ionicons name="bag-outline" size={44} color="#fd4a12" />
      </View>
      <Text className="text-xl font-bold text-gray-800 dark:text-white text-center mb-2">
        {searchQuery ? t('products.noResults') : t('products.empty')}
      </Text>
      <Text className="text-sm text-gray-400 dark:text-gray-500 text-center leading-5">
        {searchQuery
          ? t('products.tryDifferent')
          : t('products.emptyDesc')}
      </Text>
    </View>
  )
}