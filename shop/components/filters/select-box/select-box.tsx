import css from './select-box.module.css';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useToggler } from '../../../utilsFunctions/useHook';
import { ArrayFromObj, getPropByValue } from '../../../utilsFunctions/utils';
import { SmallArrow } from '../../svg/smallArrow';
import { CollapsedList } from '../../ui-kit/collaps-list/collaps-list';
import { FilterValues } from '../../../type.store';
import { RadioWithLabel } from '../../ui-kit/custom-radio/custom-radio';
import { newStoreData, StorData } from '../filter-collector/filter-collector';

interface SelectBoxFolterProps {
    id: string;
    label: string; // key
    values: FilterValues;
    setState: (data: StorData) => void;
}

const mapToRadio = (
    values: FilterValues,
    name: string,
    setState: (s: string) => void
) => {
    const data = ArrayFromObj(values);

    return data[0].map((el, i) => {
        return (
            <RadioWithLabel
                name={name}
                label={el}
                value={data[1][i]}
                key={`${i}-${name}-${data[1][i]}`}
                setValueToState={() => setState(el)}
            />
        );
    });
};

export const SelectBoxFilter = (props: SelectBoxFolterProps) => {
    const [filterState, setFilterState] = useState<string>();
    const [isCollaps, setIsCollaps] = useToggler();

    useEffect(() => {
        filterState &&
            props.setState(newStoreData(props.id, [Number(filterState)]));
    }, [filterState, props]);
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
                list={mapToRadio(props.values, props.label, setFilterState)}
            />
        </div>
    );
};
