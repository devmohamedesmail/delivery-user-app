import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart, clearCart } from "@/store/slices/cartSlice";
import { useTranslation } from "react-i18next";

interface AddToCartAttribute {
    name: string;
    value: string;
    price: number;
}

export const useAddToCart = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const cartItems = useAppSelector((state) => state.cart.items);
    const cartStore = useAppSelector((state) => state.cart.store);

    const getCartQuantity = (productId: number) => {
        const filteredItems = cartItems.filter(
            (cartItem) => cartItem.id === productId.toString()
        );

        return filteredItems.reduce((sum, item) => sum + item.quantity, 0);
    };

    const handleAddToCart = (
        product: any,
        quantity: number = 1,
        attribute?: AddToCartAttribute
    ) => {
        const basePrice =
            product.on_sale && product.sale_price
                ? product.sale_price
                : product.price;

        const finalPrice = attribute ? basePrice + attribute.price : basePrice;

        const store = product.store;

        const addProduct = () => {
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

            Toast.show({
                type: "success",
                text1: t("cart.addedToCart"),
            });
        };

        if (cartItems.length === 0) {
            addProduct();
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
                            addProduct();
                        },
                    },
                ]
            );
            return;
        }

        addProduct();
    };

    return {
        handleAddToCart,
        getCartQuantity,
    };
};
