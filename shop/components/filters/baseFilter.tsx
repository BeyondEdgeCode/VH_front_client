import { CheckBoxFilter } from "./chekList/checkList";
import { FilterHeader } from "./filterheader/filterHeader";
import { PriceSeparation } from "./priceSeparation/priceSeparation";
import { SelectboxFilter } from "./selectboxFilter/selectboxFilter";

export const BaseFilter = () => {
    return (
        <aside>
            <FilterHeader />
            <PriceSeparation />
            <SelectboxFilter />
            <CheckBoxFilter />
        </aside>
    );
}