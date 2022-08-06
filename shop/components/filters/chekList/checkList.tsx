import css from './checkList.module.css';
import cn from 'classnames';

import { v4 as uuidv4 } from 'uuid';
import { useMergeState } from '../../../utilsFunctions/useHook';
import { ChangeEvent, memo, useState } from 'react';
import { SmallArro } from '../../svg/smallArrow';
import { getFormatFilters } from '../../../utilsFunctions/utils';

type CheckBoxProps = {
    label: string,
    name: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    isChecked: boolean;
}

const CheckBox = memo(({label, name, onChange, isChecked}: CheckBoxProps) => {
    const id = uuidv4();
    return (
        <>
            <input 
                type="checkbox"
                id={id} 
                className={css['custom-checkbox']} 
                name={name} 
                value={label} 
                checked={isChecked}
                onChange={e => onChange(e)}
            />
            <label htmlFor={id}>{label}</label>
        </>
    )
});

type CheckBox = {
    value: string,
}

type CheckBoxFilterProp = {
    label: string,
    checkBox: Array<CheckBox>
    setter: (newValue: { value: string; }[]) => void
}

export const CheckBoxFilter = ({label, checkBox, setter}: CheckBoxFilterProp) => {
    const name = uuidv4();
    const initState = checkBox.reduce((o, key) => Object.assign(o, {[key.value]: false}), {});
    
    const [chekedParams, setChekedParams] = useMergeState({...initState});
    const [collapse, setCollapse] = useState<boolean>(false);


    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        //@ts-ignore
        setChekedParams(Object.assign(chekedParams, {[e.target.value]: !chekedParams[e.target.value]}));
        setter(getFormatFilters(chekedParams));
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
                            //@ts-ignore
                            isChecked={chekedParams[el.value]}
                        />  
                    )}
                </div>
            </div>
        </div>
    );
}