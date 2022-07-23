import cn from 'classnames';
import { SyntheticEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SmallArro } from '../../svg/smallArrow';
import css from './selectboxFilter.module.css';

type RadioBittonProps = {
    label: string,
    name: string,
    onClick: any,
    defaultCheck: boolean,
}

const RadioBitton = ({label, onClick, defaultCheck, name}: RadioBittonProps) => {
    return (
        <label className={css["rad-label"]}>
            <input 
                type="radio" 
                className={css["rad-input"]} 
                name={name} 
                value={label} 
                onClick={onClick()}
                defaultChecked={defaultCheck}
            />
            <div className={css["rad-design"]}></div>
            <div className={css["rad-text"]}>{label}</div>
        </label>
    );
}

type SelectBoxLisProp = {
    list: Array<{label: string}>
}

export const SelectboxFilter = ({list}:SelectBoxLisProp) => {
    const name = uuidv4();

    const [collapse, setCollapse] = useState<boolean>(false);

    const handleChange = (event: SyntheticEvent) => {
        // @ts-ignore
        console.log(event.target.value);
    };
    
    return (
        <div className={css.wrap} >
            <span className={css.label} onClick={() => setCollapse(c => !c)}>
                Срок доставки 
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
                            label={el.label}
                            onClick={() => handleChange} 
                            name={name} 
                            defaultCheck={i==0}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}