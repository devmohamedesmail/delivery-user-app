import React from 'react'
import { View, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';
import AddCartModalAction from '@/components/ui/cart/add-cart-modal-action';
import QuantityControlSection from '@/components/ui/cart/quantity-control-section';
import AddCartModalHeader from '@/components/ui/cart/add-cart-modal-header';
import ModalSelectOption from '@/components/ui/cart/modal-select-option';
import Text from '@/components/ui/text';

export default function AddCartModal({
    isModalVisible,
    toggleModal,
    item,
    setSelectedAttribute,
    selectedAttribute,
    setModalQuantity,
    modalQuantity,
    handleAddToCart
}: any) {


    return (
        <Modal
            animationIn="zoomIn"
            animationOut="zoomOut"
            animationInTiming={500}
            animationOutTiming={500}
            isVisible={isModalVisible}
            onBackdropPress={toggleModal}
            useNativeDriver
            hideModalContentWhileAnimating
        >
            <View className="bg-white dark:bg-zinc-900 py-5 px-4 rounded-xl max-h-[80%]">
                <AddCartModalHeader
                    toggleModal={toggleModal}
                />

                <ScrollView className="mb-4" showsVerticalScrollIndicator={false}>
                    {item.attributes?.map((attribute: any, attrIndex: number) => (
                        <View key={attrIndex} className="mb-4">
                            <Text className="text-lg  mb-2 dark:text-gray-200">
                                {attribute.name}
                            </Text>
                           <View className='flex flex-row gap-5'>
                             {attribute.values.map((attrValue: any, valueIndex: number) => {
                                const isSelected = selectedAttribute?.value === attrValue.value;
                                return (
                                    <ModalSelectOption
                                        key={valueIndex}
                                        attrValue={attrValue}
                                        attribute={attribute}
                                        valueIndex={valueIndex}
                                        setSelectedAttribute={setSelectedAttribute}
                                        isSelected={isSelected}
                                    />
                                );
                            })}
                           </View>
                        </View>
                    ))}
                </ScrollView>


                <QuantityControlSection
                    modalQuantity={modalQuantity}
                    setModalQuantity={setModalQuantity}
                />

                <AddCartModalAction
                    item={item}
                    selectedAttribute={selectedAttribute}
                    handleAddToCart={handleAddToCart}
                    modalQuantity={modalQuantity}
                    toggleModal={toggleModal} />
            </View>
        </Modal>
    )
}
