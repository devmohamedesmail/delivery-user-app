import { PlaceContext } from '@/context/place-provider'
import React from 'react'


export function usePlace() {
    const context = React.useContext(PlaceContext)
    if (!context) {
        throw new Error('usePlace must be used within a PlaceProvider')
    }
    return context
}