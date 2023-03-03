import css from './custom-checkbox.module.css'
import cn from 'classnames'

interface ChekboxWithLabelProps {
    name: string
    label: string
    value: string
    setValueToState: (e: React.FormEvent<HTMLInputElement>) => void
}

export const ChekboxWithLabel = (props: ChekboxWithLabelProps) => {
    return (
        <label className={cn(css['custom-checkbox'], css.ChekboxWrap)}>
            <input
                type="checkbox"
                name={props.name}
                value={props.value}
                onChange={props.setValueToState}
            />
            <span className={cn(css.labelChekbox)}>{props.value}</span>
        </label>
    )
}
