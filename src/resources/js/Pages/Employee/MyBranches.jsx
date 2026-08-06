import { Link } from "@inertiajs/react";
import {
    ArrowLeftIcon,
    BuildingOfficeIcon,
    MapPinIcon,
    BriefcaseIcon,
    CalendarIcon,
    PlusIcon,
    CheckCircleIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";

export default function MyBranches({ branches = [] }) {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">

                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <Link
                                href="/employee"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 shadow-sm"
                                title="Назад"
                            >
                                <ArrowLeftIcon className="h-5 w-5" />
                            </Link>
                            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
                                Мои филиалы
                            </h1>
                        </div>
                        <p className="mt-2 text-slate-500">
                            Список заведений, в которых вы зарегистрированы
                        </p>
                    </div>

                    <Link
                        href="/employee/branches"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-95"
                    >
                        <PlusIcon className="h-5 w-5" />
                        Найти ресторан
                    </Link>
                </div>

                {branches.length === 0 ? (

                    <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-12 text-center shadow-sm">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600">
                            <BuildingOfficeIcon className="h-10 w-10" />
                        </div>

                        <h2 className="mt-6 text-2xl font-bold text-slate-950">
                            Вы пока нигде не работаете
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-slate-500">
                            Чтобы начать получать чаевые, найдите ресторан или кафе в каталоге и отправьте заявку на привязку.
                        </p>

                        <Link
                            href="/employee/branches"
                            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-8 py-4 font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/30"
                        >
                            <PlusIcon className="h-5 w-5" />
                            Найти заведение
                        </Link>
                    </div>

                ) : (
                    <div className="grid gap-6 md:grid-cols-2">
                        {branches.map((branch) => {
                            const isActive = branch.pivot?.is_active;

                            return (
                                <div
                                    key={branch.id}
                                    className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
                                >
                                    <div>
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-start gap-3.5">
                                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                                                    <BuildingOfficeIcon className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <h2 className="text-xl font-bold text-slate-950">
                                                        {branch.name}
                                                    </h2>
                                                    <p className="flex items-center gap-1.5 text-sm font-medium text-slate-500 mt-0.5">
                                                        <MapPinIcon className="h-4 w-4 text-slate-400" />
                                                        {branch.venue?.name || "Основная сеть"}
                                                    </p>
                                                </div>
                                            </div>

                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                                                    isActive
                                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                                                        : "bg-rose-50 text-rose-700 border border-rose-200/60"
                                                }`}
                                            >
                                                <span className="relative flex h-2 w-2">
                                                    {isActive && (
                                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                                    )}
                                                    <span
                                                        className={`relative inline-flex h-2 w-2 rounded-full ${
                                                            isActive ? "bg-emerald-500" : "bg-rose-500"
                                                        }`}
                                                    ></span>
                                                </span>
                                                {isActive ? "Активен" : "Неактивен"}
                                            </span>
                                        </div>

                                        <div className="my-6 border-t border-slate-100" />

                                        <div className="space-y-3.5">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="flex items-center gap-2 text-slate-500">
                                                    <BriefcaseIcon className="h-4 w-4 text-slate-400" />
                                                    Должность
                                                </span>
                                                <span className="font-semibold text-slate-800">
                                                    {branch.pivot?.position || "Не указана"}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between text-sm">
                                                <span className="flex items-center gap-2 text-slate-500">
                                                    <CalendarIcon className="h-4 w-4 text-slate-400" />
                                                    Дата привязки
                                                </span>
                                                <span className="font-medium text-slate-700">
                                                    {branch.pivot?.joined_at
                                                        ? new Date(branch.pivot.joined_at).toLocaleDateString("ru-RU", {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                        })
                                                        : "—"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
