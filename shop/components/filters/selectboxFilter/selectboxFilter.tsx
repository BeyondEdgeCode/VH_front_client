import cn from 'classnames';
import { SyntheticEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SmallArro } from '../../svg/smallArrow';
import css from './selectboxFilter.module.css';

type RadioBittonProps = {
    value: string,
    name: string,
    onClick: any,
    defaultCheck: boolean,
}

const RadioBitton = ({value, onClick, defaultCheck, name}: RadioBittonProps) => {
    return (
        <label className={css["rad-label"]}>
            <input 
                type="radio" 
                className={css["rad-input"]} 
                name={name} 
                value={value} 
                onClick={onClick()}
                defaultChecked={defaultCheck}
            />
            <div className={css["rad-design"]}></div>
            <div className={css["rad-text"]}>{value}</div>
        </label>
    );
}

type SelectBoxLisProp = {
    list: Array<{value: string}>,
    label: string,
}

export const SelectboxFilter = ({list, label}:SelectBoxLisProp) => {
    const name = uuidv4();

    const [collapse, setCollapse] = useState<boolean>(false);

    const handleChange = (event: SyntheticEvent) => {
        // @ts-ignore
        console.log(event.target.value);
    };
    
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
                        />
                    )}
                </div>
            </div>
        </div>
    );
}