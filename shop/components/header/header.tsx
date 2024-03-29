import { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import { Search } from '../svg/search';
import {
    useCurrentPathname,
    useHasRoute,
} from '../../utilsFunctions/routerUtils';
import { isExists } from '../../utilsFunctions/checkType';
import { SHOP_NAME } from '../../GlobalVarible/global';
import cn from 'classnames';
import logo from '../../public/img/vh_logo.png';
import { useJWT, useJWT_2, useToggler } from '../../utilsFunctions/useHook';
import Link from 'next/link';
import { DropDown } from '../ui-kit/button/dropDown/dropDown';

import css from './header.module.css';
import { HeaderPopup } from './header-popup';
import { Theme } from '../../type.store';
import { logout } from '../../utilsFunctions/utils';

type RadioButtonProps = {
    children: ReactNode;
    isActive: boolean;
    count?: number;
    theme?: Theme;
    onClick?: () => void;
};

export const RadioButton = (props: RadioButtonProps) => {
    const { children, count, isActive, theme = [], onClick } = props;

    return (
        <div className={cn(...theme)} onClick={onClick}>
            <div className={cn(css.button, { [css.button_active]: isActive })}>
                {children}
            </div>
            {isExists(count) ? (
                <div className={css['button-count-wrap']}>{count}</div>
            ) : null}
        </div>
    );
};
RadioButton.defaultProps = {
    isActive: false,
};

export const Header = () => {
    const [popupState, setPopupState] = useToggler();
    const router = useCurrentPathname();
    const jwt = useJWT_2();

    const [btnGroup, toggllBtnGroup] = useToggler();

    const isActiveBasket = router === 'basket';
    const isActiveFavorites = router == 'favorites';
    const isActiveProfile =
        useHasRoute('profile') && (isActiveFavorites || isActiveBasket)
            ? false
            : // eslint-disable-next-line react-hooks/rules-of-hooks
              useHasRoute('profile');

    return (
        <>
            <HeaderPopup isOpen={popupState} onClose={setPopupState} />
            <header className={css.header}>
                <div className={css['search-logo-wrap']}>
                    <Link href={'/'}>
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
                        <DropDown />
                    </div>
                    <div className={css['input-wrap']}>
                        <input
                            type="text"
                            placeholder="Поиск"
                            className={css.input}
                        />
                        <span className={css['input-icon']}>
                            <Search />
                        </span>
                    </div>

                    <div
                        className={cn(css.popupBtn__wrap)}
                        onClick={() => setPopupState()}
                    >
                        <span
                            className={cn(css.popupBtn__wrap_line, {
                                [css.popupBtn__wrap_line_active]: popupState,
                            })}
                        />
                        <span
                            className={cn(css.popupBtn__wrap_line, {
                                [css.popupBtn__wrap_line_active]: popupState,
                            })}
                        />
                        <span
                            className={cn(css.popupBtn__wrap_line, {
                                [css.popupBtn__wrap_line_active]: popupState,
                            })}
                        />
                    </div>
                </div>
                <div
                    className={cn(css['button-group'], {
                        [css.buttonGroupActive]: btnGroup,
                    })}
                >
                    <div
                        className={(css.wrapRadio, css.controllBtn)}
                        onClick={toggllBtnGroup}
                    >
                        <RadioButton isActive={isActiveFavorites}>
                            X
                        </RadioButton>
                    </div>
                    <Link href={'/profile/favorites/'}>
                        <div
                            className={cn(css.wrapRadio, {
                                [css.linkAdaptivState]: btnGroup,
                            })}
                        >
                            <RadioButton isActive={isActiveFavorites}>
                                <i className="fa-regular fa-heart fa-xl"></i>
                            </RadioButton>
                        </div>
                    </Link>
                    <Link href={'/profile/'}>
                        <div
                            className={cn(css.wrapRadio, {
                                [css.linkAdaptivState]: btnGroup,
                            })}
                        >
                            <RadioButton isActive={isActiveProfile}>
                                <i className="fa-regular fa-user fa-xl"></i>
                            </RadioButton>
                        </div>
                    </Link>

                    <Link href={'/profile/basket/'}>
                        <div
                            className={cn(css.wrapRadio, {
                                [css.linkAdaptivState]: btnGroup,
                            })}
                        >
                            <RadioButton isActive={isActiveBasket}>
                                <i className="fa-solid fa-store fa-xl"></i>
                            </RadioButton>
                        </div>
                    </Link>

                    {jwt && (
                        <div
                            className={cn(css.wrapRadio, {
                                [css.linkAdaptivState]: btnGroup,
                            })}
                        >
                            <RadioButton
                                onClick={() => {
                                    logout();
                                    location.reload();
                                }}
                            >
                                <i className="fa-solid fa-sign-out fa-xl"></i>
                            </RadioButton>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
};
