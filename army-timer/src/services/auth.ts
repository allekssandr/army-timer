import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../firebase"; // Импортируйте ваш экземпляр Firebase

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        return user;
    } catch (error) {
        console.error("Ошибка аутентификации:", error);
        throw error;
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Ошибка выхода:", error);
        throw error;
    }
};

export const onAuthStateChanged = (callback) => {
    return auth.onAuthStateChanged(callback);
};