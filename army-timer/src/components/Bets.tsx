import React, { useEffect, useState } from 'react';
import { getBets, placeBet } from '../services/bets';
import { Bet } from '../types';

const Bets: React.FC = () => {
    const [bets, setBets] = useState<Bet[]>([]);
    const [newBet, setNewBet] = useState<string>('');

    useEffect(() => {
        const fetchBets = async () => {
            const fetchedBets = await getBets();
            setBets(fetchedBets);
        };

        fetchBets();
    }, []);

    const handlePlaceBet = async () => {
        if (newBet.trim()) {
            await placeBet(newBet);
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
                    <li key={bet.id}>{bet.description}</li>
                ))}
            </ul>
            <input
                type="text"
                value={newBet}
                onChange={(e) => setNewBet(e.target.value)}
                placeholder="Введите вашу ставку"
            />
            <button onClick={handlePlaceBet}>Сделать ставку</button>
        </div>
    );
};

export default Bets;