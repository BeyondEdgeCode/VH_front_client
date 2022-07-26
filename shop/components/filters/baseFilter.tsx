import { CheckBoxFilter } from "./chekList/checkList";
import { FilterHeader } from "./filterheader/filterHeader";
import { PriceSeparation } from "./priceSeparation/priceSeparation";
import { SelectboxFilter } from "./selectboxFilter/selectboxFilter";

import css from './baseFilter.module.css';

type Filter = {
    type: string,
    label?: string,
    value: Array<{value: string}>
}

type BaseFilterProp = {
    filters: Array<Filter>
  };

// {/* нужно добавить стор в который по итогу будет всё складываться */}
const mapperFilters = (el: Filter) => {
    switch (el.type) {
        case 'togle':
            return <FilterHeader />;
        case 'price':
            return(
                <div className={css.p24}>
                    <PriceSeparation />
                </div>)
        case 'selectbox':
            return (
                <div className={css.p24}>
                    <SelectboxFilter list={el.value} label={el.label || ''} />
                </div>);
        case 'checkbox':
            return (
                <div className={css.p24}>
                    <CheckBoxFilter label={el.label || ''} checkBox={el.value} />
                </div>);
        default:
            console.log(new Error('АЛЯРМ ПРОБЛЕМА'))
            break;
    }
}


export const BaseFilter = ({filters}: BaseFilterProp) => {
    return (
        <aside className={css.wrap}>
            {filters.map(mapperFilters)}
        </aside>
    );
}