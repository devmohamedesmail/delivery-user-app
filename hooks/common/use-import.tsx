import { useRouter ,useLocalSearchParams} from 'expo-router'
import { useTranslation } from 'react-i18next'
export default function useImports() {
    const {t,i18n} = useTranslation()
    const router = useRouter()
    return {
        t, i18n,router,useLocalSearchParams
    }
}
