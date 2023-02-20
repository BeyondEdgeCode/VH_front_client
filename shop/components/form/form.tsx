import css from './form.module.css'
import cn from 'classnames'
import { Button } from '../ui-kit/button/button'
import { Theme } from '../../type.store'
import { useJWT } from '../../utilsFunctions/useHook'
import { useEffect } from 'react'
import { setNewUserAuthKey } from '../stors/user-auth.store'

interface FormProp {
    onClick?: (e?: Event) => void
}

export const PersonForm = () => {
    return (
        <form className={css.form}>
            <span className={css.title}>Персональные данные</span>
            <div className={css.inputGroup}>
                <FormInput placeholder="Имя" theme={[css.mr_3]} />
                <FormInput placeholder="Фамилия" />
            </div>
            <div className={cn(css.inputGroup, css.inputGroup_indent)}>
                <FormInput
                    placeholder="Телефон *"
                    required
                    theme={[css.mr_3]}
                />
                <FormInput placeholder="email *" required theme={[css.mr_3]} />
                <FormInput type="date" required />
            </div>
            <div className={css.acceptNotifications}>
                <FormInput
                    type="checkbox"
                    theme={[css.h_24, css.w_24, css.mr_3, css.grey]}
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
                />
                <FormInput placeholder="Индекс" theme={[css.w_344]} />
            </div>
            <div className={cn(css.inputGroup, css.inputGroup_indent)}>
                <FormInput
                    placeholder="Улица"
                    theme={[css.mr_3, css.disableMaxWidth]}
                />
                <FormInput placeholder="Дом" theme={[css.w_344]} />
            </div>
            <div className={css.inputGroup_indent}>
                <FormInput placeholder="Квартира / Офис" theme={[css.w_344]} />
            </div>

            <Button>Сохранить</Button>
        </form>
    )
}

export const ChangePasswordForm = ({ onClick }: FormProp) => {
    useEffect(() => {
        setNewUserAuthKey(localStorage.getItem('JWT'))
    })
    const jwt = useJWT()

    return (
        <form className={cn(css.form, css.changePasswordForm, css.w40p)}>
            <label className={css.changePasswordLabel}>
                Логин
                <FormInput placeholder={'Ваш логин'} theme={[css.mt_1]} />
            </label>

            <label className={css.changePasswordLabel}>
                Пароль
                <FormInput placeholder={'Ваш логин'} theme={[css.mt_1]} />
            </label>
            {jwt ? (
                <label className={css.changePasswordLabel}>
                    Новый пароль
                    <FormInput placeholder={'Ваш логин'} theme={[css.mt_1]} />
                </label>
            ) : null}
            <Button theme={[css.disableMaxWidth]} onClick={onClick}>
                Сохранить
            </Button>
        </form>
    )
}

type FormInputProp = {
    type?:
        | 'checkbox'
        | 'date'
        | 'email'
        | 'number'
        | 'text'
        | 'password'
        | 'tel'
        | 'checkbox'
    onChange?: () => void
    placeholder?: string
    required?: boolean
    theme?: Theme
}

const FormInput = ({
    type = 'text',
    onChange,
    placeholder = '',
    required = false,
    theme = [],
}: FormInputProp) => {
    return (
        <input
            type={type}
            className={cn(css.input, ...theme)}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
        />
    )
}
