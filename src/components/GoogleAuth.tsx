import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';

const GoogleAuth: React.FC = () => {
    const { user, login, logout, loading } = useAuth();
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        setError(null);
        try {
            await login();
        } catch (err: any) {
            setError(err?.message || 'Ошибка входа.');
        }
    };
    const handleLogout = async () => {
        setError(null);
        try {
            await logout();
        } catch (err: any) {
            setError(err?.message || 'Ошибка выхода.');
        }
    };

    if (loading) return <div className="text-sm text-white/70">Загрузка...</div>;

    return (
        <div className="flex flex-col items-center gap-2">
            {user ? (
                <>
                    <span className="text-sm text-white/80">{user.email}</span>
                    <button
                        className="h-10 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white/90 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent]"
                        onClick={handleLogout}
                        disabled={loading}
                        aria-label="Выйти из аккаунта"
                    >
                        Выйти
                    </button>
                </>
            ) : (
                <button
                    className="h-10 px-4 rounded-xl bg-[--color-accent]/20 hover:bg-[--color-accent]/30 border border-[--color-accent]/30 text-white/90 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent]"
                    onClick={handleLogin}
                    disabled={loading}
                    aria-label="Войти через Google"
                >
                    Войти через Google
                </button>
            )}
            {error && <span className="text-red-400 text-xs mt-2" role="alert">{error}</span>}
        </div>
    );
};

export default GoogleAuth;