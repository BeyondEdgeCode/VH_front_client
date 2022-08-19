import { CheckBoxFilter } from "./chekList/checkList";
import { FilterHeader } from "./filterheader/filterHeader";
import { PriceSeparation } from "./priceSeparation/priceSeparation";
import { SelectboxFilter } from "./selectboxFilter/selectboxFilter";
import { v4 as uuidv4 } from 'uuid';
import { BehaviorSubject, merge } from "rxjs";
import { createSetterStore } from "../../utilsFunctions/utils";


import css from './baseFilter.module.css';
import { Filter, FilterState, TempFilter } from "../../type.store";

type BaseFilterProp = {
    filters: Array<Filter>
};

// маппер который преобразует фильтр из массива в разметку
const mapperFilters = (el: TempFilter) => {
    switch (el.type) {
        case 'togle':
            el.store$.subscribe(console.log)
            return <FilterHeader 
                key={uuidv4()} 
                list={el.value} 
                setter={createSetterStore(el.store$)}
                />;
        case 'price':
            return(
                <div className={css.p24}>
                    <PriceSeparation 
                        key={uuidv4()}
                        setter={createSetterStore(el.store$)}
                    />
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

// маппер который добавляет локальное хранилище к фильтрам
const createStoreForForlter = (el: Filter) => {
    switch (el.type) {
        case 'togle':
            return {
                ...el,
                store$: new BehaviorSubject<Array<FilterState>>(el.value),
            };
        case 'price':
            return {
                ...el,
                store$: new BehaviorSubject<Array<FilterState>>(el.value),
            };
        case 'selectbox':
            return {
                ...el,
                store$: new BehaviorSubject<Array<FilterState>>(el.value),
            };
        case 'checkbox':
            return {
                ...el,
                store$: new BehaviorSubject<Array<FilterState>>(el.value),
            };
        default:
            console.log(new Error('АЛЯРМ ПРОБЛЕМА'))
            return {
                ...el,
                store$: new BehaviorSubject<Array<FilterState>>(el.value),
            }
    }
}


export const BaseFilter = ({filters}: BaseFilterProp) => {

    const filtersWithStore = filters.map(createStoreForForlter);
    const stors = filtersWithStore.map(el => el.store$.asObservable());
    
    const mergedFilters = merge(...stors);
   
    return (
        <aside className={css.wrap}>
            {filtersWithStore.map(mapperFilters)}
        </aside>
    );
}