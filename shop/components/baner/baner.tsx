import css from './baner.module.css'
import cn from 'classnames'
import { useDirtySetBodyScroll } from '../../utilsFunctions/useHook'

interface BanerProps {
    visible: boolean
    agree: () => void
    disagree: () => void
}

export const Baner = ({ visible, agree, disagree }: BanerProps) => {
    useDirtySetBodyScroll(visible)

    return (
        <div className={cn(css.wrap, { [css.disable]: visible })}>
            <h1>ВАМ ИСПОЛНИЛОСЬ 18?</h1>
            <div className={css.buttons_wrap}>
                <button className={css.button} onClick={agree}>
                    ДА
                </button>
                <button className={css.button} onClick={disagree}>
                    НЕТ
                </button>
            </div>
        </div>
    )
}
