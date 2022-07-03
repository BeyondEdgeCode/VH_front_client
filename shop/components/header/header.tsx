import { ReactNode } from 'react';
import Image from 'next/image';
import css from './header.module.css';
import logo from '../../public/img/vh_logo.png';
import { Search } from '../svg/search';

type RadioButtonProps = {
    children: ReactNode,
    isActive: boolean,
    count?: number
}

const RadioButton = (props: RadioButtonProps) => {
    const {children} = props;
    return (
        <div className={css.button}>
            {children}
        </div>
    )
}
RadioButton.defaultProps = {
    isActive: false
}

export const Header = () => {
    return (
        <header className={css.header}>
            <div className={css['search-logo-wrap']}>
                <div className={css['logo-wrap']}>
                    <Image
                        src={logo}
                        alt="Logo"
                        width={100}
                        height={120}
                    />
                    <span className={css['logo-text']}>
                        VAPE&HOOKAH
                    </span>
                </div>
                <div className={css['input-wrap']}>
                    <input 
                        type="text"
                        placeholder='Поиск'
                        className={css.input}
                    />
                    <span className={css['input-icon']}>
                        <Search/>
                    </span>
                </div>
            </div>
            <div className={css['button-group']}>
                <RadioButton>
                    <i className="fa-regular fa-heart fa-xl"></i>
                </RadioButton>
                <RadioButton>
                    <i className="fa-regular fa-user fa-xl"></i>
                </RadioButton>
                <RadioButton>
                    <i className="fa-solid fa-store fa-xl"></i>
                </RadioButton>
            </div>
        </header>
    );
};
