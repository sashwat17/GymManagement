import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import {
    Activity,
    ArrowDownRight,
    ArrowRight,
    ArrowUpRight,
    Bell,
    CalendarDays,
    Check,
    ChevronRight,
    CircleCheck,
    Clock3,
    Dumbbell,
    Heart,
    LogOut,
    Menu,
    Plus,
    Search,
    ShieldCheck,
    Sparkles,
    Star,
    Target,
    TrendingUp,
    UserRound,
    UsersRound,
    Weight,
    X,
} from 'lucide-react';
import { useState, type FormEvent, type ReactNode } from 'react';

type GymUser = {
    id: number;
    name: string;
    email: string;
    role: 'trainee' | 'trainer';
    phone?: string | null;
    location?: string | null;
    height_cm?: number | null;
    weight_kg?: string | number | null;
    fitness_goal?: string | null;
    specialization?: string | null;
    certification?: string | null;
    experience_years?: number | null;
};

type GymPageProps = {
    section: string;
    auth: { user: GymUser };
};

type NavigationItem = { href: string; label: string; icon: typeof Activity };

const traineeNavigation: NavigationItem[] = [
    { href: '/dashboard', label: 'Overview', icon: Activity },
    { href: '/workouts', label: 'My workouts', icon: Dumbbell },
    { href: '/profile', label: 'My profile', icon: UserRound },
    { href: '/notifications', label: 'Notifications', icon: Bell },
];

const trainerNavigation: NavigationItem[] = [
    { href: '/trainer', label: 'Overview', icon: Activity },
    { href: '/trainer/trainees', label: 'Trainees', icon: UsersRound },
    { href: '/trainer/assign', label: 'Assign a plan', icon: CalendarDays },
    { href: '/trainer/workouts', label: 'Workout library', icon: Dumbbell },
    { href: '/trainer/profile', label: 'My profile', icon: UserRound },
    { href: '/trainer/notifications', label: 'Notifications', icon: Bell },
];

