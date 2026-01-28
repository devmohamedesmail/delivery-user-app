import React from 'react'
import { View, Text, Modal as RNModal, Alert, Pressable } from 'react-native'

export default function Modal(
    {
        visible,
        onClose,
        children,
        animation = "slide",
        overlayOpacity = 0.4,
    }:any
) {
    return (
        <RNModal
            animationType={animation}
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <View style={{ flex: 1, backgroundColor: `rgba(0,0,0,${overlayOpacity})`, justifyContent: 'flex-end' }}>

                {/* BOTTOM SHEET */}
                <View style={{
                    backgroundColor: 'white',
                    width: '100%',
                    padding: 20,
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    minHeight: 200
                }}>

                    {children}


                </View>
            </View>
        </RNModal>
    )
}
