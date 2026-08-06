import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import {
    ArrowLeftIcon,
    MagnifyingGlassIcon,
    BuildingOfficeIcon,
    MapPinIcon,
    PaperAirplaneIcon,
    CheckIcon,
    XMarkIcon,
    SparklesIcon,
    FunnelIcon,
} from "@heroicons/react/24/outline";

export default function Branches({ venues = [], venue = null, pendingApplications = [] }) {
    const [search, setSearch] = useState("");
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [position, setPosition] = useState("Официант");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const pendingBranchIds = pendingApplications.map((app) => app.branch_id);

    const handleApply = (branchId) => {
        router.post(`/employee/branches/${branchId}/apply`);
    };

    const handleSubmitApplication = (e) => {
        e.preventDefault();
        if (!selectedBranch) return;

        setIsSubmitting(true);

        router.post(
            `/employee/branches/${selectedBranch.id}/apply`,
            {
                position: position,
            },
            {
                onSuccess: () => {
                    setSelectedBranch(null);
                    setPosition("Официант");
                },
                onFinish: () => setIsSubmitting(false),
            }
        );
    };

    if (venue) {

        return (
            <div className="min-h-screen bg-slate-50 text-slate-900">
                <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <Link
                            href="/employee/branches"
                            className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
                        >
                            ← Назад
                        </Link>
                        <h1 className="mt-4 text-3xl font-bold text-slate-900">
                            {venue.name}
                        </h1>
                        <p className="mt-2 text-slate-500">
                            Выберите филиал, к которому хотите присоединиться.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {venue.branches.map((branch) => {
                            const isPending = pendingBranchIds.includes(branch.id);
                            return (
                                <div
                                    key={branch.id}
                                    className="group flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
                                >
                                    <div>
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                                                <BuildingOfficeIcon className="h-6 w-6" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="truncate text-lg font-bold text-slate-950">
                                                    {branch.name}
                                                </h3>
                                                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                                                    Филиал
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-start gap-2 text-sm text-slate-500">
                                            <MapPinIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" />
                                            <span className="line-clamp-2">
                                                {branch.address || "Адрес не указан"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-slate-100">
                                        {isPending ? (
                                            <button
                                                disabled
                                                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-100 py-3 text-sm font-semibold text-slate-500 cursor-not-allowed"
                                            >
                                                <CheckIcon className="h-4 w-4 text-emerald-600" />
                                                Заявка отправлена
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => setSelectedBranch(branch)}
                                                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-98"
                                            >
                                                <PaperAirplaneIcon className="h-4 w-4" />
                                                Подать заявку
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {venue.branches.length === 0 && (
                        <div className="rounded-3xl border border-slate-200/80 bg-white p-12 text-center shadow-sm">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                                <MagnifyingGlassIcon className="h-8 w-8" />
                            </div>
                            <h3 className="mt-4 text-xl font-bold text-slate-950">
                                Филиалы не найдены
                            </h3>
                        </div>
                    )}
                </div>

                {selectedBranch && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm animate-fade-in">
                        <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl transition-all">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <h3 className="text-xl font-bold text-slate-950">
                                    Заявка на работу
                                </h3>
                                <button
                                    onClick={() => setSelectedBranch(null)}
                                    className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmitApplication} className="mt-6 space-y-4">
                                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/60">
                                    <p className="text-xs font-semibold text-slate-400 uppercase">
                                        Филиал
                                    </p>
                                    <p className="mt-1 text-base font-bold text-slate-900">
                                        {selectedBranch.name}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {selectedBranch.address}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                        Ваша должность
                                    </label>
                                    <select
                                        value={position}
                                        onChange={(e) => setPosition(e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    >
                                        <option value="Официант">Официант</option>
                                        <option value="Бармен">Бармен</option>
                                        <option value="Раннер">Раннер</option>
                                        <option value="Администратор">Администратор</option>
                                        <option value="Кассир">Кассир</option>
                                    </select>
                                </div>

                                <div className="mt-6 flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedBranch(null)}
                                        className="flex-1 rounded-xl border border-slate-200 bg-white py-3 font-semibold text-slate-700 hover:bg-slate-50"
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 disabled:opacity-50"
                                    >
                                        {isSubmitting ? "Отправка..." : "Отправить"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    const filteredVenues = venues.filter((venue) => {
        const matchesSearch =
            venue.name.toLowerCase().includes(search.toLowerCase());
        return matchesSearch;
    });

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <Link
                                href="/employee"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-100 hover:text-slate-900"
                                title="Назад"
                            >
                                <ArrowLeftIcon className="h-5 w-5" />
                            </Link>
                            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
                                Поиск заведения
                            </h1>
                        </div>
                        <p className="mt-2 text-slate-500">
                            Найдите ресторан или кафе и отправьте заявку на привязку профиля
                        </p>
                    </div>
                </div>

                <div className="mb-8">
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Поиск по названию..."
                            className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-10 text-base placeholder-slate-400 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                </div>

                {filteredVenues.length === 0 ? (
                    <div className="rounded-3xl border border-slate-200/80 bg-white p-12 text-center shadow-sm">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                            <MagnifyingGlassIcon className="h-8 w-8" />
                        </div>
                        <h3 className="mt-4 text-xl font-bold text-slate-950">
                            Заведения не найдены
                        </h3>
                        <p className="mt-1 text-slate-500">
                            Попробуйте изменить поисковый запрос.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredVenues.map((venue) => (
                            <div
                                key={venue.id}
                                className="group flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
                            >
                                <div>
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                                            <BuildingOfficeIcon className="h-6 w-6" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="truncate text-lg font-bold text-slate-950">
                                                {venue.name}
                                            </h3>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                                                {venue.branches_count} филиалов
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-slate-100">
                                    <Link
                                        href={`/employee/branches/${venue.id}`}
                                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-98"
                                    >
                                        <PaperAirplaneIcon className="h-4 w-4" />
                                        Смотреть филиалы
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
