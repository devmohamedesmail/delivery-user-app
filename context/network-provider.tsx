import React, { createContext, useContext, useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
// import { Toast } from 'toastify-react-native';
import { useTranslation } from 'react-i18next';

type NetworkContextType = {
    isConnected: boolean;
};

export const NetworkContext = createContext<NetworkContextType>({
    isConnected: true,
});

// export const useNetwork = () => useContext(NetworkContext);

export const NetworkProvider = ({ children }: { children: React.ReactNode }) => {
    const [isConnected, setIsConnected] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);
    const {t}=useTranslation();

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            const connected = !!state.isConnected;

            // Don't show toast on initial load
            if (!initialLoad) {
                // if (!connected) {
                //     Toast.show({
                //         type: 'error',
                //         text1: t('common.no_internet'),
                //         text2: t('common.no_internet_description')
                //     });
                // } else if (connected && !isConnected) {
                //     Toast.show({
                //         type: 'success',
                //         text1: t('common.connected'),
                //         text2: t('common.internet_connection_restored')
                //     });
                // }
            } else {
                setInitialLoad(false);
            }

            setIsConnected(connected);
        });

        return () => unsubscribe();
    }, [isConnected, initialLoad]);

    return (
        <NetworkContext.Provider value={{ isConnected }}>
            {children}
        </NetworkContext.Provider>
    );
};
