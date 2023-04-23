import { BehaviorSubject, merge, tap } from 'rxjs';
import { ProductFilter } from '../../../type.store';
import {
    getProductsByFiltersAplyed,
    getProductsByFiltersAplyedArguments,
} from '../../../utilsFunctions/GetFromAPI';
import { dinamicStore } from '../../../utilsFunctions/utils';
import { setNewKategoryProduct } from '../../stors/kategory-product.store';
import { StorData } from './filter-collector';

const initStoreData = (id: string): StorData => ({ id, specs: [] });

interface ProductFilterWithStore extends ProductFilter {
    store$: BehaviorSubject<StorData>;
    setterStore: (data: StorData) => void;
}

interface NewFilterCollectorVM {
    filters: Array<ProductFilter>;
    category_id: number;
    isSub: boolean;
}

export const newFilterCollectorVM = ({
    filters,
    category_id,
    isSub,
}: NewFilterCollectorVM) => {
    let avalibleFilters: Array<StorData> = [];
    let priceFilter = {
        min: NaN,
        max: NaN,
    };
    let available = 0;

    const mapFiltertoSendAPI = (filter: StorData) => {
        const isNewFilter = avalibleFilters.every(
            (f) => f.id !== filter.id && filter.specs.length !== 0
        );
        if (isNewFilter) {
            avalibleFilters.push(filter);
        } else {
            avalibleFilters = avalibleFilters.map((f) => {
                if (f.id === filter.id) {
                    return { ...filter };
                }
                return { ...f };
            });
        }
    };

    const mapToIsAvalible = (filter: StorData) => {
        available = filter.specs[0];
    };

    const mapFilterPrice = (filter: StorData) => {
        priceFilter.min = filter.specs[0];
        priceFilter.max = filter.specs[1];
    };

    const mapfiltersWithStore = (
        f: Array<ProductFilter>
    ): Array<ProductFilterWithStore> =>
        f.map((f) => ({
            ...f,
            ...dinamicStore(initStoreData(f.id)),
        }));

    const onAply = async () => {
        let data: getProductsByFiltersAplyedArguments = {
            filters: avalibleFilters.filter((f) => f.specs.length > 0),
            available,
        };

        const min = priceFilter.min;
        const max = priceFilter.max;
        if (!Number.isNaN(min)) {
            data = { ...data, min };
        }

        if (!Number.isNaN(max)) {
            data = { ...data, max };
        }

        if (!isSub) {
            const products = await getProductsByFiltersAplyed({
                ...data,
                category_id,
            });

            setNewKategoryProduct(products);
        } else {
            const products = await getProductsByFiltersAplyed(
                {
                    ...data,
                    subcategory_id: category_id,
                },
                !isSub
            );
            setNewKategoryProduct(products);
        }
    };

    const filtersWithStore = mapfiltersWithStore(filters);

    const rangeTogleStor = filtersWithStore
        .filter((f) => f.type == 'range' || f.type == 'toggle')
        .map((el) => ({
            type: el.type,
            store: el.store$.asObservable(),
        }));

    const stors = filtersWithStore
        .filter((f) => f.type !== 'range' && f.type !== 'toggle')
        .map((el) => el.store$.asObservable());

    const priceFilterEffect$ = rangeTogleStor
        .filter((f) => f.type === 'range')[0]
        .store.pipe(tap(mapFilterPrice))
        .subscribe();

    const togglFilterEffect$ = rangeTogleStor
        .filter((f) => f.type === 'toggle')[0]
        .store.pipe(tap(mapToIsAvalible))
        .subscribe(console.log);

    const mergedFilters = merge(...stors);
    const t$ = mergedFilters.pipe(tap(mapFiltertoSendAPI)).subscribe();

    return {
        onAply,
        filtersWithStore,
        mapFiltertoSendAPI,
        effects: [t$, priceFilterEffect$, togglFilterEffect$],
    };
};
