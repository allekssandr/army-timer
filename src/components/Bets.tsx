import React, { useEffect, useState } from 'react';
import { getBets, createBet } from '../services/bets';
import { Bet, User } from '../types';
import GlassCard from './GlassCard';

interface BetsProps {
    user: User;
}

const Bets: React.FC<BetsProps> = ({ user }) => {
    const [bets, setBets] = useState<Bet[]>([]);
    const [newBet, setNewBet] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);

    useEffect(() => {
        const fetchBets = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchedBets = await getBets();
                setBets(fetchedBets.filter(bet => bet.userId === user.id));
                console.log('BETS:', fetchedBets);
            } catch (e:any) {
                setError(e.message || 'Ошибка получения ставок');
            } finally {
                setLoading(false);
            }
        };
        fetchBets();
    }, [user.id]);

    const handlePlaceBet = async () => {
        setError(null);
        if (newBet.trim()) {
            try {
                await createBet({
                    userId: user.id,
                    amount: Number(newBet),
                    odds: 1,
                    createdAt: new Date(),
                } as any);
                setNewBet('');
                const updatedBets = await getBets();
                setBets(updatedBets.filter(bet => bet.userId === user.id));
            } catch (e:any) {
                setError(e.message || 'Ошибка при создании ставки');
            }
        }
    };

    return (
        <GlassCard className="p-6 sm:p-8" ariaLabel="Ставки пользователя">
            <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold tracking-tight">Ваши ставки</h3>

                {error && <div className="text-red-400 text-xs" role="alert">{error}</div>}

                {loading ? (
                    <div className="text-sm text-white/70">Загрузка ставок...</div>
                ) : bets.length === 0 ? (
                    <div className="text-sm text-white/50">Ставок нет</div>
                ) : (
                    <ul className="divide-y divide-white/10 rounded-xl overflow-hidden border border-white/10">
                        {bets.map((bet) => (
                            <li key={bet.id} className="px-4 py-3 flex items-center justify-between hover:bg-white/5 transition">
                                <span className="text-sm tabular-nums">{bet.amount}</span>
                                <span className="text-xs text-white/60">odds: {bet.odds}</span>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="flex items-center gap-3">
                    <input
                        type="number"
                        value={newBet}
                        onChange={(e) => setNewBet(e.target.value)}
                        placeholder="Сумма"
                        className="w-full h-11 px-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/50 text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent]"
                        aria-label="Сумма ставки"
                    />
                    <button
                        onClick={handlePlaceBet}
                        className="h-11 px-4 rounded-xl bg-[--color-accent]/20 hover:bg-[--color-accent]/30 border border-[--color-accent]/30 text-white/90 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent]"
                        aria-label="Сделать ставку"
                    >
                        Поставить
                    </button>
                </div>
            </div>
        </GlassCard>
    );
};

export default Bets;