import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Регистрация" />

            <div className="mb-6 text-center">
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                    Создать аккаунт
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                    Заполните данные для регистрации в системе
                </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <InputLabel
                            htmlFor="first_name"
                            value="Имя"
                            className="text-xs font-semibold uppercase tracking-wider text-slate-500"
                        />

                        <TextInput
                            id="first_name"
                            name="first_name"
                            placeholder="Иван"
                            value={data.first_name}
                            className="mt-1.5 block w-full rounded-2xl border-slate-200 bg-slate-50/50 p-3.5 text-sm font-medium placeholder-slate-400 transition focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10"
                            autoComplete="given-name"
                            isFocused={true}
                            onChange={(e) => setData('first_name', e.target.value)}
                            required
                        />

                        <InputError message={errors.first_name} className="mt-1.5" />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="last_name"
                            value="Фамилия"
                            className="text-xs font-semibold uppercase tracking-wider text-slate-500"
                        />

                        <TextInput
                            id="last_name"
                            name="last_name"
                            placeholder="Иванов"
                            value={data.last_name}
                            className="mt-1.5 block w-full rounded-2xl border-slate-200 bg-slate-50/50 p-3.5 text-sm font-medium placeholder-slate-400 transition focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10"
                            autoComplete="family-name"
                            onChange={(e) => setData('last_name', e.target.value)}
                            required
                        />

                        <InputError message={errors.last_name} className="mt-1.5" />
                    </div>
                </div>

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
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password"
                        value="Пароль"
                        className="text-xs font-semibold uppercase tracking-wider text-slate-500"
                    />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        placeholder="********"
                        value={data.password}
                        className="mt-1.5 block w-full rounded-2xl border-slate-200 bg-slate-50/50 p-3.5 text-sm font-medium placeholder-slate-400 transition focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Подтвердите пароль"
                        className="text-xs font-semibold uppercase tracking-wider text-slate-500"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        placeholder="********"
                        value={data.password_confirmation}
                        className="mt-1.5 block w-full rounded-2xl border-slate-200 bg-slate-50/50 p-3.5 text-sm font-medium placeholder-slate-400 transition focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-1.5"
                    />
                </div>

                <div className="pt-2">
                    <PrimaryButton
                        className="w-full justify-center rounded-2xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-98 disabled:opacity-50"
                        disabled={processing}
                    >
                        Зарегистрироваться
                    </PrimaryButton>
                </div>

                <div className="pt-2 text-center">
                    <label className="text-xs font-semibold text-slate-500 hover:text-indigo-600 transition">Уже есть аккаунт? </label>
                    <Link
                        href={route('login')}
                        className="text-xs font-semibold text-indigo-600 hover:underline"
                    >
                        Войти
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
