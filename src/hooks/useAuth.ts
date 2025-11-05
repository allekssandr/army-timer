import { useState, useEffect } from 'react';
import { loginWithGoogle, logout, onAuthStateChanged } from '../services/auth';

const useAuth = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { data: unsubscribe } = onAuthStateChanged((u: any) => {
            setUser(u);
            setLoading(false);
        });
        return () => unsubscribe?.subscription?.unsubscribe();
    }, []);

    return {
        user,
        loading,
        login: loginWithGoogle,
        logout,
    };
};

export default useAuth;