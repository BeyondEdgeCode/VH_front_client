import css from './header-popup.module.css';
import cn from 'classnames';
import Link from 'next/link';


type HeaderPopupProps = {
    isOpen: boolean,
    onClose: () => void,
}

export const HeaderPopup = ({isOpen, onClose}: HeaderPopupProps) => {
    return (
        <aside className={cn(css.popup, css.popup_disable, {[css.popup_active]: isOpen, [css.popup_disable]: !isOpen})}>
            <span className={css.close} onClick={onClose}>✖</span>
            <div className={css.profilLinks}>
                <Link href={'/profile/favorites'}>
                    <span>Избранное</span>
                </Link>
                <Link href={'/profile/'}>
                    <span>Профиль</span>
                </Link>
                <Link href={'/profile/basket/'}>
                    <span>Корзина</span>
                </Link>
            </div>
        </aside>
    );
}