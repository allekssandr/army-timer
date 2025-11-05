import React, { useEffect, useState } from 'react';
import { getBets, createBet } from '../services/bets';
import { Bet } from '../types';

const Bets: React.FC = () => {
    const [bets, setBets] = useState<Bet[]>([]);
    const [newBet, setNewBet] = useState('');

    useEffect(() => {
        const fetchBets = async () => {
            const fetchedBets = await getBets();
            setBets(fetchedBets);
        };
        fetchBets();
    }, []);

    const handlePlaceBet = async () => {
        if (newBet.trim()) {
            await createBet({
                userId: 'anonymous',
                amount: Number(newBet),
                odds: 1,
                createdAt: new Date(),
            } as any); // any — для быстрого теста, подправь типы если нужно
            setNewBet('');
            const updatedBets = await getBets();
            setBets(updatedBets);
        }
    };

    return (
        <div className="bets-container">
            <h2>Ставки</h2>
            <ul>
                {bets.map((bet) => (
                    <li key={bet.id}>{bet.amount} (odds: {bet.odds})</li>
                ))}
            </ul>
            <input
                type="text"
                value={newBet}
                onChange={(e) => setNewBet(e.target.value)}
                placeholder="Введите сумму вашей ставки"
            />
            <button onClick={handlePlaceBet}>Сделать ставку</button>
        </div>
    );
};

export default Bets;