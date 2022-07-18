import css from './checkList.module.css';
import { v4 as uuidv4 } from 'uuid';

type CheckBoxProps = {
    label: string,
    value: string,
    name: string,
}

const CheckBox = ({label, value, name}: CheckBoxProps) => {
    const id = uuidv4();
    return (
        <>
            <input type="checkbox" id={id} className={css['custom-checkbox']} name={name}value={value} />
            <label htmlFor={id}>{label}</label>
        </>
    )
}

const MOKED_CHEKBOCKS = [
    {
        label: '10ml',
        value: '10ml',
    },
    {
        label: '20ml',
        value: '20ml',
    },
    {
        label: '30ml',
        value: '30ml',
    },
    {
        label: '40ml',
        value: '40ml',
    }
];

export const CheckBoxFilter = () => {
    const name = uuidv4()
    return (
        <div className={css.wrap}>
            <label className={css.label}>asd</label>
            {MOKED_CHEKBOCKS.map(el => 
                <CheckBox label={el.label} value={el.value} name={name} />  
            )}
        </div>
    );
}