import { supabase } from './supabaseClient';
import { Bet, EventItem, EventChoice, OddsByChoice } from '../types';

export const createEvent = async (title: string, description: string): Promise<string> => {
    const { data, error } = await supabase
        .from('events')
        .insert([{ title, description }])
        .select('id')
        .single();
    if (error) throw new Error(error.message);
    return data.id as string;
};

export const getEvents = async (): Promise<EventItem[]> => {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return (data || []).map((e: any) => ({
        id: e.id,
        title: e.title,
        description: e.description ?? '',
        createdBy: e.created_by ?? '',
        status: e.status ?? 'open',
        createdAt: new Date(e.created_at),
    }));
};

export const getChoices = async (eventId: string): Promise<EventChoice[]> => {
    const { data, error } = await supabase
        .from('event_choices')
        .select('*')
        .eq('event_id', eventId)
        .order('created_at', { ascending: true });
    if (error) throw new Error(error.message);
    return (data || []).map((c: any) => ({
        id: c.id,
        eventId: c.event_id,
        title: c.title,
        createdAt: new Date(c.created_at),
    }));
};

export const createChoice = async (eventId: string, title: string): Promise<string> => {
    const { data, error } = await supabase
        .from('event_choices')
        .insert([{ event_id: eventId, title }])
        .select('id')
        .single();
    if (error) throw new Error(error.message);
    return data.id as string;
};

export const placeBet = async (eventId: string, choice: string, amount: number): Promise<string> => {
    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr) throw new Error(userErr.message);
    const userId = userData.user?.id;
    if (!userId) throw new Error('Требуется авторизация');

    const { data, error } = await supabase
        .from('bets')
        .insert([{ user_id: userId, event_id: eventId, choice, amount }])
        .select('id')
        .single();
    if (error) throw new Error(error.message);
    return data.id as string;
};

export const getBetsForEvent = async (eventId: string): Promise<Bet[]> => {
    const { data, error } = await supabase
        .from('bets')
        .select('*')
        .eq('event_id', eventId)
        .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);

    return (data || []).map((b: any) => ({
        id: b.id,
        user_id: b.user_id ?? '',
        event_id: b.event_id,
        choice: b.choice,
        amount: Number(b.amount),
        created_at: new Date(b.created_at),
    }));
};

export const calcOdds = (bets: Bet[]): OddsByChoice => {
    if (bets.length === 0) return {};
    const total = bets.reduce((acc, b) => acc + (b.amount || 0), 0);
    const perChoice: Record<string, number> = {};
    bets.forEach(b => { perChoice[b.choice] = (perChoice[b.choice] || 0) + b.amount; });
    const odds: OddsByChoice = {};
    Object.entries(perChoice).forEach(([choice, sum]) => {
        const base = total > 0 && sum > 0 ? total / sum : 1;
        odds[choice] = Number(Math.max(1.05, base).toFixed(2));
    });
    return odds;
};

export const getEventWithOdds = async (eventId: string) => {
    const [bets, choices] = await Promise.all([
        getBetsForEvent(eventId),
        getChoices(eventId),
    ]);
    const odds = calcOdds(bets);
    return { bets, choices, odds };
};


