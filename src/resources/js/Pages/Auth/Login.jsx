import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Войти в аккаунт" />

            <div className="mb-6 text-center">
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                    С возвращением!
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                    Введите данные для входа в свой кабинет
                </p>
            </div>

            {status && (
                <div className="mb-6 rounded-2xl border border-emerald-200/80 bg-emerald-50/80 p-4 text-center text-sm font-semibold text-emerald-700 shadow-sm">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel
                        htmlFor="email"
                        value="Email"
                        className="text-xs font-semibold uppercase tracking-wider text-slate-500"
                    />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        placeholder="name@example.com"
                        value={data.email}
                        className="mt-1.5 block w-full rounded-2xl border-slate-200 bg-slate-50/50 p-3.5 text-sm font-medium placeholder-slate-400 transition focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <InputLabel
                            htmlFor="password"
                            value="Пароль"
                            className="text-xs font-semibold uppercase tracking-wider text-slate-500"
                        />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline focus:outline-none"
                            >
                                Забыли пароль?
                            </Link>
                        )}
                    </div>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        placeholder="********"
                        value={data.password}
                        className="mt-1.5 block w-full rounded-2xl border-slate-200 bg-slate-50/50 p-3.5 text-sm font-medium placeholder-slate-400 transition focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                <div className="flex items-center justify-between pt-1">
                    <label className="inline-flex items-center cursor-pointer select-none">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                            className="rounded-lg border-slate-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                        />
                        <span className="ms-2.5 text-sm font-medium text-slate-600">
                            Запомнить меня
                        </span>
                    </label>
                </div>

                <div className="pt-2">
                    <PrimaryButton
                        className="w-full justify-center rounded-2xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-98 disabled:opacity-50"
                        disabled={processing}
                    >
                        Войти
                    </PrimaryButton>
                </div>

                <div className="pt-2 text-center">
                    <label className="text-xs font-semibold text-slate-500">Ещё нет аккаунта? </label>
                    <Link
                        href={route('register')}
                        className="text-xs font-semibold text-indigo-600 hover:underline"
                    >
                        Зарегистрироваться
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
