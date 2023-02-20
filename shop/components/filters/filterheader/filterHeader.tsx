import { useEffect, useState } from 'react'
import css from './filterHeader.module.css'

import cn from 'classnames'
import { FilterState } from '../../../type.store'

type Togle = {
    onClick: () => void
    active: boolean
}
type FilterHeaderProps = {
    list: Array<FilterState>
    setter: (newValue: Array<FilterState>) => void
}
const Togler = ({ onClick, active }: Togle) => {
    return (
        <div className={css.togle} onClick={onClick}>
            <div className={cn(css.aria, { [css.aria_active]: active })}></div>
        </div>
    )
}

export const FilterHeader = ({ list, setter }: FilterHeaderProps) => {
    const [togle, setTogle] = useState<boolean>(false)
    const togleClick = () => {
        setTogle((t) => !t)
    }
    useEffect(() => {
        const newStateStore = list.map((el, i) => {
            if (i === 0) {
                return { ...el, state: !togle }
            } else {
                return { ...el, state: togle }
            }
        })
        setter(newStateStore)
    }, [togle])
    return (
        <div className={css.wrap}>
            <span className={cn({ [css.label_isActive]: togle })}>
                {list[0].value}
            </span>
            <Togler onClick={() => togleClick()} active={togle} />
            <span className={cn({ [css.label_isActive]: !togle })}>
                {list[1].value}
            </span>
        </div>
    )
}
