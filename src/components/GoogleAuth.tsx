import React from 'react';
import useAuth from '../hooks/useAuth';

const GoogleAuth: React.FC = () => {
    const { user, login, logout, loading } = useAuth();

    if (loading) return <div>Загрузка...</div>;

    return (
        <div className="flex flex-col items-center gap-2">
            {user ? (
                <>
                    <span className="text-sm">{user.email}</span>
                    <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={logout}>Выйти</button>
                </>
            ) : (
                <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={login}>Войти через Google</button>
            )}
        </div>
    );
};

export default GoogleAuth;