import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                    Обновить пароль
                </h2>

                <p className="mt-1.5 text-sm font-medium text-slate-500 leading-relaxed">
                    Используйте надежный случайный пароль, чтобы обезопасить свой аккаунт
                </p>
            </header>

            <form onSubmit={updatePassword} className="space-y-4 max-w-xl">
                <div>
                    <InputLabel
                        htmlFor="current_password"
                        value="Текущий пароль"
                        className="text-xs font-semibold uppercase tracking-wider text-slate-500"
                    />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData('current_password', e.target.value)
                        }
                        type="password"
                        placeholder="********"
                        className="mt-1.5 block w-full rounded-2xl border-slate-200 bg-slate-50/50 p-3.5 text-sm font-medium placeholder-slate-400 transition focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10"
                        autoComplete="current-password"
                    />

                    <InputError
                        message={errors.current_password}
                        className="mt-1.5"
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password"
                        value="Новый пароль"
                        className="text-xs font-semibold uppercase tracking-wider text-slate-500"
                    />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        placeholder="********"
                        className="mt-1.5 block w-full rounded-2xl border-slate-200 bg-slate-50/50 p-3.5 text-sm font-medium placeholder-slate-400 transition focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10"
                        autoComplete="new-password"
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
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        type="password"
                        placeholder="********"
                        className="mt-1.5 block w-full rounded-2xl border-slate-200 bg-slate-50/50 p-3.5 text-sm font-medium placeholder-slate-400 transition focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10"
                        autoComplete="new-password"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-1.5"
                    />
                </div>

                <div className="flex items-center gap-4 pt-3">
                    <PrimaryButton
                        className="rounded-2xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-98 disabled:opacity-50"
                        disabled={processing}
                    >
                        Сохранить
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0 translate-x-[-10px]"
                        leave="transition ease-in-out duration-300"
                        leaveTo="opacity-0"
                    >
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/60">
                            ✓ Изменения сохранены
                        </span>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
