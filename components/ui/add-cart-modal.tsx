import React from 'react'
import { View, Text, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';
import AddCartModalAction from './add-cart-modal-action';
import QuantityControlSection from './quantity-control-section';
import AddCartModalHeader from './add-cart-modal-header';
import ModalSelectOption from './modal-select-option';

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


    const { t } = useTranslation();
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
                            <Text className="text-lg font-semibold mb-2 dark:text-gray-200">
                                {attribute.name}
                            </Text>
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
