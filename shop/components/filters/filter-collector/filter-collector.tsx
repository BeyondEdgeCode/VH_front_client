import { Price } from '../price/price-filter';
import { Toggle } from '../toggle/toggle-filter';

import cn from 'classnames';
import css from './filter-collector.module.css';
import { SelectBoxFilter } from '../select-box/select-box';
import { ChekboxFilter } from '../chekbox-filter/chekbox-filter';
import { ProductFilter } from '../../../type.store';
import { BehaviorSubject } from 'rxjs';
import { Button } from '../../ui-kit/button/button';

export interface StorData {
    specs: Array<number>;
    id: string;
}

interface ProductFilterWithStore extends ProductFilter {
    store$: BehaviorSubject<StorData>;
    setterStore: (data: StorData) => void;
}

interface FilterCollectorProps {
    onAply: () => Promise<void>;
    filtersWithStore: ProductFilterWithStore[];
}

export const newStoreData = (id: string, specs: Array<number>): StorData => ({
    id,
    specs,
});

const filtersFromAPI = (filters: Array<ProductFilterWithStore>) => {
    return filters.map((f) => {
        switch (f.type) {
            case 'checkbox':
                return (
                    <ChekboxFilter
                        id={f.id}
                        label={f.key}
                        values={f.values}
                        setState={f.setterStore}
                        key={f.id}
                    />
                );
            // case 'selectbox':
            //     return (
            //         <SelectBoxFilter
            //             id={f.id}
            //             key={f.id}
            //             label={f.key}
            //             values={f.values}
            //             setState={f.setterStore}

            //         />
            //     );
            case 'range':
                return (
                    <Price
                        label="Цена:"
                        key={f.id}
                        setState={f.setterStore}
                        id={f.id}
                    />
                );
            case 'toggle':
                return (
                    <Toggle
                        id={f.id}
                        setState={f.setterStore}
                        from="Все товары"
                        to="В наличии"
                        key={f.id}
                    />
                );
            default:
                console.log(new Error('FUCK'));
                break;
        }
    });
};

export const FilterCollector = ({
    onAply,
    filtersWithStore,
}: FilterCollectorProps) => {
    return (
        <div className={cn(css.wrap)}>
            {filtersFromAPI(filtersWithStore)}
            <Button onClick={onAply}>Показать</Button>
        </div>
    );
};
