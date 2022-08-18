import { ReactNode } from 'react';
import css from './button.module.css';
import cn from 'classnames'; 


type ButtonProp = {
    children: ReactNode | string,
    isActiveState?: boolean,
    isSmall?: boolean,
    onClick?: () => void
};

export const Button = ({children, isActiveState = false, onClick, isSmall = false}:ButtonProp) => {
    return (
        <button className={cn(css.button, {[css.button_active]: isActiveState, [css.button_small]: isSmall})} onClick={onClick}>{children}</button>
    )
}