import { Head, Link } from "@inertiajs/react";
import {
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    BuildingStorefrontIcon,
    MapPinIcon,
    BriefcaseIcon,
    CalendarIcon,
    PlusIcon,
    DocumentCheckIcon
} from "@heroicons/react/24/outline";

export default function Applications({ applications }) {
    const statusConfig = {
        pending: {
            text: "На рассмотрении",
            badgeClass: "bg-amber-50 text-amber-700 border-amber-200/60",
            icon: ClockIcon,
            iconClass: "text-amber-500",
        },
        approved: {
            text: "Одобрена",
            badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
            icon: CheckCircleIcon,
            iconClass: "text-emerald-500",
        },
        rejected: {
            text: "Отклонена",
            badgeClass: "bg-rose-50 text-rose-700 border-rose-200/60",
            icon: XCircleIcon,
            iconClass: "text-rose-500",
        },
    };

    return (
        <>
            <Head title="Мои заявки" />

            <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl">

                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-6">

                        <div>
                            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-950">
                                Мои заявки
                            </h1>
                            <p className="mt-1.5 text-sm text-slate-600">
                                Отслеживайте статус ваших запросов
                            </p>
                        </div>

                        <Link
                            href="/employee/branches"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-95"
                        >
                            <PlusIcon className="h-5 w-5" />
                            <span>Найти филиал</span>
                        </Link>
                    </div>

                    {applications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-4">
                                <DocumentCheckIcon className="h-8 w-8" />
                            </div>
                            <h2 className="text-xl font-extrabold text-slate-900">
                                У вас пока нет заявок
                            </h2>
                            <p className="mt-2 max-w-md text-sm text-slate-500">
                                Вы еще не отправляли запросы на работу. Найдите подходящий ресторан или кафе и подайте заявку в пару кликов.
                            </p>
                            <Link
                                href="/employee/branches"
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow transition hover:bg-slate-800"
                            >
                                Перейти к поиску филиалов
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-5">
                            {applications.map((application) => {
                                const config = statusConfig[application.status] || statusConfig.pending;
                                const StatusIcon = config.icon;

                                return (
                                    <div
                                        key={application.id}
                                        className="group rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-200 hover:border-slate-300 hover:shadow-md"
                                    >
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                                            <div className="space-y-3">
                                                <div>
                                                    <div className="flex items-center gap-2 text-indigo-600">
                                                        <BuildingStorefrontIcon className="h-5 w-5 shrink-0" />
                                                        <span className="text-xs font-bold uppercase tracking-wider">
                                                            {application.branch?.venue?.name || "Заведение"}
                                                        </span>
                                                    </div>
                                                    <h2 className="mt-1 text-2xl font-extrabold text-slate-950">
                                                        {application.branch?.name || "Филиал"}
                                                    </h2>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-slate-600">
                                                    <div className="flex items-center gap-1.5 font-semibold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg">
                                                        <BriefcaseIcon className="h-4 w-4 text-slate-500" />
                                                        <span>{application.position}</span>
                                                    </div>

                                                    {application.branch?.address && (
                                                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                                            <MapPinIcon className="h-4 w-4 text-slate-400" />
                                                            <span>{application.branch.address}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div
                                                className={`inline-flex items-center gap-2 self-start rounded-full border px-4 py-1.5 text-xs font-extrabold ${config.badgeClass}`}
                                            >
                                                <StatusIcon className={`h-4 w-4 ${config.iconClass}`} />
                                                <span>{config.text}</span>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-medium text-slate-400">
                                            <div className="flex items-center gap-1.5">
                                                <CalendarIcon className="h-4 w-4 text-slate-400" />
                                                <span>
                                                    Отправлено:{" "}
                                                    <strong className="text-slate-600">
                                                        {new Date(application.created_at).toLocaleDateString("ru-RU", {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric"
                                                        })}
                                                    </strong>
                                                </span>
                                            </div>

                                            <span className="text-slate-300">#ID-{application.id}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}
