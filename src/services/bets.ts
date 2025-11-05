import { supabase } from './supabaseClient';
import { Bet } from '../types';

export const createBet = async (bet: Omit<Bet, 'id'>) => {
    const { data, error } = await supabase.from('bets').insert([bet]).select();
    if (error) throw new Error('Не удалось создать ставку: ' + error.message);
    return data?.[0]?.id || null;
};

export const getBets = async (): Promise<Bet[]> => {
    const { data, error } = await supabase
        .from('bets')
        .select('*')
        .order('createdAt', { ascending: false });
    if (error) throw new Error('Не удалось получить ставки: ' + error.message);
    return data as Bet[];
};
