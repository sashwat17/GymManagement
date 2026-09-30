import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Dumbbell, HeartPulse, MoveUpRight } from 'lucide-react';

const highlights = [
    { icon: Dumbbell, title: 'Training that fits you', text: 'Follow a plan made for your level, goals, and routine.' },
    { icon: HeartPulse, title: 'Progress you can feel', text: 'Build healthy habits and see your consistency add up.' },
    { icon: MoveUpRight, title: 'A coach in your corner', text: 'Stay connected with a trainer who keeps you moving forward.' },
];

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <main className="min-h-screen overflow-hidden bg-[#faf8f5] text-[#34332f]">
                <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
                    <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight">
                        <span className="grid size-10 place-items-center rounded-xl bg-[#a67c52] text-white"><Dumbbell size={20} /></span>
                        <span className="sr-only">Gym management</span>
                    </Link>
                    <nav className="flex items-center gap-3">
                        <Link href="/login" className="rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-white">Log in</Link>
                        <Link href="/register" className="rounded-xl bg-[#a67c52] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#8e6744]">Get started</Link>
                    </nav>
                </header>

                <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-12 lg:grid-cols-[1.02fr_.98fr] lg:px-10 lg:pb-28 lg:pt-16">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#e8e3dd] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[.17em] text-[#8e6744]">
                            <span className="size-2 rounded-full bg-[#91a38a]" /> Your stronger starts here
                        </span>
                        <h1 className="mt-7 text-5xl leading-[1.06] font-semibold tracking-[-.055em] sm:text-6xl lg:text-7xl">
                            Make space for <span className="font-serif font-normal italic text-[#a67c52]">your</span> kind of strong.
                        </h1>
                        <p className="mt-6 max-w-xl text-lg leading-8 text-[#79756f]">
                            A thoughtful training experience for real life. Find your rhythm, follow a plan, and celebrate every step forward.
                        </p>
                        <div className="mt-9 flex flex-wrap gap-3">
                            <Link href="/register" className="inline-flex items-center gap-3 rounded-xl bg-[#a67c52] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#a67c52]/15 transition hover:-translate-y-0.5 hover:bg-[#8e6744]">
                                Start your journey <ArrowRight size={17} />
                            </Link>
                            <Link href="/login" className="rounded-xl border border-[#e8e3dd] bg-white px-6 py-3.5 font-semibold transition hover:border-[#a67c52]">I already have an account</Link>
                        </div>
                        <p className="mt-5 text-sm text-[#918b82]">A welcoming gym community, at your pace.</p>
                    </div>

                    <div className="relative mx-auto w-full max-w-xl">
                        <div className="absolute -inset-5 rounded-[2rem] bg-[#efe8df]" />
                        <div className="relative overflow-hidden rounded-[1.7rem] bg-[#d8c5af]">
                            <img
                                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1300&q=85"
                                alt="Sunlit gym with strength training equipment"
                                className="h-[420px] w-full object-cover sm:h-[520px]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#27221e]/75 via-transparent to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
                                <p className="text-xs font-semibold uppercase tracking-[.2em] text-white/75">Your next chapter</p>
                                <p className="mt-3 max-w-sm font-serif text-3xl leading-tight sm:text-4xl">Small steps. Strong habits. A healthier you.</p>
                                <div className="mt-6 flex items-center gap-3 text-sm text-white/80">
                                    <span className="flex -space-x-2">
                                        {['#c99f7d', '#8fa68a', '#b77d65'].map((color) => <span key={color} className="size-8 rounded-full border-2 border-white/80" style={{ backgroundColor: color }} />)}
                                    </span>
                                    A community that cheers you on
                                </div>
                            </div>
                        </div>
                        <div className="absolute -left-4 top-12 hidden rounded-2xl border border-white/70 bg-white/90 p-4 shadow-xl backdrop-blur sm:block">
                            <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-[#eff2ec] text-[#778c70]"><HeartPulse size={20} /></span><div><p className="text-sm font-semibold">Progress, not perfection</p><p className="text-xs text-[#918b82]">One day at a time</p></div></div>
                        </div>
                    </div>
                </section>

                <section className="border-t border-[#e8e3dd] bg-white/70">
                    <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:grid-cols-3 lg:px-10 lg:py-16">
                        {highlights.map(({ icon: Icon, title, text }) => (
                            <article key={title} className="flex gap-4">
                                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#f5f1ed] text-[#a67c52]"><Icon size={21} /></span>
                                <div><h2 className="font-semibold">{title}</h2><p className="mt-1.5 text-sm leading-6 text-[#79756f]">{text}</p></div>
                            </article>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}
