import css from './custom-radio.module.css'
import cn from 'classnames'

interface RadioWithLabelProps {
    name: string
    label: string
    value: string
    setValueToState: (e: React.FormEvent<HTMLInputElement>) => void
}

export const RadioWithLabel = (props: RadioWithLabelProps) => {
    return (
        <label className={cn(css['custom-radio'], css.radioWrap)}>
            <input
                type="radio"
                name={props.name}
                value={props.value}
                onChange={props.setValueToState}
            />
            <span className={cn(css.labelRadio)}>{props.value}</span>
        </label>
    )
}
