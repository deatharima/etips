import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Восстановление пароля" />

            <div className="mb-6 text-center">
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                    Забыли пароль?
                </h1>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                    Ничего страшного! Укажите ваш Email, и мы отправят ссылку для сброса пароля.
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
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                <div className="pt-2">
                    <PrimaryButton
                        className="w-full justify-center rounded-2xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-98 disabled:opacity-50"
                        disabled={processing}>
                        Отправить ссылку
                    </PrimaryButton>
                </div>

                <div className="pt-2 text-center">
                    <label className="text-xs font-semibold text-slate-500 hover:text-indigo-600 transition">Вспомнили пароль? </label>
                    <Link
                        href={route('login')}
                        className="text-xs font-semibold text-indigo-600 hover:underline">Вернуться ко входу
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
