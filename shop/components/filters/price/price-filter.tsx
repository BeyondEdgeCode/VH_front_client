import css from './price-filter.module.css';
import cn from 'classnames';
import { newStoreData, StorData } from '../filter-collector/filter-collector';
import { useEffect, useState } from 'react';

interface PriceProps {
    id: string;
    label: string;
    setState: (data: StorData) => void;
}
export const Price = (props: PriceProps) => {
    const [left, setLeft] = useState<number>();
    const [right, setRight] = useState<number>();

    useEffect(() => {
        props.setState(newStoreData(props.id, [left ?? NaN, right ?? NaN]));
    }, [left, props, right]);

    return (
        <div className={cn(css.wrap)}>
            <span className={cn(css.label)}>{props.label}</span>
            <div className={cn(css.inputWrap)}>
                <input
                    type="number"
                    className={cn(css.input)}
                    placeholder={'От:'}
                    value={left}
                    onChange={(e) => setLeft(Number(e.currentTarget.value))}
                />
                <input
                    type="number"
                    className={cn(css.input)}
                    placeholder={'До:'}
                    onChange={(e) => setRight(Number(e.currentTarget.value))}
                />
            </div>
        </div>
    );
};
