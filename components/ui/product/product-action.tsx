import React, { useState } from 'react'
import { Pressable, View } from 'react-native'
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AddCartModal from '@/components/ui/cart/add-cart-modal';
import { useAddToCart } from '@/hooks/stores/useAddToCart';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ProductAction({ item, store }: { item: any; store: any }) {
    const [isModalVisible, setModalVisible] = useState(false);
    const { handleAddToCart, getCartQuantity } = useAddToCart();
     const [selectedAttribute, setSelectedAttribute] = useState<{
        name: string;
        value: string;
        price: number;
      } | null>(null);

    const handleAddButtonPress = () => {
        setModalVisible(true);
    };


     const [modalQuantity, setModalQuantity] = useState(1);
      const toggleModal = () => {
        setModalVisible(!isModalVisible);
        if (!isModalVisible) {
          setSelectedAttribute(null);
          setModalQuantity(1);
        }
      };
    return (
        <View>
            <Pressable
                onPress={handleAddButtonPress}
                className="bg-primary rounded-full w-10 h-10 flex items-center justify-center"
            >
                <View className="flex flex-row justify-center">
                    <MaterialIcons name="add" size={18} color="white" />
                    {/* <Ionicons name="bag-add" size={24} color="white" /> */}
            
                </View>
            </Pressable>


             <AddCartModal
                    isModalVisible={isModalVisible}
                    toggleModal={toggleModal}
                    item={{ ...item, store }}
                    setSelectedAttribute={setSelectedAttribute}
                    selectedAttribute={selectedAttribute}
                    setModalQuantity={setModalQuantity}
                    modalQuantity={modalQuantity}
                    handleAddToCart={handleAddToCart}
                  />
        </View>
    )
}
