import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import {
    ArrowRightIcon,
    BellIcon,
    BuildingOffice2Icon,
    ChartBarIcon, ChevronDownIcon,
    DocumentCheckIcon,
    MagnifyingGlassIcon, QrCodeIcon
} from "@heroicons/react/16/solid";

export default function Dashboard({ user, availableBalance, pendingBalance }){
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const cards = [
        {
            title: "Аналитика",
            icon: ChartBarIcon,
            description: "Доходы, графики и история чаевых",
            href: "/employee/analytics"
        },
        {
            title: "Мои заведения",
            icon: BuildingOffice2Icon,
            description: "Заведения где вы работаете",
            href: "/employee/my-branches"
        },
        {
            title: "Заявки",
            icon: DocumentCheckIcon,
            description: "Посмотреть отправленные заявки",
            href: "/employee/applications",
        },
        {
            title: "Найти заведение",
            icon: MagnifyingGlassIcon,
            description: "Подать заявку в заведение",
            href: "/employee/branches"
        },
        {
            title: "Мой QR-код",
            icon: QrCodeIcon,
            description: "Получайте чаевые по персональному QR",
            href: "/employee/my-qr"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">

            <header className="sticky top-0 z-10 bg-white shadow-sm">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center">
                        <span className="text-xl font-extrabold text-indigo-700">eTips</span>
                    </div>

                    <div className="relative">
                        <button onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <img
                                src={
                                    user?.avatar_path
                                        ? `/storage/${user.avatar_path}`
                                        : `https://api.dicebear.com/8.x/initials/svg?seed=${user?.first_name || 'User'}`
                                }
                                alt="Avatar"
                                className="h-8 w-8 rounded-full"
                            />
                            <span className="text-sm font-medium">{user.first_name}</span>
                            <ChevronDownIcon className="h-4 w-4 text-slate-500" />
                        </button>

                        {isProfileOpen &&(
                            <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl border bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5">
                                <Link href="/profile" className="block rounded-lg px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Профиль</Link>
                                <button onClick={() => router.post('/logout')} className="block w-full text-left rounded-lg px-4 py-2 text-sm text-rose-700 hover:bg-rose-50">Выход</button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

                <div className="mb-10 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-indigo-600">Главная панель</p>
                        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-950">
                            Добро пожаловать, {user.first_name}
                        </h1>
                    </div>
                    <Link href="/employee/my-qr" className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-5 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100 hover:text-indigo-800">
                        <QrCodeIcon className="h-5 w-5" />
                            Мой QR-код
                    </Link>
                </div>

                <div className="relative mb-10 overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/20 sm:p-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-700/50 to-purple-800/30"></div>

                    <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-indigo-100/70">Доступно к выводу</p>
                            <h2 className="mt-2 text-5xl font-extrabold tracking-tighter">₸ {Number(availableBalance || 0).toLocaleString()}</h2>
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row md:items-end">
                            <div className="flex flex-1 items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 sm:flex-auto">
                                <DocumentCheckIcon className="h-8 w-8 text-indigo-200" />
                                <div>
                                    <p className="text-xs text-indigo-100/70">В обработке</p>
                                    <p className="mt-1 text-xl font-bold">₸ {Number(pendingBalance || 0).toLocaleString()}</p>
                                </div>
                            </div>
                            <Link href="/employee/withdraw" className="group inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-indigo-950 shadow transition hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950">
                                Вывести средства
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-950">
                        Быстрый доступ
                    </h2>
                    <p className="text-slate-600">Основные разделы вашей работы</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {cards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <Link
                                key={card.title}
                                href={card.href}
                                className="group flex flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-xl"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-950">
                                            {card.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-slate-600 transition group-hover:text-slate-800">
                                            {card.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-auto flex items-center justify-end pt-5 font-semibold text-indigo-700 transition">
                                    <span className="text-sm">Открыть раздел</span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
)
}