function GymLayout({ children, title }: { children: ReactNode; title: string }) {
    const { auth } = usePage<GymPageProps>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isTrainer = auth.user.role === 'trainer';
    const navigation = isTrainer ? trainerNavigation : traineeNavigation;

    return (
        <div className="min-h-screen bg-[#faf8f5] text-[#34332f]">
            <Head title={title} />
            <header className="sticky top-0 z-30 border-b border-[#e8e3dd] bg-[#fdfcfa]/95 backdrop-blur">
                <div className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between gap-5 px-4 sm:px-7 lg:px-10">
                    <Link href={isTrainer ? '/trainer' : '/dashboard'} className="flex shrink-0 items-center gap-3">
                        <span className="grid size-10 place-items-center rounded-xl bg-[#a67c52] text-white"><Dumbbell size={20} /></span>
                        <span className="sr-only">Gym management</span>
                    </Link>

                    <nav className="hidden items-center gap-1 lg:flex">
                        {navigation.map(({ href, label, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${title === label ? 'bg-[#f5f1ed] text-[#8e6744]' : 'text-[#79756f] hover:bg-[#f5f1ed] hover:text-[#34332f]'}`}
                            >
                                <Icon size={16} strokeWidth={1.8} />{label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <Link href={isTrainer ? '/trainer/notifications' : '/notifications'} aria-label="Notifications" className="relative grid size-10 place-items-center rounded-xl border border-[#e8e3dd] bg-white text-[#79756f] hover:text-[#a67c52]">
                            <Bell size={18} /><span className="absolute right-2 top-2 size-2 rounded-full bg-[#c4866b]" />
                        </Link>
                        <div className="hidden items-center gap-3 sm:flex">
                            <div className="grid size-10 place-items-center rounded-full bg-[#e9ded1] text-sm font-semibold text-[#8e6744]">{initials(auth.user.name)}</div>
                            <div className="hidden min-w-0 xl:block"><p className="max-w-36 truncate text-sm font-semibold">{auth.user.name}</p><p className="text-xs capitalize text-[#918b82]">{auth.user.role}</p></div>
                        </div>
                        <button type="button" onClick={() => router.post('/logout')} aria-label="Log out" className="hidden size-10 place-items-center rounded-xl text-[#918b82] hover:bg-[#f5f1ed] hover:text-[#a67c52] sm:grid"><LogOut size={18} /></button>
                        <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} aria-label="Toggle navigation" className="grid size-10 place-items-center rounded-xl border border-[#e8e3dd] bg-white lg:hidden">{mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}</button>
                    </div>
                </div>
                {mobileMenuOpen && (
                    <nav className="grid gap-1 border-t border-[#e8e3dd] px-4 py-3 lg:hidden">
                        {navigation.map(({ href, label, icon: Icon }) => <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#79756f] hover:bg-[#f5f1ed]"><Icon size={17} />{label}</Link>)}
                        <button type="button" onClick={() => router.post('/logout')} className="flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-[#79756f] hover:bg-[#f5f1ed]"><LogOut size={17} />Log out</button>
                    </nav>
                )}
            </header>
            <main className="mx-auto max-w-[1500px] px-4 py-7 sm:px-7 sm:py-9 lg:px-10 lg:py-10">{children}</main>
            <footer className="mx-auto flex max-w-[1500px] items-center justify-between px-4 pb-8 text-xs text-[#a49c92] sm:px-7 lg:px-10">
                <span>Make room for your well-being.</span><span className="hidden sm:inline">Progress at your own pace</span>
            </footer>
        </div>
    );
}

function initials(name: string): string {
    return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || 'F';
}

function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
    return (
        <div className="mb-7 flex flex-col justify-between gap-4 sm:mb-8 sm:flex-row sm:items-end">
            <div>
                <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#a67c52]">{eyebrow}</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-[-.04em] sm:text-4xl">{title}</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#79756f] sm:text-base">{description}</p>
            </div>
            {action}
        </div>
    );
}

function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
    return <section className={`rounded-2xl border border-[#e8e3dd] bg-white p-5 shadow-[0_5px_20px_rgba(63,49,34,0.035)] sm:p-6 ${className}`}>{children}</section>;
}

function StatCard({ label, value, note, icon: Icon, trend }: { label: string; value: string; note: string; icon: typeof Activity; trend?: 'up' | 'down' }) {
    return (
        <Panel className="p-5">
            <div className="flex items-start justify-between gap-3">
                <div><p className="text-sm text-[#79756f]">{label}</p><p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p></div>
                <span className="grid size-11 place-items-center rounded-xl bg-[#f5f1ed] text-[#a67c52]"><Icon size={20} /></span>
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-[#918b82]">
                {trend === 'down' ? <ArrowDownRight size={14} className="text-[#c4866b]" /> : trend === 'up' ? <ArrowUpRight size={14} className="text-[#819578]" /> : null}{note}
            </p>
        </Panel>
    );
}

function ProgressLine({ label, value, color = 'bg-[#a67c52]' }: { label: string; value: number; color?: string }) {
    return <div><div className="mb-2 flex justify-between text-sm"><span className="text-[#79756f]">{label}</span><span className="font-semibold">{value}%</span></div><div className="h-2 overflow-hidden rounded-full bg-[#f2efeb]"><div className={`h-full rounded-full ${color}`} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></div></div>;
}

function MiniBars({ values, labels, color = '#a67c52' }: { values: number[]; labels: string[]; color?: string }) {
    const max = Math.max(...values, 1);
    return (
        <div className="flex h-44 items-end justify-between gap-2 pt-5">
            {values.map((value, index) => <div key={labels[index]} className="flex h-full flex-1 flex-col items-center justify-end gap-2"><div className="flex h-full w-full items-end"><div className="mx-auto w-full max-w-8 rounded-t-lg transition-all" style={{ height: `${Math.max(8, value / max * 100)}%`, backgroundColor: color, opacity: index === values.length - 1 ? 1 : .55 }} /></div><span className="text-[11px] text-[#a49c92]">{labels[index]}</span></div>)}
        </div>
    );
}

const activityFeed = [
    { name: 'Completed strength session', type: 'Strength', time: 'Today · 8:42 AM', icon: Dumbbell },
    { name: 'Weekly goal reached', type: 'Milestone', time: 'Yesterday · 6:15 PM', icon: Target },
    { name: 'New plan from your coach', type: 'Coach update', time: 'Monday · 9:30 AM', icon: Sparkles },
];

function MemberDashboard({ user }: { user: GymUser }) {
    return (
        <GymLayout title="Overview">
            <PageHeading eyebrow="Your training space" title={`Good to see you, ${user.name.split(' ')[0]}.`} description="A little progress each day adds up to something remarkable." action={<Link href="/workouts" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#a67c52] px-4 py-3 text-sm font-semibold text-white hover:bg-[#8e6744]">Explore workouts <ArrowRight size={16} /></Link>} />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Sessions this week" value="4" note="2 more than last week" icon={Dumbbell} trend="up" />
                <StatCard label="Active minutes" value="185" note="Your weekly target is 240" icon={Clock3} />
                <StatCard label="Current streak" value="3 days" note="You're building a rhythm" icon={TrendingUp} trend="up" />
                <StatCard label="Plan completion" value="78%" note="Keep showing up" icon={CircleCheck} />
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
                <Panel>
                    <div className="flex items-start justify-between gap-4"><div><h2 className="font-semibold">Your weekly rhythm</h2><p className="mt-1 text-sm text-[#918b82]">Active minutes · this week</p></div><span className="rounded-full bg-[#eff2ec] px-3 py-1.5 text-xs font-semibold text-[#71836a]">On track</span></div>
                    <MiniBars values={[22, 38, 19, 54, 42, 74, 24]} labels={['M', 'T', 'W', 'T', 'F', 'S', 'S']} />
                </Panel>
                <Panel>
                    <div className="flex items-center justify-between"><div><h2 className="font-semibold">Your membership</h2><p className="mt-1 text-sm text-[#918b82]">A little more room to grow</p></div><ShieldCheck size={22} className="text-[#91a38a]" /></div>
                    <div className="mt-6 rounded-xl bg-[#f8f5f1] p-4"><div className="flex items-center justify-between"><span className="text-sm font-medium">Foundation membership</span><span className="rounded-full bg-[#e9efe5] px-2.5 py-1 text-[11px] font-semibold text-[#71836a]">ACTIVE</span></div><p className="mt-3 text-xs text-[#918b82]">Your plan is ready whenever you are.</p></div>
                    <div className="mt-5"><ProgressLine label="This week's movement goal" value={77} color="bg-[#91a38a]" /></div>
                    <Link href="/profile" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#8e6744] hover:text-[#a67c52]">View your profile <ChevronRight size={16} /></Link>
                </Panel>
            </div>
            <div className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
                <Panel>
                    <div className="flex items-center justify-between"><div><h2 className="font-semibold">A good place to start</h2><p className="mt-1 text-sm text-[#918b82]">A balanced session picked for today</p></div><span className="grid size-10 place-items-center rounded-xl bg-[#f5f1ed] text-[#a67c52]"><Dumbbell size={18} /></span></div>
                    <div className="mt-5 flex flex-col justify-between gap-4 rounded-xl border border-[#eee9e3] p-4 sm:flex-row sm:items-center"><div><p className="font-semibold">Full-body foundations</p><p className="mt-1 text-sm text-[#918b82]">Strength · Beginner · 35 min</p></div><Link href="/workouts" className="inline-flex items-center gap-2 text-sm font-semibold text-[#8e6744]">See workouts <ArrowRight size={15} /></Link></div>
                </Panel>
                <Panel>
                    <div className="flex items-center justify-between"><div><h2 className="font-semibold">Your latest updates</h2><p className="mt-1 text-sm text-[#918b82]">A few good things to know</p></div><Link href="/notifications" className="text-xs font-semibold text-[#8e6744]">View all</Link></div>
                    <div className="mt-3 divide-y divide-[#f0ece7]">{activityFeed.slice(0, 2).map(({ name, time, icon: Icon }) => <div key={name} className="flex gap-3 py-3"><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#f8f5f1] text-[#a67c52]"><Icon size={16} /></span><div><p className="text-sm font-medium">{name}</p><p className="mt-1 text-xs text-[#a49c92]">{time}</p></div></div>)}</div>
                </Panel>
            </div>
        </GymLayout>
    );
}

type Workout = { name: string; focus: string; level: string; duration: string; sessions: string; rating: string; color: string };
const workoutList: Workout[] = [
    { name: 'Full-body foundations', focus: 'Strength', level: 'Beginner', duration: '35 min', sessions: '12 moves', rating: '4.9', color: '#e9efe5' },
    { name: 'Steady-state reset', focus: 'Cardio', level: 'All levels', duration: '25 min', sessions: '5.2 km', rating: '4.8', color: '#f4e9df' },
    { name: 'Mobility & restore', focus: 'Mobility', level: 'Beginner', duration: '20 min', sessions: '8 moves', rating: '4.9', color: '#ece8f1' },
    { name: 'Strength, step by step', focus: 'Strength', level: 'Intermediate', duration: '45 min', sessions: '10 moves', rating: '4.7', color: '#f5eee2' },
    { name: 'Core stability', focus: 'Core', level: 'All levels', duration: '18 min', sessions: '6 moves', rating: '4.8', color: '#e4eeee' },
    { name: 'Feel-good intervals', focus: 'Cardio', level: 'Intermediate', duration: '30 min', sessions: '6 rounds', rating: '4.9', color: '#f2e6e4' },
];

function WorkoutsPage() {
    const [focus, setFocus] = useState('All');
    const [started, setStarted] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const visibleWorkouts = workoutList.filter((workout) => (focus === 'All' || workout.focus === focus) && workout.name.toLowerCase().includes(search.toLowerCase()));
    const filters = ['All', 'Strength', 'Cardio', 'Mobility', 'Core'];

    return (
        <GymLayout title="My workouts">
            <PageHeading eyebrow="Move with intention" title="Your workout library" description="Explore a mix of guided sessions and find the movement that feels right today." />
            <Panel className="mb-5 p-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-wrap gap-2">{filters.map((filter) => <button key={filter} type="button" onClick={() => setFocus(filter)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${focus === filter ? 'bg-[#a67c52] text-white' : 'bg-[#f5f1ed] text-[#79756f] hover:text-[#34332f]'}`}>{filter}</button>)}</div>
                    <label className="flex min-w-56 items-center gap-2 rounded-xl border border-[#e8e3dd] px-3 py-2.5 text-[#918b82]"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a workout" className="w-full bg-transparent text-sm text-[#34332f] outline-none placeholder:text-[#a49c92]" /></label>
                </div>
            </Panel>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {visibleWorkouts.map((workout) => <Panel key={workout.name} className="overflow-hidden p-0">
                    <div className="relative flex h-36 items-end justify-between p-5" style={{ backgroundColor: workout.color }}><div className="grid size-12 place-items-center rounded-2xl bg-white/80 text-[#a67c52]"><Dumbbell size={22} /></div><span className="flex items-center gap-1 rounded-full bg-white/85 px-2.5 py-1 text-xs font-semibold"><Star size={13} className="fill-[#d3a76e] text-[#d3a76e]" /> {workout.rating}</span><span className="absolute right-5 top-5 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold text-[#79756f]">{workout.level}</span></div>
                    <div className="p-5"><div className="flex items-center justify-between"><span className="text-xs font-semibold uppercase tracking-wider text-[#a67c52]">{workout.focus}</span><span className="text-xs text-[#918b82]">{workout.duration}</span></div><h2 className="mt-2 text-lg font-semibold">{workout.name}</h2><p className="mt-1 text-sm text-[#918b82]">{workout.sessions} · Trainer guided</p><button type="button" onClick={() => setStarted(workout.name)} className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${started === workout.name ? 'bg-[#e9efe5] text-[#71836a]' : 'bg-[#a67c52] text-white hover:bg-[#8e6744]'}`}>{started === workout.name ? <><Check size={16} /> Added to today's plan</> : <>Start workout <ArrowRight size={15} /></>}</button></div>
                </Panel>)}
                {visibleWorkouts.length === 0 && <Panel className="col-span-full py-12 text-center"><Dumbbell className="mx-auto text-[#c8b7a3]" size={30} /><p className="mt-3 font-semibold">No sessions found</p><p className="mt-1 text-sm text-[#918b82]">Try another search or choose a different focus.</p></Panel>}
            </div>
        </GymLayout>
    );
}

function ProfilePage({ user }: { user: GymUser }) {
    const { data, setData, patch, processing, errors, recentlySuccessful } = useForm({
        name: user.name ?? '',
        email: user.email ?? '',
        phone: user.phone ?? '',
        location: user.location ?? '',
        height_cm: user.height_cm?.toString() ?? '',
        weight_kg: user.weight_kg?.toString() ?? '',
        fitness_goal: user.fitness_goal ?? '',
    });
    const height = Number(data.height_cm) / 100;
    const bmi = height > 0 && Number(data.weight_kg) > 0 ? (Number(data.weight_kg) / (height * height)).toFixed(1) : '—';

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        patch('/settings/profile');
    }

    return (
        <GymLayout title="My profile">
            <PageHeading eyebrow="A little about you" title="Your profile" description="Keep your details and goals up to date so your training can grow with you." />
            <div className="grid items-start gap-5 xl:grid-cols-[.7fr_1.3fr]">
                <div className="grid gap-5">
                    <Panel className="text-center">
                        <div className="mx-auto grid size-20 place-items-center rounded-full bg-[#e9ded1] text-2xl font-semibold text-[#8e6744]">{initials(user.name)}</div>
                        <h2 className="mt-4 text-xl font-semibold">{data.name}</h2><p className="mt-1 text-sm text-[#918b82]">{data.email}</p>
                        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#71836a]"><span className="size-2 rounded-full bg-[#91a38a]" /> Member since this year</div>
                    </Panel>
                    <Panel>
                        <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-[#f5f1ed] text-[#a67c52]"><Weight size={19} /></span><div><h2 className="font-semibold">Body mass index</h2><p className="text-xs text-[#918b82]">An estimate, not a health diagnosis</p></div></div>
                        <div className="mt-5 flex items-end gap-2"><span className="text-4xl font-semibold">{bmi}</span><span className="mb-1 text-sm text-[#918b82]">BMI</span></div>
                        <p className="mt-2 text-sm text-[#79756f]">{bmi === '—' ? 'Add your height and weight to see your estimate.' : 'Use this as a general reference alongside how you feel.'}</p>
                    </Panel>
                </div>
                <Panel>
                    <div className="mb-6"><h2 className="text-lg font-semibold">Personal information</h2><p className="mt-1 text-sm text-[#918b82]">Your information is only used to personalize your account.</p></div>
                    <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
                        <Field label="Full name" value={data.name} onChange={(value) => setData('name', value)} error={errors.name} />
                        <Field label="Email address" type="email" value={data.email} onChange={(value) => setData('email', value)} error={errors.email} />
                        <Field label="Phone number" value={data.phone} onChange={(value) => setData('phone', value)} error={errors.phone} />
                        <Field label="Location" value={data.location} onChange={(value) => setData('location', value)} error={errors.location} />
                        <Field label="Height (cm)" type="number" value={data.height_cm} onChange={(value) => setData('height_cm', value)} error={errors.height_cm} />
                        <Field label="Weight (kg)" type="number" value={data.weight_kg} onChange={(value) => setData('weight_kg', value)} error={errors.weight_kg} />
                        <div className="sm:col-span-2"><label className="mb-2 block text-sm font-medium">Your main fitness goal</label><select value={data.fitness_goal} onChange={(event) => setData('fitness_goal', event.target.value)} className="w-full rounded-xl border border-[#e8e3dd] bg-white px-3.5 py-3 text-sm outline-none focus:border-[#a67c52]"><option value="">Choose a goal</option><option>Build strength</option><option>Improve endurance</option><option>Increase mobility</option><option>Feel healthier</option><option>Build a consistent routine</option></select>{errors.fitness_goal && <p className="mt-1 text-xs text-[#c85a54]">{errors.fitness_goal}</p>}</div>
                        <div className="flex items-center justify-between gap-3 sm:col-span-2"><p className="text-sm text-[#71836a]">{recentlySuccessful ? 'Your changes have been saved.' : ''}</p><button type="submit" disabled={processing} className="rounded-xl bg-[#a67c52] px-5 py-3 text-sm font-semibold text-white hover:bg-[#8e6744] disabled:opacity-60">{processing ? 'Saving…' : 'Save changes'}</button></div>
                    </form>
                </Panel>
            </div>
        </GymLayout>
    );
}

function Field({ label, value, onChange, error, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; error?: string; type?: string }) {
    return <div><label className="mb-2 block text-sm font-medium">{label}</label><input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-[#e8e3dd] bg-white px-3.5 py-3 text-sm outline-none transition focus:border-[#a67c52]" />{error && <p className="mt-1 text-xs text-[#c85a54]">{error}</p>}</div>;
}

type Notice = { id: number; title: string; text: string; time: string; unread: boolean; icon: typeof Activity };
const initialNotices: Notice[] = [
    { id: 1, title: 'A new week, a fresh start', text: 'Your weekly movement plan is ready. Pick a session that feels good today.', time: '2 hours ago', unread: true, icon: Sparkles },
    { id: 2, title: 'Your coach left a note', text: 'Great work staying consistent. Let’s keep building on that momentum.', time: 'Yesterday', unread: true, icon: Heart },
    { id: 3, title: 'Milestone unlocked', text: 'You completed 10 workouts. That consistency is worth celebrating.', time: 'Monday', unread: false, icon: Target },
    { id: 4, title: 'Membership reminder', text: 'Your Foundation membership is active and ready to use.', time: 'Last week', unread: false, icon: ShieldCheck },
];

function NotificationsPage({ trainer = false }: { trainer?: boolean }) {
    const [notices, setNotices] = useState(initialNotices);
    const unread = notices.filter((notice) => notice.unread).length;
    const markRead = (id: number) => setNotices((items) => items.map((item) => item.id === id ? { ...item, unread: false } : item));
    const markAllRead = () => setNotices((items) => items.map((item) => ({ ...item, unread: false })));
    return (
        <GymLayout title="Notifications">
            <PageHeading eyebrow={trainer ? 'Your coaching space' : 'Good things to know'} title="Notifications" description={`${unread ? `${unread} new updates` : 'You are all caught up'} · Stay in the loop with your training.`} action={unread > 0 ? <button type="button" onClick={markAllRead} className="rounded-xl border border-[#e8e3dd] bg-white px-4 py-2.5 text-sm font-semibold text-[#79756f] hover:text-[#34332f]">Mark all as read</button> : undefined} />
            <div className="grid gap-3">{notices.map(({ id, title, text, time, unread: isUnread, icon: Icon }) => <Panel key={id} className={`flex gap-4 ${isUnread ? 'border-[#d9c8b5] bg-[#fffdfa]' : ''}`}><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#f5f1ed] text-[#a67c52]"><Icon size={20} /></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="font-semibold">{title}</h2>{isUnread && <span className="size-2 rounded-full bg-[#c4866b]" />}</div><p className="mt-1 text-sm leading-6 text-[#79756f]">{text}</p><p className="mt-3 text-xs text-[#a49c92]">{time}</p></div>{isUnread && <button type="button" onClick={() => markRead(id)} aria-label={`Mark ${title} as read`} className="self-start rounded-lg p-2 text-[#918b82] hover:bg-[#f5f1ed] hover:text-[#71836a]"><Check size={17} /></button>}</Panel>)}</div>
        </GymLayout>
    );
}

function TrainerDashboard({ user }: { user: GymUser }) {
    return (
        <GymLayout title="Overview">
            <PageHeading eyebrow="Coach dashboard" title={`Welcome back, ${user.name.split(' ')[0]}.`} description="A quick view of your coaching week and the people you're supporting." action={<Link href="/trainer/assign" className="inline-flex items-center gap-2 rounded-xl bg-[#a67c52] px-4 py-3 text-sm font-semibold text-white hover:bg-[#8e6744]"><Plus size={16} /> Assign a workout</Link>} />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Active trainees" value="24" note="2 joined this month" icon={UsersRound} trend="up" /><StatCard label="Sessions this week" value="38" note="6 more than last week" icon={CalendarDays} trend="up" /><StatCard label="Completion rate" value="86%" note="Across assigned plans" icon={CircleCheck} trend="up" /><StatCard label="Pending check-ins" value="5" note="A quick note goes a long way" icon={Bell} /></div>
            <div className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_1fr]">
                <Panel><div className="flex items-start justify-between"><div><h2 className="font-semibold">Weekly session activity</h2><p className="mt-1 text-sm text-[#918b82]">Completed sessions · all trainees</p></div><span className="rounded-full bg-[#eff2ec] px-3 py-1.5 text-xs font-semibold text-[#71836a]">+12% this month</span></div><MiniBars values={[35, 52, 44, 77, 58, 91, 40]} labels={['M', 'T', 'W', 'T', 'F', 'S', 'S']} /></Panel>
                <Panel><div className="flex items-center justify-between"><div><h2 className="font-semibold">Plan completion</h2><p className="mt-1 text-sm text-[#918b82]">This week's average</p></div><TrendingUp size={20} className="text-[#91a38a]" /></div><div className="mt-6 flex items-center gap-5"><div className="grid size-28 shrink-0 place-items-center rounded-full border-[10px] border-[#e9efe5] border-t-[#a67c52]"><div className="text-center"><p className="text-2xl font-semibold">86%</p><p className="text-[10px] text-[#918b82]">complete</p></div></div><div className="flex-1 space-y-3"><ProgressLine label="Strength" value={91} /><ProgressLine label="Cardio" value={78} color="bg-[#c4866b]" /><ProgressLine label="Mobility" value={69} color="bg-[#91a38a]" /></div></div></Panel>
            </div>
            <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1fr]">
                <Panel><div className="flex items-center justify-between"><div><h2 className="font-semibold">Trainees to check in with</h2><p className="mt-1 text-sm text-[#918b82]">A little encouragement goes a long way</p></div><Link href="/trainer/trainees" className="text-xs font-semibold text-[#8e6744]">View all</Link></div><div className="mt-4 divide-y divide-[#f0ece7]">{trainees.slice(0, 3).map((trainee) => <div key={trainee.name} className="flex items-center gap-3 py-3"><span className="grid size-10 place-items-center rounded-full bg-[#f5f1ed] text-sm font-semibold text-[#8e6744]">{initials(trainee.name)}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{trainee.name}</p><p className="text-xs text-[#918b82]">{trainee.goal}</p></div><span className="text-xs text-[#918b82]">{trainee.lastSession}</span></div>)}</div></Panel>
                <Panel><div className="flex items-center justify-between"><div><h2 className="font-semibold">Recent activity</h2><p className="mt-1 text-sm text-[#918b82]">Across your training group</p></div><Activity size={19} className="text-[#a67c52]" /></div><div className="mt-4 space-y-4">{[['Maya completed Lower body strength', 'Today · 9:18 AM'], ['Jordan reached a 4-day streak', 'Yesterday · 4:25 PM'], ['Alex requested a plan review', 'Yesterday · 11:05 AM']].map(([text, time]) => <div key={text} className="flex gap-3"><span className="mt-1 size-2 shrink-0 rounded-full bg-[#91a38a]" /><div><p className="text-sm">{text}</p><p className="mt-1 text-xs text-[#a49c92]">{time}</p></div></div>)}</div></Panel>
            </div>
        </GymLayout>
    );
}

type Trainee = { name: string; email: string; goal: string; level: string; progress: number; lastSession: string };
const trainees: Trainee[] = [
    { name: 'Maya Chen', email: 'maya.chen@example.com', goal: 'Build strength', level: 'Intermediate', progress: 82, lastSession: 'Today' },
    { name: 'Jordan Lee', email: 'jordan.lee@example.com', goal: 'Improve endurance', level: 'Beginner', progress: 64, lastSession: 'Yesterday' },
    { name: 'Alex Morgan', email: 'alex.morgan@example.com', goal: 'Build a routine', level: 'Intermediate', progress: 46, lastSession: '3 days ago' },
    { name: 'Sam Rivera', email: 'sam.rivera@example.com', goal: 'Increase mobility', level: 'Beginner', progress: 91, lastSession: 'Today' },
    { name: 'Taylor Park', email: 'taylor.park@example.com', goal: 'Build strength', level: 'Advanced', progress: 73, lastSession: '2 days ago' },
];

function TraineesPage() {
    const [search, setSearch] = useState('');
    const [level, setLevel] = useState('All levels');
    const filteredTrainees = trainees.filter((trainee) => (level === 'All levels' || trainee.level === level) && `${trainee.name} ${trainee.email} ${trainee.goal}`.toLowerCase().includes(search.toLowerCase()));
    return (
        <GymLayout title="Trainees">
            <PageHeading eyebrow="Your coaching group" title="Trainees" description="Check in on progress, celebrate the wins, and keep everyone moving forward." action={<Link href="/trainer/assign" className="inline-flex items-center gap-2 rounded-xl bg-[#a67c52] px-4 py-3 text-sm font-semibold text-white hover:bg-[#8e6744]"><Plus size={16} /> Assign workout</Link>} />
            <div className="grid gap-4 sm:grid-cols-3"><StatCard label="Active trainees" value="24" note="Across 4 training plans" icon={UsersRound} /><StatCard label="Average progress" value="71%" note="Up 8% this month" icon={TrendingUp} trend="up" /><StatCard label="Check-ins due" value="5" note="Last activity over 3 days ago" icon={Clock3} /></div>
            <Panel className="mt-5 overflow-hidden p-0">
                <div className="flex flex-col gap-3 border-b border-[#eee9e3] p-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-semibold">Your people</h2><p className="mt-1 text-xs text-[#918b82]">{filteredTrainees.length} trainees shown</p></div><div className="flex flex-col gap-2 sm:flex-row"><label className="flex items-center gap-2 rounded-xl border border-[#e8e3dd] px-3 py-2 text-[#918b82]"><Search size={15} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search trainees" className="w-full min-w-40 bg-transparent text-sm outline-none sm:w-48" /></label><select value={level} onChange={(event) => setLevel(event.target.value)} className="rounded-xl border border-[#e8e3dd] bg-white px-3 py-2 text-sm"><option>All levels</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></div></div>
                <div className="hidden grid-cols-[1.4fr_1fr_.8fr_1fr_auto] gap-4 bg-[#fbfaf8] px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#a49c92] md:grid"><span>Trainee</span><span>Goal</span><span>Level</span><span>Plan progress</span><span>Last session</span></div>
                {filteredTrainees.map((trainee) => <div key={trainee.email} className="grid gap-3 border-t border-[#f0ece7] px-4 py-4 md:grid-cols-[1.4fr_1fr_.8fr_1fr_auto] md:items-center md:gap-4 md:px-5"><div className="flex items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#f5f1ed] text-sm font-semibold text-[#8e6744]">{initials(trainee.name)}</span><div className="min-w-0"><p className="truncate text-sm font-semibold">{trainee.name}</p><p className="truncate text-xs text-[#918b82]">{trainee.email}</p></div></div><p className="text-sm text-[#79756f]">{trainee.goal}</p><span className="w-fit rounded-full bg-[#f5f1ed] px-2.5 py-1 text-xs text-[#79756f]">{trainee.level}</span><div><ProgressLine label="" value={trainee.progress} /></div><div className="flex items-center justify-between gap-3 md:justify-end"><span className="text-xs text-[#918b82]">{trainee.lastSession}</span><Link href="/trainer/assign" className="inline-flex items-center gap-1 text-xs font-semibold text-[#8e6744]">Assign <ChevronRight size={14} /></Link></div></div>)}
            </Panel>
        </GymLayout>
    );
}

function AssignmentPage() {
    const [assigned, setAssigned] = useState(false);
    const [trainee, setTrainee] = useState('');
    const [workout, setWorkout] = useState('');
    const [date, setDate] = useState('');
    const canAssign = Boolean(trainee && workout);
    return (
        <GymLayout title="Assign a plan">
            <PageHeading eyebrow="Personalized coaching" title="Assign a workout" description="Choose a trainee and a session to keep their training moving forward." />
            <div className="grid items-start gap-5 xl:grid-cols-[1fr_.8fr]">
                <Panel>
                    <div className="mb-6 flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-[#f5f1ed] text-[#a67c52]"><CalendarDays size={20} /></span><div><h2 className="font-semibold">New assignment</h2><p className="text-sm text-[#918b82]">A good plan meets people where they are.</p></div></div>
                    <form className="space-y-5" onSubmit={(event) => { event.preventDefault(); setAssigned(true); }}>
                        <div><label className="mb-2 block text-sm font-medium">Trainee</label><select required value={trainee} onChange={(event) => { setTrainee(event.target.value); setAssigned(false); }} className="w-full rounded-xl border border-[#e8e3dd] bg-white px-3.5 py-3 text-sm"><option value="">Choose a trainee</option>{trainees.map((person) => <option key={person.email} value={person.name}>{person.name} · {person.level}</option>)}</select></div>
                        <div><label className="mb-2 block text-sm font-medium">Workout plan</label><select required value={workout} onChange={(event) => { setWorkout(event.target.value); setAssigned(false); }} className="w-full rounded-xl border border-[#e8e3dd] bg-white px-3.5 py-3 text-sm"><option value="">Choose a workout</option>{workoutList.map((plan) => <option key={plan.name} value={plan.name}>{plan.name} · {plan.duration}</option>)}</select></div>
                        <div><label className="mb-2 block text-sm font-medium">Schedule for <span className="font-normal text-[#918b82]">(optional)</span></label><input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="w-full rounded-xl border border-[#e8e3dd] bg-white px-3.5 py-3 text-sm" /></div>
                        {assigned && <p className="flex items-center gap-2 rounded-xl bg-[#eff2ec] p-3 text-sm text-[#71836a]"><CircleCheck size={17} /> Assignment prepared for {trainee}.</p>}
                        <button type="submit" disabled={!canAssign} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#a67c52] px-4 py-3 text-sm font-semibold text-white hover:bg-[#8e6744] disabled:cursor-not-allowed disabled:opacity-50"><Check size={16} /> Assign workout</button>
                    </form>
                </Panel>
                <Panel><h2 className="font-semibold">A thoughtful assignment</h2><p className="mt-2 text-sm leading-6 text-[#79756f]">Choose a session that fits your trainee's current level and goals. A clear plan helps make the next step feel achievable.</p><div className="mt-5 space-y-4">{[['Start with their goal', 'Pick a focus that supports what they’re working toward.'], ['Keep it realistic', 'Leave room for recovery and the rest of their week.'], ['Check in afterward', 'A quick note helps you learn what worked.']].map(([title, text], index) => <div key={title} className="flex gap-3"><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#f5f1ed] text-xs font-semibold text-[#a67c52]">{index + 1}</span><div><h3 className="text-sm font-semibold">{title}</h3><p className="mt-1 text-xs leading-5 text-[#918b82]">{text}</p></div></div>)}</div></Panel>
            </div>
        </GymLayout>
    );
}

function TrainerWorkoutsPage() {
    const [items, setItems] = useState(workoutList);
    const [type, setType] = useState('All');
    const [name, setName] = useState('');
    const [focus, setFocus] = useState('Strength');
    const [message, setMessage] = useState('');
    const visible = items.filter((item) => type === 'All' || item.focus === type);
    function createWorkout(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!name.trim()) return;
        const workout: Workout = { name: name.trim(), focus, level: 'All levels', duration: '30 min', sessions: 'New plan', rating: 'New', color: '#e9efe5' };
        setItems((current) => [workout, ...current]);
        setName('');
        setMessage('Workout added to this view.');
    }
    return (
        <GymLayout title="Workout library">
            <PageHeading eyebrow="Plan with purpose" title="Workout library" description="Browse your session templates and prepare a workout for your trainees." />
            <div className="grid items-start gap-5 xl:grid-cols-[.75fr_1.25fr]">
                <Panel><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-[#f5f1ed] text-[#a67c52]"><Plus size={19} /></span><div><h2 className="font-semibold">Create a workout</h2><p className="text-xs text-[#918b82]">Add a template to your library</p></div></div><form onSubmit={createWorkout} className="mt-5 space-y-4"><Field label="Workout name" value={name} onChange={setName} /><div><label className="mb-2 block text-sm font-medium">Focus</label><select value={focus} onChange={(event) => setFocus(event.target.value)} className="w-full rounded-xl border border-[#e8e3dd] bg-white px-3.5 py-3 text-sm"><option>Strength</option><option>Cardio</option><option>Mobility</option><option>Core</option></select></div>{message && <p className="text-sm text-[#71836a]">{message}</p>}<button type="submit" className="w-full rounded-xl bg-[#a67c52] px-4 py-3 text-sm font-semibold text-white hover:bg-[#8e6744]">Add workout</button></form></Panel>
                <Panel className="p-0"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eee9e3] p-5"><div><h2 className="font-semibold">Session templates</h2><p className="mt-1 text-xs text-[#918b82]">{visible.length} workouts</p></div><select value={type} onChange={(event) => setType(event.target.value)} className="rounded-xl border border-[#e8e3dd] bg-white px-3 py-2 text-sm"><option>All</option><option>Strength</option><option>Cardio</option><option>Mobility</option><option>Core</option></select></div><div className="divide-y divide-[#f0ece7]">{visible.map((item) => <div key={`${item.name}-${item.focus}`} className="flex items-center gap-3 p-4 sm:p-5"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#f5f1ed] text-[#a67c52]"><Dumbbell size={18} /></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{item.name}</p><p className="mt-1 text-xs text-[#918b82]">{item.focus} · {item.level} · {item.duration}</p></div><Link href="/trainer/assign" className="rounded-lg px-3 py-2 text-xs font-semibold text-[#8e6744] hover:bg-[#f5f1ed]">Assign</Link><button type="button" aria-label={`Remove ${item.name}`} onClick={() => setItems((current) => current.filter((candidate) => candidate !== item))} className="rounded-lg p-2 text-[#a49c92] hover:bg-[#f8eeec] hover:text-[#c85a54]"><X size={16} /></button></div>)}</div></Panel>
            </div>
        </GymLayout>
    );
}

function TrainerProfilePage({ user }: { user: GymUser }) {
    const { data, setData, patch, processing, errors, recentlySuccessful } = useForm({
        name: user.name ?? '',
        email: user.email ?? '',
        phone: user.phone ?? '',
        location: user.location ?? '',
        specialization: user.specialization ?? '',
        certification: user.certification ?? '',
        experience_years: user.experience_years?.toString() ?? '',
    });
    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        patch('/settings/profile');
    }
    return (
        <GymLayout title="My profile">
            <PageHeading eyebrow="Your coaching profile" title="Professional profile" description="Keep your contact information and coaching experience current." />
            <div className="grid items-start gap-5 xl:grid-cols-[.7fr_1.3fr]">
                <Panel className="text-center"><div className="mx-auto grid size-20 place-items-center rounded-full bg-[#e9ded1] text-2xl font-semibold text-[#8e6744]">{initials(user.name)}</div><h2 className="mt-4 text-xl font-semibold">{data.name}</h2><p className="mt-1 text-sm text-[#918b82]">Gym coach</p><div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#71836a]"><ShieldCheck size={15} /> Coaching profile</div></Panel>
                <Panel><div className="mb-6"><h2 className="text-lg font-semibold">Professional details</h2><p className="mt-1 text-sm text-[#918b82]">Your training group can learn more about your experience.</p></div><form onSubmit={submit} className="grid gap-5 sm:grid-cols-2"><Field label="Full name" value={data.name} onChange={(value) => setData('name', value)} error={errors.name} /><Field label="Email address" type="email" value={data.email} onChange={(value) => setData('email', value)} error={errors.email} /><Field label="Phone number" value={data.phone} onChange={(value) => setData('phone', value)} error={errors.phone} /><Field label="Location" value={data.location} onChange={(value) => setData('location', value)} error={errors.location} /><Field label="Specialization" value={data.specialization} onChange={(value) => setData('specialization', value)} error={errors.specialization} /><Field label="Certification" value={data.certification} onChange={(value) => setData('certification', value)} error={errors.certification} /><Field label="Years of experience" type="number" value={data.experience_years} onChange={(value) => setData('experience_years', value)} error={errors.experience_years} /><div className="flex items-center justify-between gap-3 sm:col-span-2"><p className="text-sm text-[#71836a]">{recentlySuccessful ? 'Your changes have been saved.' : ''}</p><button type="submit" disabled={processing} className="rounded-xl bg-[#a67c52] px-5 py-3 text-sm font-semibold text-white hover:bg-[#8e6744] disabled:opacity-60">{processing ? 'Saving…' : 'Save profile'}</button></div></form></Panel>
            </div>
        </GymLayout>
    );
}

export default function GymPage({ section }: { section: string }) {
    const { auth } = usePage<GymPageProps>().props;
    const user = auth.user;
    const pageBySection: Record<string, ReactNode> = {
        dashboard: <MemberDashboard user={user} />,
        workouts: <WorkoutsPage />,
        profile: <ProfilePage user={user} />,
        notifications: <NotificationsPage />,
        'trainer-dashboard': <TrainerDashboard user={user} />,
        trainees: <TraineesPage />,
        assignment: <AssignmentPage />,
        'trainer-workouts': <TrainerWorkoutsPage />,
        'trainer-profile': <TrainerProfilePage user={user} />,
        'trainer-notifications': <NotificationsPage trainer />,
    };

    return pageBySection[section] ?? <GymLayout title="Not found"><Panel><h1 className="font-semibold">This page isn't available.</h1><Link href="/dashboard" className="mt-3 inline-flex items-center gap-2 text-sm text-[#8e6744]">Return to your overview <ArrowRight size={15} /></Link></Panel></GymLayout>;
}
