import css from './collaps-list.module.css'
import cn from 'classnames'

interface CollapsedListProps {
    isCollaps: boolean
    list: React.ReactNode
}
export const CollapsedList = ({ isCollaps, list }: CollapsedListProps) => {
    return (
        <div
            className={cn(css.colapsedListWrap, {
                [css.colapsedListWrapCollaps]: isCollaps,
            })}
        >
            <div
                className={cn(css.colapsedList, {
                    [css.colapsedListCollaps]: isCollaps,
                })}
            >
                {list}
            </div>
        </div>
    )
}
