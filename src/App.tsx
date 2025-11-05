import React from 'react';
import Timer from './components/Timer';
import MusicPlayer from './components/MusicPlayer';
import GoogleAuth from './components/GoogleAuth';
import Bets from './components/Bets';
import GlassCard from './components/GlassCard';
import useAuth from './hooks/useAuth';

const App: React.FC = () => {
    const { user, loading } = useAuth();

    return (
        <div className="min-h-dvh flex flex-col">
            <header className="w-full">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md relative" aria-hidden="true">
                            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[--color-accent] shadow-[0_0_12px_var(--color-accent)]" />
                        </div>
                        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">Army Timer</h1>
                    </div>
                    <div className="shrink-0">
                        <GoogleAuth />
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10">
                    {loading ? (
                        <GlassCard className="p-6 text-sm text-white/80" ariaLabel="Состояние загрузки">
                            Загрузка...
                        </GlassCard>
                    ) : user ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                            <div className="lg:col-span-3">
                                <Timer user={user} />
                            </div>
                            <div className="lg:col-span-2 order-2 lg:order-none">
                                <MusicPlayer user={user} />
                            </div>
                            <div className="order-1 lg:order-none">
                                <Bets user={user} />
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-md mx-auto">
                            <GlassCard className="p-6">
                                <GoogleAuth />
                            </GlassCard>
                        </div>
                    )}
                </div>
            </main>

            <footer className="px-4 sm:px-6 py-6 text-center text-xs text-white/50">
                Сделано с любовью • {new Date().getFullYear()}
            </footer>
        </div>
    );
};

export default App;