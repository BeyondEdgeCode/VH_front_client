import { SyntheticEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SmallArro } from '../../svg/smallArrow';

import css from './selectboxFilter.module.css';
import cn from 'classnames';
import { FilterState } from '../baseFilter';

type RadioBittonProps = {
    value: string,
    name: string,
    onClick: any,
    readonly defaultCheck: boolean,
    readonly isChecked: boolean,
}

type SelectBoxLisProp = {
    list: Array<FilterState>,
    label: string,
    setter: (newValue: Array<FilterState>) => void
}


const RadioBitton = ({value, onClick, defaultCheck, name, isChecked}: RadioBittonProps) => {
    return (
        <label className={css["rad-label"]}>
            <input 
                type="radio" 
                className={css["rad-input"]} 
                name={name} 
                value={value} 
                onClick={onClick()}
                defaultChecked={defaultCheck}
                checked={isChecked}
            />
            <div className={css["rad-design"]}></div>
            <div className={css["rad-text"]}>{value}</div>
        </label>
    );
}

export const SelectboxFilter = ({list, label, setter}:SelectBoxLisProp) => {
    const name = uuidv4();
    
    const [collapse, setCollapse] = useState<boolean>(false);
    const [localeStete, setLocaleStete] = useState(list);

    const handleChange = (event: SyntheticEvent) => {
        setLocaleStete(oldState => {
            const newState = oldState.map(el => {
                // @ts-ignore
                if(event.target.value == el.value) {
                    return {...el, state: true};
                } else {
                    return {...el, state: false};
                }
            });
            
            return [...newState];
        });

    };
    useEffect(() => {
        //@ts-ignore
        setter(localeStete);
    }, [localeStete])

    return (
        <div className={css.wrap} >
            <span className={css.label} onClick={() => setCollapse(c => !c)}>
                {label} 
                <div className={cn(css.arrow, {[css.arrow_active]: collapse})}>
                    <SmallArro />
                </div>
            </span>
            <div className={css.radio_wrap}>
                <div className={
                    cn(css.radio_wrap_animate, 
                    {[css.radio_wrap_active]: collapse})
                    }>
                    { list.map((el, i) => 
                        <RadioBitton 
                            value={el.value}
                            onClick={() => handleChange} 
                            name={name} 
                            defaultCheck={i==0}
                            key={uuidv4()}
                            //@ts-ignore
                            isChecked={localeStete[i].state}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}