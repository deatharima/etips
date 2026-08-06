import { useForm } from "@inertiajs/react";

export default function Branch({ branch }) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: "",
        amount: "",
        guest_name: "",
        comment: "",
    });

    const quickAmounts = [500, 1000, 2000, 5000];

    function submit(e) {
        e.preventDefault();

        post(`/branch/${branch.qr_token}/tips`);
    }

    return (
        <div className="min-h-screen bg-slate-100 py-10 px-4">
            <div className="mx-auto max-w-xl rounded-2xl bg-white shadow-xl overflow-hidden">

                <div className="bg-indigo-600 px-8 py-8 text-white">
                    <h1 className="text-3xl font-bold">
                        {branch.name}
                    </h1>

                    <p className="mt-2 text-indigo-100">
                        {branch.address}
                    </p>

                    <div className="mt-5 flex gap-3 text-sm">

                        <div className="rounded-full bg-white/20 px-3 py-1">
                            Безналичные чаевые
                        </div>

                        <div className="rounded-full bg-white/20 px-3 py-1">
                            {branch.employees.length} сотрудников
                        </div>

                    </div>

                </div>

                <form
                    onSubmit={submit}
                    className="space-y-7 p-8"
                >
                    <div>
                        <label className="mb-3 block text-sm font-semibold text-slate-700">
                            Выберите сотрудника
                        </label>

                        <div className="space-y-3">
                            {branch.employees.map((employee) => (
                                <button
                                    type="button"
                                    key={employee.id}
                                    onClick={() => setData("user_id", employee.id)}
                                    className={`w-full rounded-xl border p-4 transition text-left ${
                                        Number(data.user_id) === employee.id
                                            ? "border-indigo-600 bg-indigo-50"
                                            : "border-slate-300 hover:border-indigo-500"
                                    }`}
                                >
                                    <div className="flex items-center gap-4">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-700">
                                            {employee.first_name[0]}
                                        </div>

                                        <div>
                                            <div className="font-semibold">
                                                {employee.first_name} {employee.last_name}
                                            </div>

                                            <div className="text-sm text-slate-500">
                                                {employee.pivot.position}
                                            </div>
                                        </div>

                                    </div>
                                </button>
                            ))}
                        </div>

                        {errors.user_id && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.user_id}
                            </p>
                        )}
                    </div>

                    <div>
                        <p className="mb-3 text-sm text-slate-500">
                            Популярные суммы
                        </p>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {quickAmounts.map((amount) => (
                                <button
                                    type="button"
                                    key={amount}
                                    onClick={() =>
                                        setData("amount", amount)
                                    }
                                    className={`rounded-xl border py-3 font-semibold transition ${
                                        Number(data.amount) === amount
                                            ? "border-indigo-600 bg-indigo-600 text-white"
                                            : "border-slate-300 bg-white hover:border-indigo-600 hover:text-indigo-600"
                                    }`}
                                >
                                    {amount} ₸
                                </button>
                            ))}
                        </div>

                        <input
                            type="number"
                            min="100"
                            placeholder="Введите сумму"
                            className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-3 focus:border-indigo-500 focus:outline-none"
                            value={data.amount}
                            onChange={(e) =>
                                setData("amount", e.target.value)
                            }
                        />

                        {errors.amount && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.amount}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Ваше имя
                        </label>

                        <input
                            placeholder="Необязательно"
                            className="w-full rounded-xl border border-slate-300 p-3 focus:border-indigo-500 focus:outline-none"
                            value={data.guest_name}
                            onChange={(e) =>
                                setData("guest_name", e.target.value)
                            }
                        />
                    </div>



                    <div>

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Комментарий
                        </label>

                        <textarea
                            rows="4"
                            placeholder="Поблагодарите сотрудника..."
                            className="w-full rounded-xl border border-slate-300 p-3 focus:border-indigo-500 focus:outline-none"
                            value={data.comment}
                            onChange={(e) =>
                                setData("comment", e.target.value)
                            }
                        />
                    </div>

                    <button
                        disabled={processing}
                        className="w-full rounded-xl bg-indigo-600 py-4 text-lg font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {processing ? "Обработка..." : "Оставить чаевые"}
                    </button>
                </form>

                <div className="border-t bg-slate-50 px-8 py-4 text-center text-xs text-slate-500">
                    Powered by e-tips
                </div>

            </div>
        </div>
    );
}
