import css from './form.module.css';
import cn from 'classnames';


export const PersonForm = () => {
    return (
        <form className={css.form}>
            <div className={css.inputGroup}>
                <FormInput placeholder='Имя' theme={[css.mr_3]}/>
                <FormInput placeholder='Фамилия' />
            </div>
            <div className={cn(css.inputGroup, css.inputGroup_indent)}>
                <FormInput placeholder='Телефон *' required theme={[css.mr_3]}/>
                <FormInput placeholder='email *' required theme={[css.mr_3]}/>
                <FormInput type='date' required/>
            </div>
            <button type="submit">1232</button>
        </form>
    )
}

type FormInputProp = {
    type?: 'checkbox' | 'date' | 'email' | 'number' | 'text' | 'password' | 'tel',
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

