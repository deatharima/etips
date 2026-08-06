import { useForm } from "@inertiajs/react";

export default function EmployeeTip({ employee }) {

    const { data, setData, post, processing, errors } = useForm({

        amount: "",

        guest_name: "",

        comment: "",

    });

    const quickAmounts = [500, 1000, 2000, 5000];

    function submit(e) {

        e.preventDefault();

        post(`/employee-tip/${employee.employee_qr_token}`);

    }

    return (

        <div className="min-h-screen bg-slate-100 py-10 px-4">

            <div className="mx-auto max-w-xl overflow-hidden rounded-2xl bg-white shadow-xl">

                <div className="bg-indigo-600 px-8 py-8 text-white">

                    <h1 className="text-3xl font-bold">
                        {employee.first_name} {employee.last_name}
                    </h1>

                    <p className="mt-2 text-indigo-100">
                        Оставьте сотруднику чаевые
                    </p>

                </div>

                <form
                    onSubmit={submit}
                    className="space-y-6 p-8"
                >

                    <div>

                        <p className="mb-3 text-sm text-slate-500">
                            Популярные суммы
                        </p>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                            {quickAmounts.map(amount => (

                                <button
                                    type="button"
                                    key={amount}
                                    onClick={() => setData("amount", amount)}
                                    className={`rounded-xl border py-3 font-semibold transition ${
                                        Number(data.amount) === amount
                                            ? "border-indigo-600 bg-indigo-600 text-white"
                                            : "border-slate-300"
                                    }`}
                                >
                                    {amount} ₸
                                </button>

                            ))}

                        </div>

                        <input
                            type="number"
                            className="mt-4 w-full rounded-xl border p-3"
                            placeholder="Введите сумму"
                            value={data.amount}
                            onChange={(e) => setData("amount", e.target.value)}
                        />

                    </div>

                    <input
                        placeholder="Ваше имя"
                        className="w-full rounded-xl border p-3"
                        value={data.guest_name}
                        onChange={(e) => setData("guest_name", e.target.value)}
                    />

                    <textarea
                        rows="4"
                        className="w-full rounded-xl border p-3"
                        placeholder="Комментарий"
                        value={data.comment}
                        onChange={(e) => setData("comment", e.target.value)}
                    />

                    <button
                        disabled={processing}
                        className="w-full rounded-xl bg-indigo-600 py-4 text-lg font-semibold text-white"
                    >
                        Оставить чаевые
                    </button>

                </form>

            </div>

        </div>

    );
}
