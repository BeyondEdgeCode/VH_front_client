import { CheckBoxFilter } from "./chekList/checkList";
import { FilterHeader } from "./filterheader/filterHeader";
import { PriceSeparation } from "./priceSeparation/priceSeparation";
import { SelectboxFilter } from "./selectboxFilter/selectboxFilter";
import { v4 as uuidv4 } from 'uuid';
import { BehaviorSubject, merge } from "rxjs";
import { createSetterStore } from "../../utilsFunctions/utils";


import css from './baseFilter.module.css';

export type Filter = {
    type: string,
    label?: string,
    value: Array<FilterState>
}

export type FilterState = {
    value: string,
    state: boolean
}

type BaseFilterProp = {
    filters: Array<Filter>
};

export type TempFilter = {
    type: string,
    label?: string,
    value: Array<{value: string}>
    store$: BehaviorSubject<{value: string}[]>
}

// {/* нужно добавить стор в который по итогу будет всё складываться */}
const mapperFilters = (el: TempFilter) => {
    switch (el.type) {
        case 'togle':
            return <FilterHeader key={uuidv4()}/>;
        case 'price':
            return(
                <div className={css.p24}>
                    <PriceSeparation key={uuidv4()}/>
                </div>)
        case 'selectbox':
            return (
                <div className={css.p24}>
                    <SelectboxFilter 
                        list={el.value} 
                        label={el.label || ''} 
                        key={uuidv4()} 
                        setter={createSetterStore(el.store$)}
                    />
                </div>);
        case 'checkbox':
            return (
                <div className={css.p24}>
                    <CheckBoxFilter 
                        label={el.label || ''} 
                        checkBox={el.value} 
                        key={uuidv4()} 
                        setter={createSetterStore(el.store$)}
                    />
                </div>);
        default:
            console.log(new Error('АЛЯРМ ПРОБЛЕМА'))
            return <></>
    }
}

const createStoreForForlter = (el: Filter) => {
    switch (el.type) {
        case 'togle':
            return {
                ...el,
                store$: new BehaviorSubject<{value: string}[]>(el.value),
            };
        case 'price':
            return {
                ...el,
                store$: new BehaviorSubject<{value: string}[]>(el.value),
            };
        case 'selectbox':
            return {
                ...el,
                store$: new BehaviorSubject<{value: string}[]>(el.value),
            };
        case 'checkbox':
            return {
                ...el,
                store$: new BehaviorSubject<{value: string}[]>(el.value),
            };
        default:
            console.log(new Error('АЛЯРМ ПРОБЛЕМА'))
            return {
                ...el,
                store$: new BehaviorSubject<{value: string}[]>(el.value),
            }
    }
}


export const BaseFilter = ({filters}: BaseFilterProp) => {

    const filtersWithStore = filters.map(createStoreForForlter);
    const stors = filtersWithStore.map(el => el.store$.asObservable());
    
    const mergedFilters = merge(...stors);
    // mergedFilters.subscribe(console.log);
   
    return (
        <aside className={css.wrap}>
            {filtersWithStore.map(mapperFilters)}
        </aside>
    );
}