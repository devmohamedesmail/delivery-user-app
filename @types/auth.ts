type AuthContextType = {
    user: any;
    login: (identifier: string, password: string, method: 'email' | 'phone') => Promise<any>;
    register: (
        name: string,
        identifier: string,
        password: string,
        role_id: string,
        method: 'email' | 'phone'
    ) => Promise<any>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
    social_login: (
        email: string,
        name: string,
        avatar: string,
        provider: 'google' | 'facebook',
        provider_id: string,
    ) => Promise<any>;
};