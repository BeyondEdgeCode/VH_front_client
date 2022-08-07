import { ChangeEvent, useEffect, useState } from 'react';
import { FilterState } from '../baseFilter';
import css from './priceSeparation.module.css';

type PriceSeparationProp = {
    setter: (newValue: Array<FilterState>) => void
}

export const PriceSeparation = ({setter}: PriceSeparationProp) => {
    const [localeState, setLocaleState] = useState([{value: 'От', state: 0}, {value: 'До', state: 0}]);

    const hendlerFrom = (e: ChangeEvent<HTMLInputElement>) => {
        setLocaleState(s => {
            return s.map(el => {
                if(el.value === 'От') {
                    return {...el, state: parseInt(e.target.value)}
                }
                else {
                    return {...el}
                }
            })
        })
    }

    const hendlerTo = (e: ChangeEvent<HTMLInputElement>) => {
        setLocaleState(s => {
            return s.map(el => {
                if(el.value === 'До') {
                    return {...el, state: parseInt(e.target.value)}
                }
                else {
                    return {...el}
                }
            })
        })
    }
    useEffect(() => {
        setter(localeState)
    })

    return (
        <div className={css.wrap}>
            <span className={css.label}>
                Цена:
            </span>
            <div className={css.input__wrap}>
                <input placeholder='От:' className={css.input} type='number' onChange={hendlerFrom}/>         
                <input placeholder='До:' className={css.input} type='number' onChange={hendlerTo}/>         
            </div>
        </div>
    );
}