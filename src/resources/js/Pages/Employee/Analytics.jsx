import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

import {
    ArrowLeftIcon,
    CalendarIcon,
    BanknotesIcon,
    SparklesIcon,
    HashtagIcon,
    TrophyIcon,
    UserIcon,
    BuildingOfficeIcon,
    ChatBubbleBottomCenterTextIcon,
    FunnelIcon,
} from "@heroicons/react/24/outline";
import {ChartBarIcon, GiftIcon} from "@heroicons/react/16/solid";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler
);

export default function Analytics({
                                      from,
                                      to,
                                      income = 0,
                                      count = 0,
                                      average = 0,
                                      max = 0,
                                      tips = [],
                                      chart = { labels: [], values: [] },
                                  }) {
    const [dateFrom, setDateFrom] = useState(from || "");
    const [dateTo, setDateTo] = useState(to || "");

    function filter(customFrom = dateFrom, customTo = dateTo) {
        router.get(
            "/employee/analytics",
            {
                from: customFrom,
                to: customTo,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    }

    const setPreset = (type) => {
        const today = new Date();
        const formatDate = (d) => d.toISOString().split("T")[0];

        let start = new Date();
        let end = new Date();

        if (type === "today") {
        } else if (type === "7days") {
            start.setDate(today.getDate() - 7);
        } else if (type === "30days") {
            start.setDate(today.getDate() - 30);
        } else if (type === "month") {
            start = new Date(today.getFullYear(), today.getMonth(), 1);
        }

        const f = formatDate(start);
        const t = formatDate(end);
        setDateFrom(f);
        setDateTo(t);
        filter(f, t);
    };

    const chartData = {
        labels: chart.labels,
        datasets: [
            {
                label: "Доход (₸)",
                data: chart.values,
                fill: true,
                borderColor: "#6366f1",
                borderWidth: 3,
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, "rgba(99, 102, 241, 0.25)");
                    gradient.addColorStop(1, "rgba(99, 102, 241, 0.0)");
                    return gradient;
                },
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: "#6366f1",
                pointBorderColor: "#ffffff",
                pointBorderWidth: 2,
                pointHoverRadius: 7,
                pointHoverBorderWidth: 3,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: "#0f172a",
                titleFont: { size: 13, weight: "bold" },
                bodyFont: { size: 14 },
                padding: 12,
                cornerRadius: 12,
                displayColors: false,
                callbacks: {
                    label: (context) => `₸ ${Number(context.parsed.y).toLocaleString("ru-RU")}`,
                },
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: "#94a3b8", font: { size: 12 } },
            },
            y: {
                beginAtZero: true,
                grid: { color: "#f1f5f9" },
                ticks: {
                    color: "#94a3b8",
                    font: { size: 12 },
                    callback: (value) => `₸ ${value.toLocaleString()}`,
                },
            },
        },
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

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
                                Аналитика
                            </h1>
                        </div>
                        <p className="mt-2 text-slate-500">
                            Подробная статистика ваших доходов и полученных чаевых
                        </p>
                    </div>
                </div>

                <div className="mb-8 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50/50 px-3 py-2">
                                <CalendarIcon className="h-5 w-5 text-slate-400" />
                                <span className="text-xs font-semibold uppercase text-slate-400">От</span>
                                <input
                                    type="date"
                                    value={dateFrom}
                                    onChange={(e) => setDateFrom(e.target.value)}
                                    className="bg-transparent text-sm font-semibold text-slate-900 focus:outline-none"
                                />
                            </div>

                            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50/50 px-3 py-2">
                                <CalendarIcon className="h-5 w-5 text-slate-400" />
                                <span className="text-xs font-semibold uppercase text-slate-400">До</span>
                                <input
                                    type="date"
                                    value={dateTo}
                                    onChange={(e) => setDateTo(e.target.value)}
                                    className="bg-transparent text-sm font-semibold text-slate-900 focus:outline-none"
                                />
                            </div>

                            <button
                                onClick={() => filter()}
                                className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-95"
                            >
                                <FunnelIcon className="h-4 w-4" />
                                Применить
                            </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-4 lg:border-t-0 lg:pt-0">
                            <button
                                onClick={() => setPreset("today")}
                                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                            >
                                Сегодня
                            </button>
                            <button
                                onClick={() => setPreset("7days")}
                                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                            >
                                7 дней
                            </button>
                            <button
                                onClick={() => setPreset("30days")}
                                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                            >
                                30 дней
                            </button>
                            <button
                                onClick={() => setPreset("month")}
                                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                            >
                                Этот месяц
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-500">Общий доход</span>
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                                <BanknotesIcon className="h-5 w-5" />
                            </div>
                        </div>
                        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-indigo-600">
                            ₸ {Number(income).toLocaleString("ru-RU")}
                        </h2>
                    </div>

                    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-500">Всего чаевых</span>
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                <GiftIcon className="h-5 w-5" />
                            </div>
                        </div>
                        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
                            {count}
                        </h2>
                    </div>

                    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-500">Средний чек</span>
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                                <ChartBarIcon className="h-5 w-5" />
                            </div>
                        </div>
                        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-emerald-600">
                            ₸ {Number(average).toLocaleString("ru-RU")}
                        </h2>
                    </div>

                    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-500">Рекордные чаевые</span>
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                                <TrophyIcon className="h-5 w-5" />
                            </div>
                        </div>
                        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-amber-600">
                            ₸ {Number(max ?? 0).toLocaleString("ru-RU")}
                        </h2>
                    </div>
                </div>

                <div className="mb-10 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-slate-950">Динамика доходов</h2>
                            <p className="text-sm text-slate-500">График выплат за выбранный период</p>
                        </div>
                    </div>
                    <div className="h-72 w-full">
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </div>

                <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
                    <div className="border-b border-slate-100 px-6 py-5">
                        <h2 className="text-xl font-bold text-slate-950">История чаевых</h2>
                    </div>

                    {tips.length === 0 ? (
                        <div className="p-12 text-center text-slate-500">
                            <p className="text-base font-medium">За выбранный период чаевых нет</p>
                            <p className="mt-1 text-sm text-slate-400">Попробуйте выбрать другой диапазон дат.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                <tr className="bg-slate-50/70 text-xs uppercase tracking-wider text-slate-400">
                                    <th className="px-6 py-4 font-semibold">Сумма</th>
                                    <th className="px-6 py-4 font-semibold">Гость</th>
                                    <th className="px-6 py-4 font-semibold">Филиал</th>
                                    <th className="px-6 py-4 font-semibold">Комментарий</th>
                                    <th className="px-6 py-4 font-semibold">Дата</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                {tips.map((tip) => (
                                    <tr key={tip.id} className="transition hover:bg-slate-50/60">
                                        <td className="whitespace-nowrap px-6 py-4 font-bold text-emerald-600">
                                            +₸ {Number(tip.employee_amount).toLocaleString("ru-RU")}
                                        </td>

                                        <td className="whitespace-nowrap px-6 py-4 text-slate-900 font-medium">
                                            <div className="flex items-center gap-2">
                                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                                                    <UserIcon className="h-4 w-4" />
                                                </div>
                                                {tip.guest_name || "Анонимный гость"}
                                            </div>
                                        </td>

                                        <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                                            <div className="flex items-center gap-1.5">
                                                <BuildingOfficeIcon className="h-4 w-4 text-slate-400" />
                                                {tip.branch?.name || "—"}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-slate-500 max-w-xs truncate">
                                            {tip.comment ? (
                                                <span className="italic text-slate-600">«{tip.comment}»</span>
                                            ) : (
                                                <span className="text-slate-300">—</span>
                                            )}
                                        </td>

                                        <td className="whitespace-nowrap px-6 py-4 text-slate-400">
                                            {new Date(tip.paid_at).toLocaleDateString("ru-RU", {
                                                day: "numeric",
                                                month: "short",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
