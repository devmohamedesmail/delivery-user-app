import { config } from '@/constants/config'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from 'expo-router'
import { Plus } from 'lucide-react-native'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { useColorScheme } from 'nativewind'
import { Alert } from 'react-native'
import { addToCart, clearCart } from '@/store/store'
import Modal from "react-native-modal";
import { AntDesign } from '@expo/vector-icons'

interface Attribute {
    id: number;
    name: string;
    values: { id: number; value: string; price: number }[];
}
interface OfferProduct {
    id: number;
    name: string;
    image: string;
    description: string | null;
    price: number;
    on_sale: boolean;
    sale_price: number | null;
    store_id: number;
    category_id: number;
    store: {
        id: number;
        name: string;
        logo: string;
        rating: number;
    };
    attributes?: Attribute[];
    [key: string]: any;
}
interface ProductAttributeValue {
    id: number
    value: string
    price: number
    attribute_id: number
    product_id: number
}

interface ProductAttribute {
    id: number
    name: string
    values: ProductAttributeValue[]
}

interface Product {
    id: number
    name: string
    image: string
    description: string | null
    price: number
    on_sale: boolean
    sale_price: number | null
    store_id: number
    category_id: number
    store: {
        id: number
        name: string
        logo: string
        rating: number
    }
    category: {
        id: number
        name: string
    }
    attributes: ProductAttribute[]
}

