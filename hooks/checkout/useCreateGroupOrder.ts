import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import { selectCartItems, selectCartTotalPrice, useAppSelector } from '@/redux/hooks';
import { useAuth } from '@/hooks/auth/useAuth';
import { usePlace } from '@/hooks/place/usePlace';
import useFetch from '@/hooks/common/useFetch';
import BottomSheet from '@gorhom/bottom-sheet';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Toast from 'react-native-toast-message';
import { CartItem } from '@/@types/cart';
import axios from 'axios';
import { config } from '@/constants/config';
import { clearCart } from '@/redux/store';
import { useAppDispatch } from '@/redux/hooks';
import { useSetting } from '@/hooks/common/useSetting';


export default function useCreateOrder() {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const cartItems = useAppSelector(selectCartItems);
    const { selectedPlace } = usePlace()
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const { data: areas } = useFetch(`/areas/place/${selectedPlace?.id}`);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedArea, setSelectedArea] = useState<any>(null);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const filteredAreas = areas?.filter((area: any) =>
        area.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const { settings } = useSetting();

console.log("cart item",cartItems)

    const formik = useFormik({
        initialValues: {
            customer_name: "",
            phone: "",
            address: "",
            area_id: "",
            area_name: "",
        },

        validationSchema: Yup.object({
            customer_name: Yup.string().required(t("order.customerNameRequired")),
            phone: Yup.string()
                .required(t("order.phoneRequired"))
                .min(6, t("order.phoneMin")),
            area_id: Yup.string().required(t("order.areaRequired")),
            address: Yup.string().required(t("order.addressRequired")),
        }),

        onSubmit: async (values) => {
            try {
                setLoading(true);

                if (cartItems.length === 0) {
                    Toast.show({
                        type: "error",
                        text1: "Your cart is empty",
                        position: "bottom",
                    });
                    return;
                }

                // 1. group by store
                const groupedByStore = cartItems.reduce<Record<number, CartItem[]>>(
                    (acc, item) => {
                        if (!acc[item.store_id]) {
                            acc[item.store_id] = [];
                        }
                        acc[item.store_id].push(item);
                        return acc;
                    },
                    {}
                );


                // -------------------------------------
                const extraStores = Math.max(Object.keys(groupedByStore).length - 1, 0);

                const extraCost =
                    extraStores *
                    selectedArea?.price *
                    (Number(settings?.order_extra_ratio) / 100);

                const delivery_fee =
                    Number(selectedArea?.price || 0) + extraCost;

                    // ---------------------------------

                // 2. build stores array (NEW FORMAT)
                const stores = Object.keys(groupedByStore).map((storeId) => {
                    const items = groupedByStore[Number(storeId)];

                    const total_price = items.reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                    );

                    return {
                        store_id: Number(storeId),
                        store_name: items[0].store_name,
                        total_price: Number(total_price.toFixed(2)),
                        items: items.map((item) => ({
                            id: item.id,
                            name: item.name,
                            description: item.description,
                            image: item.image,
                            quantity: item.quantity,
                            price: item.price,
                            selectedAttribute: item.selectedAttribute,
                        })),
                    };
                });

                // 3. single request (IMPORTANT CHANGE 🔥)
                const response = await axios.post(
                    `${config.URL}/orders/create-group`,
                    {
                        stores,
                        customer_name: values.customer_name,
                        delivery_address: values.address,
                        phone: values.phone,
                        area_id: selectedArea?.id,
                        area_name: selectedArea?.name,
                        delivery_fee,
                    }
                );

                // 4. success handling
                if (!response.data?.success) {
                    throw new Error("Order creation failed");
                }

                setSuccessModalVisible(true);
                formik.resetForm();
                setSelectedArea(null);
                dispatch(clearCart());

            } catch (error: any) {
                console.error("Order creation error:", error);
                Toast.show({
                    type: "error",
                    text1: t("order.orderErrorcreate"),
                    text2: error.response?.data?.error || error.message,
                    position: "top",
                });
            } finally {
                setLoading(false);
            }
        }
    });
    const storeCount = Object.keys(
        cartItems.reduce<Record<number, CartItem[]>>((acc, item) => {
            if (!acc[item.store_id]) {
                acc[item.store_id] = [];
            }
            acc[item.store_id].push(item);
            return acc;
        }, {})
    ).length;



    return {
        t,
        bottomSheetRef,
        formik,
        selectedArea,
        loading,
        successModalVisible,
        setSuccessModalVisible,
        searchQuery,
        setSearchQuery,
        filteredAreas,
        setSelectedArea,
        setModalVisible,
        storeCount
    }
}
