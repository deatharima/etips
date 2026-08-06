import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useRef, useState, useEffect } from 'react';
import { CameraIcon, PhotoIcon } from '@heroicons/react/24/outline';

export default function UpdateProfileInformation({
                                                     mustVerifyEmail, status, className = '',
                                                 })
{
    const user = usePage().props.auth.user;
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(null);

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            _method: 'patch',
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            email: user.email || '',
            avatar: null,
        });

    const defaultAvatar = user.avatar_path
        ? `/storage/${user.avatar_path}`
        : `https://api.dicebear.com/8.x/initials/svg?seed=${user.first_name || 'User'}`;

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('avatar', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const submit = (e) => {
        e.preventDefault();

        post(route('profile.update'), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                    Информация профиля
                </h2>

                <p className="mt-1.5 text-sm font-medium text-slate-500 leading-relaxed">
                    Обновите личные данные вашего аккаунта и адрес электронной почты
                </p>
            </header>

            <form onSubmit={submit} className="space-y-6 max-w-xl">
                <div className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-5 shadow-sm">
                    <InputLabel
                        htmlFor="avatar"
                        value="Фото профиля"
                        className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500"
                    />

                    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="group relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-3xl ring-4 ring-white shadow-md transition hover:opacity-90 active:scale-95"
                            title="Нажмите, чтобы изменить фото"
                        >
                            <img
                                src={preview || defaultAvatar}
                                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                alt="Аватар"
                            />

                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 opacity-0 transition-opacity group-hover:opacity-100">
                                <CameraIcon className="h-6 w-6 text-white drop-shadow-md" />
                            </div>
                        </div>

                        <div className="flex flex-col items-center sm:items-start">
                            <input
                                id="avatar"
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarChange}
                            />

                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-100 hover:text-slate-900 active:scale-95"
                            >
                                <PhotoIcon className="h-4 w-4 text-indigo-600" />
                                <span>Выбрать фото</span>
                            </button>

                            <p className="mt-2 text-center text-[11px] font-medium text-slate-400 sm:text-left">
                                PNG, JPG или WEBP до 2MB.
                            </p>

                            <InputError className="mt-1.5" message={errors.avatar} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <InputLabel
                            htmlFor="first_name"
                            value="Имя"
                            className="text-xs font-semibold uppercase tracking-wider text-slate-500"
                        />

                        <TextInput
                            id="first_name"
                            placeholder="Иван"
                            className="mt-1.5 block w-full rounded-2xl border-slate-200 bg-slate-50/50 p-3.5 text-sm font-medium placeholder-slate-400 transition focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10"
                            value={data.first_name}
                            onChange={(e) => setData('first_name', e.target.value)}
                            required
                            isFocused
                            autoComplete="given-name"
                        />

                        <InputError className="mt-1.5" message={errors.first_name} />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="last_name"
                            value="Фамилия"
                            className="text-xs font-semibold uppercase tracking-wider text-slate-500"
                        />

                        <TextInput
                            id="last_name"
                            placeholder="Иванов"
                            className="mt-1.5 block w-full rounded-2xl border-slate-200 bg-slate-50/50 p-3.5 text-sm font-medium placeholder-slate-400 transition focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10"
                            value={data.last_name}
                            onChange={(e) => setData('last_name', e.target.value)}
                            required
                            autoComplete="family-name"
                        />

                        <InputError className="mt-1.5" message={errors.last_name} />
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
                        placeholder="name@example.com"
                        className="mt-1.5 block w-full rounded-2xl border-slate-200 bg-slate-50/50 p-3.5 text-sm font-medium placeholder-slate-400 transition focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-600/10"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-1.5" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4">
                        <p className="text-sm font-medium text-amber-900">
                            Ваш адрес электронной почты не подтвержден{' '}
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="font-semibold text-indigo-600 hover:text-indigo-700 underline focus:outline-none"
                            >
                                Отправить письмо повторно
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-xs font-semibold text-emerald-700">
                                Новая ссылка для подтверждения успешно отправлена на ваш Email
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 pt-3">
                    <PrimaryButton
                        className="rounded-2xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-98 disabled:opacity-50"
                        disabled={processing}
                    >
                        Сохранить
                    </PrimaryButton>

                    {recentlySuccessful && (
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/60">
                            Сохранено
                        </span>
                    )}
                </div>
            </form>
        </section>
    );
}
