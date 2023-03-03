import css from './chekbox-filter.module.css'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { useToggler } from '../../../utilsFunctions/useHook'
import { ArrayFromObj, getPropByValue } from '../../../utilsFunctions/utils'
import { SmallArrow } from '../../svg/smallArrow'
import { CollapsedList } from '../../ui-kit/collaps-list/collaps-list'
import { FilterValues } from '../../../type.store'
import { ChekboxWithLabel } from '../../ui-kit/custom-checkbox/custom-checkbox'
import { newStoreData, StorData } from '../filter-collector/filter-collector'

interface ChekboxBoxFolterProps {
    id: string
    label: string // key
    values: FilterValues
    setState: (data: StorData) => void
}

const mapToChekbox = (
    values: FilterValues,
    name: string,
    setState: (s: Array<string>) => void,
    state: Array<string>
) => {
    const data = ArrayFromObj(values)
    const onChenge = (e: React.FormEvent<HTMLInputElement>) => {
        if (!state.find((s) => s === e.currentTarget.value)) {
            setState([...state, e.currentTarget.value])
        } else {
            setState([...state.filter((s) => s !== e.currentTarget.value)])
        }
    }

    return data[0].map((el, i) => {
        return (
            <ChekboxWithLabel
                name={name}
                label={el}
                value={data[1][i]}
                key={`${i}-${name}-${data[1][i]}`}
                setValueToState={onChenge}
            />
        )
    })
}

export const ChekboxFilter = (props: ChekboxBoxFolterProps) => {
    const [filterState, setFilterState] = useState<string[]>([])
    const [isCollaps, setIsCollaps] = useToggler()

    useEffect(() => {
        props.setState(
            newStoreData(
                props.id,
                filterState.map(getPropByValue(props.values)).map(Number)
            )
        )
    }, [filterState, props])

    return (
        <div className={cn(css.wrap)}>
            <span className={cn(css.label)} onClick={setIsCollaps}>
                {props.label}
                <div
                    className={cn(css.arrow, { [css.arrowCollaps]: isCollaps })}
                >
                    <SmallArrow />
                </div>
            </span>
            <CollapsedList
                isCollaps={isCollaps}
                list={mapToChekbox(
                    props.values,
                    props.label,
                    setFilterState,
                    filterState
                )}
            />
        </div>
    )
}
