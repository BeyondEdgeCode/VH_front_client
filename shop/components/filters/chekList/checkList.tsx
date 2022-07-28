import css from './checkList.module.css';
import cn from 'classnames';

import { v4 as uuidv4 } from 'uuid';
import { useMergeState } from '../../../utilsFunctions/useHook';
import { ChangeEvent, useState } from 'react';
import { SmallArro } from '../../svg/smallArrow';

type CheckBoxProps = {
    label: string,
    name: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

const CheckBox = ({label, name, onChange}: CheckBoxProps) => {
    const id = uuidv4();
    return (
        <>
            <input 
                type="checkbox"
                id={id} 
                className={css['custom-checkbox']} 
                name={name} 
                value={label} 
                onChange={e => onChange(e)}
            />
            <label htmlFor={id}>{label}</label>
        </>
    )
}

type CheckBox = {
    value: string,
}

type CheckBoxFilterProp = {
    label: string,
    checkBox: Array<CheckBox>
}

export const CheckBoxFilter = ({label, checkBox}: CheckBoxFilterProp) => {
    const name = uuidv4();
    const initState = checkBox.reduce((o, key) => Object.assign(o, {[key.value]: false}), {});
    
    const [chekedParams, setChekedParams] = useMergeState({...initState});
    const [collapse, setCollapse] = useState<boolean>(false);


    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        //@ts-ignore
        setChekedParams(Object.assign(chekedParams, {[e.target.value]: !chekedParams[e.target.value]}));
    }

    return (
        <div className={css.wrap}>
            <span className={css.label} onClick={() => setCollapse(c => !c)}>
                {label}
                <div className={cn(css.arrow, {[css.arrow_active]: collapse})}>
                    <SmallArro />
                </div>
            </span>
            <div className={css.chekbox_wrap}>
                <div className={cn(css.chekbox_wrap_animate, {[css.chekbox_wrap_active]: collapse})}>
                    {checkBox.map(el => 
                        <CheckBox 
                            label={el.value} 
                            name={name} 
                            onChange={onChange}
                            key={uuidv4()}
                        />  
                    )}
                </div>
            </div>
        </div>
    );
}