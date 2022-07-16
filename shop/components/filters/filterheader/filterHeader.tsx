import { useState } from 'react';
import css from './filterHeader.module.css';

import cn from 'classnames';


type Togle = {
    onClick: () => void,
    active: boolean,
}
const Togler = ({onClick, active}: Togle) => {
    return (
        <div className={css.togle} onClick={onClick}>
            <div className={cn(css.aria, {[css.aria_active]: active})}></div>
        </div>
    );
}

export const FilterHeader = () => {
    const [togle, setTogle] = useState<boolean>(false);
    const togleClick = () => {
        setTogle(t => !t);
    }
    return (
        <div className={css.wrap}>
            <span className={cn({[css.label_isActive]: togle})}>Все товары</span>
            <Togler onClick={() => togleClick()} active={togle}/>
            <span className={cn({[css.label_isActive]: !togle})}>В наличии</span>
        </div>
    );
};