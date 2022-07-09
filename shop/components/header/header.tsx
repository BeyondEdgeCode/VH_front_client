import { ReactNode } from 'react';
import Image from 'next/image';
import { Search } from '../svg/search';
import { useCurrentPathname } from '../../utilsFunctions/routerUtils';
import { isExists } from '../../utilsFunctions/checkType';
import { SHOP_NAME } from '../../GlobalVarible/global';
import cn from 'classnames';

import css from './header.module.css';
import logo from '../../public/img/vh_logo.png';

type RadioButtonProps = {
    children: ReactNode,
    isActive: boolean,
    count?: number
}

const RadioButton = (props: RadioButtonProps) => {
    const {children, count, isActive} = props;

    return (
        <div >
            <div className={cn(css.button, {[css.button_active]: isActive} )}>
                {children}
            </div>
            {isExists(count) 
                ? <div className={css['button-count-wrap']}>
                    {count}
                </div>
                : null}
        </div>
    )
}
RadioButton.defaultProps = {
    isActive: false
}

export const Header = () => {
    const router = useCurrentPathname();
    const isActiveBasket = router == 'basket';
    const isActiveProfile = router == 'profile';
    const isActiveFavorites = router == 'favorites';

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
                        {SHOP_NAME}
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
                <RadioButton isActive={isActiveFavorites}>
                    <i className="fa-regular fa-heart fa-xl"></i>
                </RadioButton>
                <RadioButton isActive={isActiveProfile}>
                    <i className="fa-regular fa-user fa-xl"></i>
                </RadioButton>
                <RadioButton isActive={isActiveBasket}>
                    <i className="fa-solid fa-store fa-xl"></i>
                </RadioButton>
            </div>
        </header>
    );
};
