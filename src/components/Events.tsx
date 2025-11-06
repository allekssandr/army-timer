import React, { useEffect, useMemo, useState } from 'react';
import GlassCard from './GlassCard';
import { EventItem, EventChoice } from '../types';
import { getEvents, getEventWithOdds, placeBet, getChoices, createEvent, createChoice } from '../services/events';

const Events: React.FC = () => {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const list = await getEvents();
                setEvents(list);
                if (list.length > 0) setSelectedId(list[0].id);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2">
                <EventList
                    events={events}
                    loading={loading}
                    error={error}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                />
            </div>
            <div>
                <EventForm onCreated={(ev) => setEvents(prev => [ev, ...prev])} />
            </div>
        </div>
    );
};

const EventList: React.FC<{
    events: EventItem[];
    loading: boolean;
    error: string | null;
    selectedId: string | null;
    onSelect: (id: string) => void;
}> = ({ events, loading, error, selectedId, onSelect }) => {
    if (loading) return <GlassCard className="p-6 text-sm text-white/70">Загрузка событий...</GlassCard>;
    if (error) return <GlassCard className="p-6 text-sm text-red-400">{error}</GlassCard>;
    if (events.length === 0) return <GlassCard className="p-6 text-sm text-white/70">Событий нет</GlassCard>;

    return (
        <div className="flex flex-col gap-4">
            {events.map(ev => (
                <EventCard key={ev.id} eventId={ev.id} active={selectedId === ev.id} onClick={() => onSelect(ev.id)} />
            ))}
        </div>
    );
};

const EventCard: React.FC<{ eventId: string; active: boolean; onClick: () => void }> = ({ eventId, active, onClick }) => {
    const [choices, setChoices] = useState<EventChoice[]>([]);
    const [odds, setOdds] = useState<Record<string, number>>({});
    const [title, setTitle] = useState<string>('Событие');

    useEffect(() => {
        const load = async () => {
            const { bets, choices, odds } = await getEventWithOdds(eventId);
            setChoices(choices);
            setOdds(odds);
        };
        load();
    }, [eventId]);

    return (
        <GlassCard className={`p-6 cursor-pointer ${active ? 'ring-2 ring-[--color-accent]' : ''}`} ariaLabel="Карточка события" tabIndex={0}>
            <div className="flex items-start justify-between gap-4" onClick={onClick}>
                <div>
                    <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                        {choices.length === 0 ? (
                            <div className="col-span-2 text-sm text-white/60">Выборов нет</div>
                        ) : (
                            choices.map(c => (
                                <div key={c.id} className="flex items-center justify-between gap-6 bg-white/5 rounded-xl px-3 py-2 border border-white/10">
                                    <span className="text-sm">{c.title}</span>
                                    <span className="text-sm tabular-nums">{odds[c.title] ?? '-'}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <BetForm eventId={eventId} onPlaced={() => { /* обновление снаружи будет периодическим */ }} />
            </div>
        </GlassCard>
    );
};

const BetForm: React.FC<{ eventId: string; onPlaced: () => void }> = ({ eventId, onPlaced }) => {
    const [choices, setChoices] = useState<EventChoice[]>([]);
    const [choice, setChoice] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            const list = await getChoices(eventId);
            setChoices(list);
            setChoice(list[0]?.title ?? '');
        };
        load();
    }, [eventId]);

    const handlePlace = async () => {
        setError(null);
        if (!choice || !amount) return;
        const n = Number(amount);
        if (!isFinite(n) || n <= 0) { setError('Введите сумму'); return; }
        setLoading(true);
        try {
            await placeBet(eventId, choice, n);
            setAmount('');
            onPlaced();
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
                <select
                    value={choice}
                    onChange={e => setChoice(e.target.value)}
                    className="h-11 px-3 rounded-xl bg-white/10 border border-white/20 text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent]"
                    aria-label="Исход"
                >
                    {choices.map(c => <option key={c.id} value={c.title}>{c.title}</option>)}
                </select>
                <input
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="Сумма"
                    className="w-full h-11 px-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/50 text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent]"
                    aria-label="Сумма"
                />
                <button
                    onClick={handlePlace}
                    disabled={loading}
                    className="h-11 px-4 rounded-xl bg-[--color-accent]/20 hover:bg-[--color-accent]/30 border border-[--color-accent]/30 text-white/90 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent]"
                    aria-label="Сделать ставку"
                >
                    Поставить
                </button>
            </div>
            {error && <div className="text-red-400 text-xs" role="alert">{error}</div>}
        </div>
    );
};

const EventForm: React.FC<{ onCreated: (ev: EventItem) => void }> = ({ onCreated }) => {
    const [title, setTitle] = useState('Служба — вернётся?');
    const [description, setDescription] = useState('Шуточная линия ставок');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCreate = async () => {
        setError(null);
        if (!title.trim()) { setError('Введите название'); return; }
        setLoading(true);
        try {
            const id = await createEvent(title.trim(), description.trim());
            // по умолчанию создадим два исхода
            await Promise.all([
                createChoice(id, 'Уйдёт'),
                createChoice(id, 'Не уйдёт'),
            ]);
            onCreated({ id, title, description, status: 'open', createdAt: new Date() });
            setTitle('');
            setDescription('');
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <GlassCard className="p-6" ariaLabel="Создать событие">
            <div className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold tracking-tight">Создать событие</h3>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Название"
                    className="w-full h-11 px-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/50 text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent]"
                />
                <input
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Описание"
                    className="w-full h-11 px-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/50 text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent]"
                />
                <button
                    onClick={handleCreate}
                    disabled={loading}
                    className="h-11 px-4 rounded-xl bg-[--color-accent]/20 hover:bg-[--color-accent]/30 border border-[--color-accent]/30 text-white/90 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent]"
                >
                    Создать
                </button>
                {error && <div className="text-red-400 text-xs" role="alert">{error}</div>}
            </div>
        </GlassCard>
    );
};

export default Events;


