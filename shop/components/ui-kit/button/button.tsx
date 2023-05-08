import { ReactNode } from 'react';
import css from './button.module.css';
import cn from 'classnames';
import { Theme } from '../../../type.store';

type ButtonProp = {
    children: ReactNode | string;
    isActiveState?: boolean;
    isSmall?: boolean;
    theme?: Theme;
    onClick?: () => void;
};

export const Button = ({
    children,
    isActiveState = false,
    onClick,
    isSmall = false,
    theme = [],
}: ButtonProp) => {
    return (
        <button
            className={cn(css.button, ...theme, {
                [css.button_active]: isActiveState,
                [css.button_small]: isSmall,
            })}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
