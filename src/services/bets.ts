import { supabase } from './supabaseClient';
import { Bet } from '../types';

export const createBet = async (bet: Omit<Bet, 'id'>) => {
    const { data: { session } } = await supabase.auth.getSession();
    console.log('session', session);
    console.log('user', session?.user);

    const payload = { ...bet, createdAt: bet.createdAt.toISOString() };
    const { data, error } = await supabase.from('bets').insert([payload]).select();
    if (error) throw new Error('Не удалось создать ставку: ' + error.message);
    return data?.[0]?.id || null;
};

export const getBets = async (): Promise<Bet[]> => {
    const { data, error } = await supabase
        .from('bets')
        .select('*')
        .order('createdAt', { ascending: false });
    if (error) throw new Error('Не удалось получить ставки: ' + error.message);
    // Преобразуем createdAt обратно в Date
    return ((data || []) as any[]).map(bet => ({ ...bet, createdAt: new Date(bet.createdAt) })) as Bet[];
};
