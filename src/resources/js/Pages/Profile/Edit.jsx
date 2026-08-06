import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import { Head } from '@inertiajs/react';
import { ChevronDownIcon, UserIcon, KeyIcon, TrashIcon } from "@heroicons/react/16/solid";
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status, auth }) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const user = auth?.user;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <Head title="Профиль" />

            <header className="sticky top-0 z-10 bg-white shadow-sm">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center">
                        <Link href="/employee" className="text-xl font-extrabold text-indigo-700">eTips</Link>
                    </div>

                    <div className="relative">
                        <button onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <img
                                src={
                                    user?.avatar_path
                                        ? `/storage/${user.avatar_path}`
                                        : `https://api.dicebear.com/8.x/initials/svg?seed=${user?.first_name || 'User'}`
                                }
                                alt="Avatar"
                                className="h-8 w-8 rounded-full"
                            />
                            <span className="text-sm font-medium">{user?.first_name}</span>
                            <ChevronDownIcon className="h-4 w-4 text-slate-500" />
                        </button>

                        {isProfileOpen &&(
                            <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl border bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5">
                                <Link href="/profile" className="block rounded-lg px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">Профиль</Link>
                                <button onClick={() => router.post('/logout')} className="block w-full text-left rounded-lg px-4 py-2 text-sm text-rose-700 hover:bg-rose-50">Выход</button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-indigo-600">Настройки аккаунта</p>
                        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-950">
                            Профиль
                        </h1>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                <UserIcon className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-950">Информация профиля</h2>
                                <p className="text-sm text-slate-500">Обновите свои персональные данные</p>
                            </div>
                        </div>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>

                    <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                <KeyIcon className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-950">Пароль</h2>
                                <p className="text-sm text-slate-500">Измените свой пароль</p>
                            </div>
                        </div>
                        <UpdatePasswordForm />
                    </div>

                    <div className="rounded-3xl border border-rose-200/80 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                                <TrashIcon className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-rose-950">Удалить аккаунт</h2>
                                <p className="text-sm text-rose-600">Безвозвратно удалите свой аккаунт</p>
                            </div>
                        </div>
                        <DeleteUserForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
