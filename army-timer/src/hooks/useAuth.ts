import { useState, useEffect } from 'react';
import { auth } from '../services/auth';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async () => {
        await auth.signInWithGoogle();
    };

    const logout = async () => {
        await auth.signOut();
    };

    return { user, loading, login, logout };
};

export default useAuth;