import { CheckBoxFilter } from "./chekList/checkList";
import { FilterHeader } from "./filterheader/filterHeader";
import { PriceSeparation } from "./priceSeparation/priceSeparation";
import { SelectboxFilter } from "./selectboxFilter/selectboxFilter";

import css from './baseFilter.module.css';

const MOKED_CHEKBOCKS = [
    {
        label: '10ml',
        value: '10ml',
    },
    {
        label: '20ml',
        value: '20ml',
    },
    {
        label: '30ml',
        value: '30ml',
    },
    {
        label: '40ml',
        value: '40ml',
    }
];

const MOKED_RADIO_BUTTONS = [
    {
        label: 'Сегодня или завтра',
    },
    {
        label: 'До 5 дней',
    },
    {
        label: 'Любая',
    }
];


// {/* нужно добавить стор в который по итогу будет всё складываться */}
export const BaseFilter = () => {
    return (
        <aside className={css.wrap}>
            <FilterHeader />
            <PriceSeparation />
            <SelectboxFilter list={MOKED_RADIO_BUTTONS} />
            <CheckBoxFilter label={"Объем"} checkBox={MOKED_CHEKBOCKS} />
        </aside>
    );
}