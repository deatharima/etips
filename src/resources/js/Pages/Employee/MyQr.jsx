import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import {
    ArrowLeftIcon,
    ArrowPathIcon,
    PrinterIcon,
    ClipboardDocumentIcon,
    CheckIcon,
    QrCodeIcon,
} from "@heroicons/react/24/outline";

export default function MyQr({ employee, qr }) {
    const [copied, setCopied] = useState(false);
    const [isRegenerating, setIsRegenerating] = useState(false);

    const tipUrl = `${window.location.origin}/employee-tip/${employee.employee_qr_token}`;

    function handleRegenerate() {
        if (confirm("Вы уверены, что хотите обновить QR-код? Старый код и ссылка перестанут работать.")) {
            setIsRegenerating(true);
            router.post(
                "/employee/my-qr/regenerate",
                {},
                {
                    onFinish: () => setIsRegenerating(false),
                }
            );
        }
    }

    function handleCopy() {
        navigator.clipboard.writeText(tipUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div>

            <Head title="Мой QR-код" />

            <div className="min-h-screen bg-slate-50 text-slate-900">
                <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">

                    <div className="mb-6">
                        <Link
                            href="/employee"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-100 hover:text-slate-900"
                            title="Назад"
                        >
                            <ArrowLeftIcon className="h-5 w-5" />
                        </Link>
                    </div>

                    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xl shadow-slate-200/50">

                        <div className="text-center">
                            <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                                Мой QR-код
                            </h1>
                            <p className="mt-2 text-sm text-slate-500">
                                Покажите QR гостю или распечатайте его, чтобы получать чаевые на карту
                            </p>
                        </div>

                        <div className="mt-8 flex justify-center">
                            <div className="group relative rounded-3xl border border-slate-200/80 bg-gradient-to-b from-slate-50 to-white p-6 shadow-md transition duration-300 hover:shadow-xl">
                                <div
                                    className="h-56 w-56 [&>svg]:h-full [&>svg]:w-full"
                                    dangerouslySetInnerHTML={{ __html: qr }}
                                />
                                <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
                                    <QrCodeIcon className="h-4 w-4 text-indigo-600" />
                                    <span>Отсканируйте камерой</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Прямая ссылка
                                </span>
                                <button
                                    onClick={handleCopy}
                                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                                >
                                    {copied ? (
                                        <>
                                            <CheckIcon className="h-3.5 w-3.5 text-emerald-600" />
                                            <span className="text-emerald-600">Скопировано</span>
                                        </>
                                    ) : (
                                        <>
                                            <ClipboardDocumentIcon className="h-3.5 w-3.5" />
                                            <span>Скопировать</span>
                                        </>
                                    )}
                                </button>
                            </div>
                            <p className="mt-2 break-all text-sm font-semibold text-slate-900">
                                {tipUrl}
                            </p>
                        </div>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <button
                                onClick={() => window.print()}
                                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-98"
                            >
                                <PrinterIcon className="h-4 w-4" />
                                Распечатать
                            </button>

                            <button
                                onClick={handleRegenerate}
                                disabled={isRegenerating}
                                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 hover:text-slate-900 active:scale-98 disabled:opacity-50"
                            >
                                <ArrowPathIcon className={`h-4 w-4 ${isRegenerating ? "animate-spin" : ""}`} />
                                Обновить QR
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
