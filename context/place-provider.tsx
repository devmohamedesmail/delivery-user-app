import axios from 'axios'
import React from 'react'
import { config } from '@/constants/config'
import AsyncStorage from '@react-native-async-storage/async-storage';


export interface StoreType {
    id: number
    name: string
}


export interface Place {
    id: number
    name: string
    description: string
    address: string
    latitude: number
    longitude: number
    storeTypes: StoreType[]
}


interface PlaceContextType {
    selectedPlace: Place | null
    setSelectedPlace: React.Dispatch<React.SetStateAction<Place | null>>

    places: Place[]
    setPlaces: React.Dispatch<React.SetStateAction<Place[]>>

    isLoading: boolean
    error: any

    fetchPlaces: () => Promise<void>
}

export const PlaceContext = React.createContext<PlaceContextType | undefined>(undefined)

export default function PlaceProvider({ children }: { children: React.ReactNode }) {
    const [selectedPlace, setSelectedPlace] = React.useState<Place | null>(null)
    const [isStorageLoaded, setIsStorageLoaded] = React.useState<boolean>(false)

    const [places, setPlaces] = React.useState<Place[]>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const [error, setError] = React.useState<any>(null)

    // Load from storage on mount
    React.useEffect(() => {
        const loadSelectedPlace = async () => {
            try {
                const saved = await AsyncStorage.getItem('selectedPlace')
                if (saved) {
                    setSelectedPlace(JSON.parse(saved))
                }
            } catch (error) {
                console.error('Failed to load selected place from storage', error)
            } finally {
                setIsStorageLoaded(true)
            }
        }
        loadSelectedPlace()
    }, [])

    // Save to storage when updated, but only after initial load
    React.useEffect(() => {
        if (!isStorageLoaded) return

        const saveSelectedPlace = async () => {
            try {
                if (selectedPlace) {
                    await AsyncStorage.setItem('selectedPlace', JSON.stringify(selectedPlace))
                } else {
                    await AsyncStorage.removeItem('selectedPlace')
                }
            } catch (error) {
                console.error('Failed to save selected place to storage', error)
            }
        }
        saveSelectedPlace()
    }, [selectedPlace, isStorageLoaded])

    const fetchPlaces = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${config.URL}/places`)
            setPlaces(response.data.data)
        } catch (err) {
            setError(err)
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        fetchPlaces()
    }, [])

    return (
        <PlaceContext.Provider
            value={{
                selectedPlace,
                setSelectedPlace,
                places,
                setPlaces,
                isLoading,
                error,
                fetchPlaces,
            }}
        >
            {children}
        </PlaceContext.Provider>
    )
}



