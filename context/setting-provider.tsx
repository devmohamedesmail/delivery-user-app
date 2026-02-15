import { Setting, SettingContextType } from '@/@types'
import { config } from '@/constants/config'
import axios from 'axios'
import React, { useEffect, useState } from 'react'


export const SettingContext = React.createContext<SettingContextType | null>(null)

export default function SettingProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<Setting | null>(null)

    const getSettings = async () => {
        const response = await axios.get(`${config.URL}/settings`)
        const data = response.data.data
        setSettings(data)
    }

    useEffect(() => {
        getSettings()
    }, [])
    return (
        <SettingContext.Provider value={{ settings, getSettings }}>
            {children}
        </SettingContext.Provider>
    )
}
