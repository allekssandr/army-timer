import { db } from '../firebase'; // Импортируйте вашу конфигурацию Firebase
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { Bet } from '../types'; // Импортируйте тип Bet из вашего файла типов

const betsCollection = collection(db, 'bets');

export const createBet = async (bet: Bet) => {
    try {
        const docRef = await addDoc(betsCollection, bet);
        return docRef.id;
    } catch (error) {
        console.error('Ошибка при создании ставки: ', error);
        throw new Error('Не удалось создать ставку');
    }
};

export const getBets = async () => {
    try {
        const betsQuery = query(betsCollection, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(betsQuery);
        const bets: Bet[] = [];
        querySnapshot.forEach((doc) => {
            bets.push({ id: doc.id, ...doc.data() } as Bet);
        });
        return bets;
    } catch (error) {
        console.error('Ошибка при получении ставок: ', error);
        throw new Error('Не удалось получить ставки');
    }
};