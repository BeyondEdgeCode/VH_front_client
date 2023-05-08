import css from './form.module.css';
import cn from 'classnames';
import { Button } from '../ui-kit/button/button';
import { Theme } from '../../type.store';
import {
    useJWT,
    useJWT_2,
    useMergeState,
    useToggler,
} from '../../utilsFunctions/useHook';
import { ChangeEvent, useEffect } from 'react';
import { setNewUserAuthKey } from '../stors/user-auth.store';
import { auth, setUserData } from '../../utilsFunctions/GetFromAPI';
import { ChangePersonForm, formatData, validateForm } from './form.model';

export const PersonForm = () => {
    const [formState, setFormState] = useMergeState<ChangePersonForm>({
        // email: '',
        firstName: '',
        lastName: '',
        mobilephone: '',
        birthday: '',
        city: '',
        street: '',
        building: '',
        flat: '',
        zipcode: '',
        notificationsAgree: false,
    });

    const [errorFormState, setErrorFormState] = useMergeState({
        mobilephone: false,
        birthday: false,
        city: false,
        street: false,
        building: false,
        flat: false,
        zipcode: false,
    });

    const jwt = useJWT_2();

    const onSave = (e?: Event) => {
        e?.preventDefault();
        setErrorFormState(validateForm(formState));
        setUserData(formatData(formState), jwt);
    };

    return (
        <form className={css.form}>
            <span className={css.title}>Персональные данные</span>
            <div className={css.inputGroup}>
                <FormInput
                    placeholder="Имя"
                    theme={[css.mr_3]}
                    onChange={(e) =>
                        setFormState({ firstName: e.currentTarget.value })
                    }
                />
                <FormInput
                    placeholder="Фамилия"
                    onChange={(e) =>
                        setFormState({ lastName: e.currentTarget.value })
                    }
                />
            </div>
            <div className={cn(css.inputGroup, css.inputGroup_indent)}>
                <FormInput
                    placeholder="Телефон *"
                    required
                    type="tel"
                    theme={[css.mr_3]}
                    onChange={(e) =>
                        setFormState({ mobilephone: e.currentTarget.value })
                    }
                    hasError={errorFormState.mobilephone}
                />
                {/* <FormInput
                    placeholder="email"
                    type="email"
                    required
                    theme={[css.mr_3]}
                    onChange={(e) =>
                        setFormState({ email: e.currentTarget.value })
                    }
                /> */}
                <FormInput
                    type="date"
                    required
                    onChange={(e) =>
                        setFormState({ birthday: e.currentTarget.value })
                    }
                    hasError={errorFormState.birthday}
                />
            </div>
            <div className={css.acceptNotifications}>
                <FormInput
                    type="checkbox"
                    theme={[css.h_24, css.w_24, css.mr_3]}
                    onChange={(e) =>
                        setFormState({ notificationsAgree: e.target.checked })
                    }
                />
                <label className={css.label}>
                    Хочу получать уведомления о скидках и акциях
                </label>
            </div>

            <span className={css.title}>Адрес доставки</span>

            <div className={css.inputGroup}>
                <FormInput
                    placeholder="Город"
                    theme={[css.mr_3, css.disableMaxWidth]}
                    onChange={(e) =>
                        setFormState({ city: e.currentTarget.value })
                    }
                    hasError={errorFormState.city}
                />
                <FormInput
                    placeholder="Индекс"
                    theme={[css.w_344]}
                    onChange={(e) =>
                        setFormState({ zipcode: e.currentTarget.value })
                    }
                    hasError={errorFormState.zipcode}
                />
            </div>
            <div className={cn(css.inputGroup, css.inputGroup_indent)}>
                <FormInput
                    placeholder="Улица"
                    theme={[css.mr_3, css.disableMaxWidth]}
                    onChange={(e) =>
                        setFormState({ street: e.currentTarget.value })
                    }
                    hasError={errorFormState.street}
                />
                <FormInput
                    placeholder="Дом"
                    theme={[css.w_344]}
                    onChange={(e) =>
                        setFormState({ building: e.currentTarget.value })
                    }
                    hasError={errorFormState.building}
                />
            </div>
            <div className={css.inputGroup_indent}>
                <FormInput
                    placeholder="Квартира / Офис"
                    theme={[css.w_344]}
                    onChange={(e) =>
                        setFormState({ flat: e.currentTarget.value })
                    }
                    hasError={errorFormState.flat}
                />
            </div>

            <Button onClick={onSave}>Сохранить</Button>
        </form>
    );
};

export const ChangePasswordForm = () => {
    useEffect(() => {
        setNewUserAuthKey(localStorage.getItem('JWT'));
    });
    const jwt = useJWT();

    const [errorLogin, setErrorLogin] = useToggler();

    const authForm = (e?: Event) => {
        e?.preventDefault();
        auth(formState, setErrorLogin);
    };

    const [formState, setFormState] = useMergeState({
        email: '',
        password: '',
    });

    return (
        <form className={cn(css.form, css.changePasswordForm, css.w40p)}>
            <span className={css.title}>Смена пароля</span>
            <label className={css.changePasswordLabel}>
                Логин
                <FormInput
                    placeholder={'Ваш логин'}
                    theme={[css.mt_1]}
                    onChange={(e) => {
                        setFormState({ email: e.currentTarget.value });
                    }}
                />
            </label>

            <label className={css.changePasswordLabel}>
                Пароль
                <FormInput
                    placeholder={'Ваш пароль'}
                    theme={[css.mt_1]}
                    onChange={(e) => {
                        setFormState({ password: e.currentTarget.value });
                    }}
                />
            </label>
            {jwt ? (
                <label className={css.changePasswordLabel}>
                    Новый пароль
                    <FormInput placeholder={'Ваш пароль'} theme={[css.mt_1]} />
                </label>
            ) : null}
            {!jwt ? (
                <Button theme={[css.disableMaxWidth]} onClick={authForm}>
                    Войти
                </Button>
            ) : (
                <Button theme={[css.disableMaxWidth]} onClick={() => {}}>
                    Сохранить
                </Button>
            )}
            {errorLogin && (
                <span className={css.errorLogin}>
                    Неверный логин или пароль
                </span>
            )}
        </form>
    );
};

type FormInputProp = {
    type?:
        | 'checkbox'
        | 'date'
        | 'email'
        | 'number'
        | 'text'
        | 'password'
        | 'tel'
        | 'checkbox';
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    theme?: Theme;
    hasError?: boolean;
};

const FormInput = ({
    type = 'text',
    onChange,
    placeholder = '',
    required = false,
    theme = [],
    hasError = false,
}: FormInputProp) => {
    return (
        <div className={cn(css.inputWrap, ...theme)}>
            <input
                type={type}
                className={cn(css.input)}
                onChange={(e) => onChange && onChange(e)}
                placeholder={placeholder}
                required={required}
            />
            {hasError && (
                <span className={cn(css.errorLogin, css.ml_2, css.mt_1)}>
                    Это обязательное поле
                </span>
            )}
        </div>
    );
};
