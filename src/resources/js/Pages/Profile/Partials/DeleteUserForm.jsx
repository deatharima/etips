import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                    Удаление аккаунта
                </h2>

                <p className="mt-1.5 text-sm font-medium text-slate-500 leading-relaxed">
                    После удаления аккаунта все его данные и ресурсы будут безвозвратно утеряны
                </p>
            </header>

            <DangerButton
                onClick={confirmUserDeletion}
                className="rounded-2xl bg-rose-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-700 active:scale-98"
            >
                Удалить аккаунт
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6 sm:p-8">
                    <div className="mb-4">
                        <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        </div>

                        <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                            Вы уверены, что хотите удалить аккаунт?
                        </h2>

                        <p className="mt-2 text-sm font-medium text-slate-500 leading-relaxed">
                            Это действие нельзя отменить. Введите ваш текущий пароль для подтверждения полного и окончательного удаления аккаунта.
                        </p>
                    </div>

                    <div className="mt-5">
                        <InputLabel
                            htmlFor="password"
                            value="Пароль"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="block w-full rounded-2xl border-slate-200 bg-slate-50/50 p-3.5 text-sm font-medium placeholder-slate-400 transition focus:border-rose-500 focus:bg-white focus:ring-4 focus:ring-rose-500/10"
                            isFocused
                            placeholder="Введите ваш пароль"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-1.5"
                        />
                    </div>

                    <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
                        <SecondaryButton
                            onClick={closeModal}
                            className="justify-center rounded-2xl border-slate-200 bg-white py-3.5 px-5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                        >
                            Отмена
                        </SecondaryButton>

                        <DangerButton
                            className="justify-center rounded-2xl bg-rose-600 py-3.5 px-5 text-sm font-bold text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-700 active:scale-98 disabled:opacity-50"
                            disabled={processing}
                        >
                            Подтвердить удаление
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
