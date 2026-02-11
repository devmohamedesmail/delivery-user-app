import NoWifi from '@/components/ui/no-wifi';

import NetInfo from '@react-native-community/netinfo';
import React, { createContext, useEffect, useState } from 'react';



type NetworkContextType = {
    isConnected: boolean;
};

export const NetworkContext = createContext<NetworkContextType>({
    isConnected: true,
});

export const NetworkProvider = ({ children }: { children: React.ReactNode }) => {
    const [isConnected, setIsConnected] = useState(true);
   

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            const connected = !!state.isConnected;
            setIsConnected(connected);
        });

        return () => unsubscribe();
    }, []);

    return (
        <NetworkContext.Provider value={{ isConnected }}>
            {children}

            {/* No Connection Modal */}
           <NoWifi isConnected={isConnected} />
        </NetworkContext.Provider>
    );
};