export default function ResultCardItem({ item }: { item: Product }) {
    const { t, i18n } = useTranslation()
    const router = useRouter()

    const handleProductPress = (product: Product) => {
        // router.push({
        //     pathname: '/(tabs)/stores/[id]',
        //     params: { id: product.store.id }
        // })
    }



        const dispatch = useAppDispatch();
        const cartItems = useAppSelector((state) => state.cart.items);
        const cartStore = useAppSelector((state) => state.cart.store);
        const [isModalVisible, setModalVisible] = useState(false);
        const [selectedAttribute, setSelectedAttribute] = useState<{
            name: string;
            value: string;
            price: number;
        } | null>(null);
    
        const [modalQuantity, setModalQuantity] = useState(1);
        const { colorScheme } = useColorScheme();
        const isDark = colorScheme === "dark";
    
        const toggleModal = () => {
            setModalVisible(!isModalVisible);
            if (!isModalVisible) {
                setSelectedAttribute(null);
                setModalQuantity(1);
            }
        };
    
        const getCartQuantity = (productId: number) => {
            const filteredItems = cartItems.filter(
                (cartItem) => cartItem.id === productId.toString()
            );
            return filteredItems.reduce((sum, item) => sum + item.quantity, 0);
        };
    
        const calculateDiscount = () => {
            if (item.on_sale && item.sale_price && item.price > 0) {
                const discount = ((item.price - item.sale_price) / item.price) * 100;
                return Math.round(discount);
            }
            return 0;
        };
    
        const handleAddToCart = (
            product: OfferProduct,
            quantity: number = 1,
            attribute?: { name: string; value: string; price: number }
        ) => {
            const basePrice =
                product.on_sale && product.sale_price
                    ? product.sale_price
                    : product.price;
    
            const finalPrice = attribute ? basePrice + attribute.price : basePrice;
    
            const store = product.store;
    
            if (cartItems.length === 0) {
                for (let i = 0; i < quantity; i++) {
                    dispatch(
                        addToCart({
                            product: {
                                id: product.id.toString(),
                                name: product.name,
                                description: product.description || "",
                                price: finalPrice,
                                image: product.image,
                                store_id: store.id,
                                store_name: store.name,
                                selectedAttribute: attribute,
                            },
                            store: store,
                        })
                    );
                }
                Toast.show({
                    type: "success", text1: t("cart.addedToCart")
                });
                toggleModal();
                return;
            }
    
            if (cartStore && cartStore.id !== store.id) {
                Alert.alert(
                    t("cart.differentStoreTitle"),
                    t("cart.differentStoreMessage"),
                    [
                        { text: t("cart.cancel"), style: "cancel" },
                        {
                            text: t("cart.clearAndContinue"),
                            style: "destructive",
                            onPress: () => {
                                dispatch(clearCart());
                                for (let i = 0; i < quantity; i++) {
                                    dispatch(
                                        addToCart({
                                            product: {
                                                id: product.id.toString(),
                                                name: product.name,
                                                description: product.description || "",
                                                price: finalPrice,
                                                image: product.image,
                                                store_id: store.id,
                                                store_name: store.name,
                                                selectedAttribute: attribute,
                                            },
                                            store,
                                        })
                                    );
                                }
                                Toast.show({ type: "success", text1: t("cart.addedToCart") });
                                toggleModal();
                            },
                        },
                    ]
                );
                return;
            }
    
            for (let i = 0; i < quantity; i++) {
                dispatch(
                    addToCart({
                        product: {
                            id: product.id.toString(),
                            name: product.name,
                            description: product.description || "",
                            price: finalPrice,
                            image: product.image,
                            store_id: store.id,
                            store_name: store.name,
                            selectedAttribute: attribute,
                        },
                        store,
                    })
                );
            }
    
            Toast.show({ type: "success", text1: t("cart.addedToCart") });
            toggleModal();
        };
    
        const handleAddButtonPress = () => {
            setModalVisible(true);
        };
    
        const quantity = getCartQuantity(item.id);
        const discountPercentage = calculateDiscount();
    
    const getPriceDisplay = () => {
        const hasSizes = item.attributes && item.attributes.length > 0 && item.attributes[0].values.length > 0;

        let displayPrice = item.price;
        let originalPrice = null;

        if (hasSizes) {
            // Find loading price from sizes if main price is 0 or needs to be calculated
            // Typically "starting from" logic. Let's use the smallest size price as base if main price is just a placeholder
            // But usually API gives a base price.
            // If we want "Starting from", we can check if there are multiple prices.
        }

        if (item.on_sale && item.sale_price) {
            displayPrice = item.sale_price;
            originalPrice = item.price;
        }

        return (
            <View className="flex-row items-center flex-wrap">
                {hasSizes && (
                    <Text className="text-xs text-gray-500 dark:text-gray-400 mr-1">
                        {t('common.starts_from') || 'يبدأ من'}
                    </Text>
                )}
                <Text className="text-base font-bold text-primary dark:text-primary-dark">
                    {displayPrice} {config.CurrencySymbol}
                </Text>
                {originalPrice && (
                    <Text className="text-xs text-gray-400 line-through ml-2">
                        {originalPrice} {config.CurrencySymbol}
                    </Text>
                )}
            </View>
        );
    };

    return (
        <>
        <TouchableOpacity
            onPress={() => handleProductPress(item)}
            className="bg-card dark:bg-card-dark rounded-xl mb-4 overflow-hidden shadow-sm border border-border dark:border-border-dark flex-row"
            style={{ elevation: 2 }}
        >
            {/* Product Image */}
            <View className="relative w-28 h-28 bg-gray-100 dark:bg-gray-800">
                <Image
                    source={{ uri: item.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                />
                {item.on_sale && (
                    <View className="absolute top-2 left-2 bg-red-500 px-1.5 py-0.5 rounded">
                        <Text className="text-[10px] text-white font-bold">
                            {t('sale') || 'SALE'}
                        </Text>
                    </View>
                )}
            </View>

            {/* Content */}
            <View className="flex-1 p-3 justify-between">
                <View>
                    <View className="flex-row items-start justify-between">
                        <Text className="text-base font-semibold text-text dark:text-text-dark mb-1 flex-1 mr-2" numberOfLines={1}>
                            {item.name}
                        </Text>
                    </View>

                    {/* Store Info */}
                    <View className="flex-row items-center mb-2">
                        {item.store.logo ? (
                            <Image
                                source={{ uri: item.store.logo }}
                                className="w-4 h-4 rounded-full mr-1.5"
                                resizeMode="cover"
                            />
                        ) : null}
                        <Text className="text-xs text-gray-500 dark:text-gray-400" numberOfLines={1}>
                            {item.store.name}
                        </Text>
                    </View>
                </View>

                {/* Price and Add Button */}
                <View className="flex-row items-center justify-between mt-1">
                    {getPriceDisplay()}

                    <TouchableOpacity 
                    onPress={handleAddButtonPress}
                    
                    className='bg-primary/10 dark:bg-primary-dark/20 p-2 rounded-full active:bg-primary/20'>
                        <Plus color="#fd4a12" size={18} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>

          <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                useNativeDriver
                hideModalContentWhileAnimating
            >
                <View className="bg-white dark:bg-zinc-900 py-5 px-4 rounded-xl max-h-[80%]">
                    <View className="flex flex-row justify-between items-center mb-4">
                        <Text className="text-xl font-bold dark:text-white">{t("cart.selectAttribute")}</Text>
                        <TouchableOpacity
                            onPress={toggleModal}
                            className="bg-gray-100 dark:bg-zinc-800 p-2 rounded-full"
                        >
                            <AntDesign name="close" size={20} color={isDark ? "white" : "black"} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView className="mb-4" showsVerticalScrollIndicator={false}>
                        {item.attributes?.map((attribute, attrIndex) => (
                            <View key={attrIndex} className="mb-4">
                                <Text className="text-lg font-semibold mb-2 dark:text-gray-200">
                                    {attribute.name}
                                </Text>
                                {attribute.values.map((attrValue, valueIndex) => {
                                    const isSelected = selectedAttribute?.value === attrValue.value;
                                    return (
                                        <TouchableOpacity
                                            key={valueIndex}
                                            onPress={() =>
                                                setSelectedAttribute({
                                                    name: attribute.name,
                                                    value: attrValue.value,
                                                    price: attrValue.price,
                                                })
                                            }
                                            className={`p-3 rounded-lg mb-2 flex-row justify-between items-center border ${isSelected
                                                    ? "bg-primary border-primary"
                                                    : "bg-gray-50 dark:bg-zinc-800 border-gray-100 dark:border-zinc-700"
                                                }`}
                                        >
                                            <Text className={`font-medium ${isSelected ? "text-white" : "text-black dark:text-gray-200"}`}>
                                                {attrValue.value}
                                            </Text>
                                            <Text className={`font-bold ${isSelected ? "text-white" : "text-primary dark:text-orange-400"}`}>
                                                {attrValue.price} {t("common.currency")}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        ))}
                    </ScrollView>

                    <View className="flex-row items-center justify-center mb-6 bg-gray-50 dark:bg-zinc-800 rounded-full p-2">
                        <TouchableOpacity
                            onPress={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                            className="bg-white dark:bg-zinc-700 w-10 h-10 rounded-full items-center justify-center shadow-sm"
                        >
                            <Text className="text-primary dark:text-orange-400 text-2xl font-bold">-</Text>
                        </TouchableOpacity>
                        <Text className="text-xl font-bold mx-6 dark:text-white">{modalQuantity}</Text>
                        <TouchableOpacity
                            onPress={() => setModalQuantity(modalQuantity + 1)}
                            className="bg-primary w-10 h-10 rounded-full items-center justify-center shadow-sm"
                        >
                            <Text className="text-white text-2xl font-bold">+</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            if (item.attributes && item.attributes.length > 0) {
                                if (selectedAttribute) {
                                    handleAddToCart(item, modalQuantity, selectedAttribute);
                                } else {
                                    Toast.show({
                                        type: "error",
                                        text1: t("cart.selectAttributeError"),
                                    });
                                }
                            } else {

                                handleAddToCart(item, modalQuantity);
                            }
                        }}
                        className={`py-3 rounded-full ${(item.attributes && item.attributes.length > 0 && !selectedAttribute)
                                ? "bg-gray-300 dark:bg-zinc-700"
                                : "bg-primary"
                            }`}
                        disabled={!!(item.attributes && item.attributes.length > 0 && !selectedAttribute)}
                    >
                        <Text className="text-white text-center font-bold text-lg">
                            {t("cart.confirmAdd")}
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
    )
}
