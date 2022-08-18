import css from './baner.module.css';
import cn from 'classnames'; 
import { useDirtySetBodyScroll, useObservable, useSetIsNewUserCookie } from '../../utilsFunctions/useHook';
import { isNewUser$, setNewUserObserver } from '../storges/is-new-user.store';

export const Baner = () => {
    const visible = useObservable(isNewUser$) ?? false;

    useDirtySetBodyScroll(visible);

    const agree = () => {
        setNewUserObserver(true);
        useSetIsNewUserCookie({cookie: 'true'})
    }

    const disagree = () => {
        window.history.back();
    }

    return (
        <div className={cn(css.wrap, {[css.disable]: visible})}>
            <h1>ВАМ ИСПОЛНИЛОСЬ 18?</h1>
            <div className={css.buttons_wrap}>
                <button className={css.button} onClick={agree}>ДА</button>
                <button className={css.button} onClick={disagree}>НЕТ</button>
            </div>
        </div>
    )
}