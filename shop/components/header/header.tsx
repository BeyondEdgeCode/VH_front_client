import { ReactNode } from 'react';
import Image from 'next/image';
import { Search } from '../svg/search';
import { useCurrentPathname, useHasRoute } from '../../utilsFunctions/routerUtils';
import { isExists } from '../../utilsFunctions/checkType';
import { SHOP_NAME } from '../../GlobalVarible/global';
import cn from 'classnames';
import logo from '../../public/img/vh_logo.png';
import { useObservable } from '../../utilsFunctions/useHook';
import { notifications$ } from '../notifications/notifications.view-model';
import Link from 'next/link';
import { DropDown } from '../ui-kit/button/dropDown/dropDown';

import css from './header.module.css';

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
    const isActiveFavorites = router == 'favorites';
    const isActiveProfile = useHasRoute('profile') && ( isActiveFavorites || isActiveBasket) 
        ? false 
        : useHasRoute('profile');

    const notifications = useObservable<Array<string>>(notifications$) ?? [];


    return (
        <header className={css.header}>
            <div className={css['search-logo-wrap']}>
                <Link href={'/'} >
                    <div className={css['logo-wrap']}>
                        <div className={css.img}>

                            <Image
                                src={logo}
                                alt="Logo"
                                width={100}
                                height={120}
                                />
                        </div>
                        <span className={css['logo-text']}>
                            {SHOP_NAME}
                        </span>
                    </div>
                </Link>
                <div className={css.dropdown}>
                    <DropDown/>
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

                <div className={css.popupBtn__wrap}>
                    <span className={css.popupBtn__wrap_line} />
                    <span className={css.popupBtn__wrap_line} />
                    <span className={css.popupBtn__wrap_line} />
                </div>
            </div>
            <div className={css['button-group']}>
                <Link href={'/profile/favorites'}>
                    <div>
                        <RadioButton isActive={isActiveFavorites}>
                            <i className="fa-regular fa-heart fa-xl"></i>
                        </RadioButton>
                    </div>
                </Link>
                <Link href={'/profile/'}>
                    <div>
                        <RadioButton isActive={isActiveProfile}>
                            <i className="fa-regular fa-user fa-xl"></i>
                        </RadioButton>
                    </div>
                </Link>
                
                <Link href={'/profile/basket/'}>
                    <div>
                        <RadioButton isActive={isActiveBasket} count={notifications.length}>
                            <i className="fa-solid fa-store fa-xl"></i>
                        </RadioButton>
                    </div>
                </Link>
            </div>
        </header>
    );
};
