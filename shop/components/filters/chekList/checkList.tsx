import css from './checkList.module.css';
import { v4 as uuidv4 } from 'uuid';
import { useMergeState } from '../../../utilsFunctions/useHook';
import { ChangeEvent, ChangeEventHandler, useEffect } from 'react';

type CheckBoxProps = {
    label: string,
    value: string,
    name: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

const CheckBox = ({label, value, name, onChange}: CheckBoxProps) => {
    const id = uuidv4();
    return (
        <>
            <input 
                type="checkbox"
                id={id} 
                className={css['custom-checkbox']} 
                name={name} 
                value={value} 
                onChange={e => onChange(e)}
            />
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
    const name = uuidv4();
    const initState = MOKED_CHEKBOCKS.reduce((o, key) => Object.assign(o, {[key.value]: false}), {});
    
    const [chekedParams, setChekedParams] = useMergeState({...initState});

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        //@ts-ignore
        setChekedParams(Object.assign(chekedParams, {[e.target.value]: !chekedParams[key]}));
    }

    return (
        <div className={css.wrap}>
            {/* label нужно прокинуть пропсой */}
            <label className={css.label}>asd</label>
            {MOKED_CHEKBOCKS.map(el => 
                <CheckBox 
                    label={el.label} 
                    value={el.value} 
                    name={name} 
                    onChange={onChange}
                />  
            )}
        </div>
    );
}