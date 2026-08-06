import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { ChevronDownIcon, CreditCardIcon, BanknotesIcon, ArrowLeftIcon } from "@heroicons/react/16/solid";

export default function Withdraw({ availableBalance, auth }) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const user = auth?.user;

    const {data, setData} = useForm({
        bank: "Kaspi",
        card_number: "",
        amount: "",
    });

    function withdraw(e) {
        e.preventDefault();
        alert("Вывод средств будет доступен после подключения платежной системы.");
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">

            <Head title="Вывод средств"/>


            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div
                    className="mb-10 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                        <Link
                            href="/employee"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-100 hover:text-slate-900"
                            title="Назад"
                        >
                            <ArrowLeftIcon className="h-5 w-5" />
                        </Link>
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
                            Вывод средств
                        </h1>
                    </div>
                </div>

                <div className="mx-auto max-w-2xl">
                    <div className="mb-8 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div
                                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                                <BanknotesIcon className="h-7 w-7"/>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Доступно к выводу</p>
                                <h2 className="mt-1 text-4xl font-extrabold text-emerald-600">
                                    ₸ {Number(availableBalance || 0).toLocaleString()}
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                <CreditCardIcon className="h-5 w-5"/>
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-950">Данные карты</h2>
                                <p className="text-sm text-slate-500">Укажите реквизиты для перевода</p>
                            </div>
                        </div>

                        <form onSubmit={withdraw} className="space-y-6">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Банк
                                </label>
                                <select
                                    className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    value={data.bank}
                                    onChange={(e) => setData("bank", e.target.value)}
                                >
                                    <option>Kaspi</option>
                                    <option>Halyk</option>
                                    <option>Freedom Bank</option>
                                    <option>Jusan</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Номер карты
                                </label>
                                <input
                                    className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    placeholder="4400 1234 5678 9012"
                                    value={data.card_number}
                                    onChange={(e) => setData("card_number", e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Сумма
                                </label>
                                <input
                                    type="number"
                                    min="100"
                                    max={availableBalance}
                                    className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                    placeholder="Введите сумму"
                                    value={data.amount}
                                    onChange={(e) => setData("amount", e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setData("amount", availableBalance)}
                                    className="mt-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                                >
                                    Вывести всё
                                </button>
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-6 border border-slate-200/60">
                                <div className="flex justify-between text-slate-600">
                                    <span>Комиссия</span>
                                    <span>0 ₸</span>
                                </div>
                                <div className="mt-3 flex justify-between text-lg font-bold text-slate-900">
                                    <span>К получению</span>
                                    <span>₸ {Number(data.amount || 0).toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                className="w-full rounded-2xl bg-indigo-600 py-4 text-lg font-semibold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-98"
                            >
                                Запросить вывод
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
