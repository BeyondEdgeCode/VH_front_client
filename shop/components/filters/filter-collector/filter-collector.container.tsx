import { createElement, useEffect } from 'react';
import { ProductFilter } from '../../../type.store';
import { FilterCollector } from './filter-collector';
import { newFilterCollectorVM } from './filter-collector.view-model';

interface FilterCollectorContainerProps {
    filters: Array<ProductFilter>;
    category_id: number;
    isSub?: boolean;
}
export const FilterCollectorContainer = ({
    filters,
    category_id,
    isSub = false,
}: FilterCollectorContainerProps) => {
    const vm = newFilterCollectorVM({ filters, category_id, isSub });
    useEffect(
        () => () => {
            // return vm.effects.forEach((e) => e.unsubscribe());
            return vm.effects.forEach((e) => e.unsubscribe());
        },
        [vm]
    );

    return createElement(FilterCollector, {
        onAply: vm.onAply,
        filtersWithStore: vm.filtersWithStore,
    });
};
