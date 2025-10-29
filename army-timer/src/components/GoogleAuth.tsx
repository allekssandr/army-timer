import React from 'react';
import { signInWithGoogle, signOut } from '../services/auth';

const GoogleAuth: React.FC = () => {
    const handleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <div>
            <button onClick={handleSignIn}>Sign in with Google</button>
            <button onClick={handleSignOut}>Sign out</button>
        </div>
    );
};

export default GoogleAuth;