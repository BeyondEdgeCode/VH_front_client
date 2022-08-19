import css from './form.module.css';
import cn from 'classnames';
import { Button } from '../ui-kit/button/button';


export const PersonForm = () => {
    return (
        <form className={css.form}>
            <span className={css.title}>Персональные данные</span>
            <div className={css.inputGroup}>
                <FormInput placeholder='Имя' theme={[css.mr_3]}/>
                <FormInput placeholder='Фамилия' />
            </div>
            <div className={cn(css.inputGroup, css.inputGroup_indent)}>
                <FormInput placeholder='Телефон *' required theme={[css.mr_3]}/>
                <FormInput placeholder='email *' required theme={[css.mr_3]}/>
                <FormInput type='date' required/>
            </div>
            <div className={css.acceptNotifications}>
                <FormInput type='checkbox' theme={[css.h_24, css.w_24, css.mr_3, css.grey]}/>
                <label className={css.label}>Хочу получать уведомления о скидках и акциях</label>
            </div>
            
            <hr className={css.separateLine}/>

            <span className={css.title}>Адрес доставки</span>

            <div className={css.inputGroup}>
                <FormInput placeholder='Город' theme={[css.mr_3, css.disableMaxWidth]}/>
                <FormInput placeholder='Индекс' theme={[css.w_344]}/>
            </div>
            <div className={cn(css.inputGroup, css.inputGroup_indent)}>
                <FormInput placeholder='Улица' theme={[css.mr_3, css.disableMaxWidth]}/>
                <FormInput placeholder='Дом' theme={[css.w_344]}/>
            </div>
            <div className={css.inputGroup_indent}>
                <FormInput placeholder='Квартира / Офис' theme={[css.w_344]}/>
            </div>

            <Button>Сохранить</Button>
        </form>
    )
}

type FormInputProp = {
    type?: 'checkbox' | 'date' | 'email' | 'number' | 'text' | 'password' | 'tel' | 'checkbox',
    onChange?: () => void,
    placeholder?: string,
    required?: boolean,
    theme?: Array<string>
}

const FormInput = ({
    type = 'text',
    onChange,
    placeholder = '',
    required = false,
    theme = []
}: FormInputProp) => {
    return (
        <input 
            type={type}
            className={cn(css.input, ...theme)} 
            onChange={onChange} 
            placeholder={placeholder}
            required={required}
        />
    );
} 

