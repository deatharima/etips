export default function TipSuccess() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                <h1 className="mt-6 text-center text-3xl font-bold text-slate-900">
                    Спасибо!
                </h1>

                <p className="mt-3 text-center text-slate-600">
                    Ваши чаевые успешно отправлены.
                </p>

                <a
                    href="/"
                    className="mt-8 block w-full rounded-xl bg-indigo-600 py-3 text-center font-semibold text-white transition hover:bg-indigo-700"
                >
                    Вернуться на главную
                </a>

            </div>
        </div>
    );
}
