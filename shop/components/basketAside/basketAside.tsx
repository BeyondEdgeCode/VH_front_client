import { StatemanjsAPI, StatemanjsComputedAPI } from '@persevie/statemanjs';
import { FilterValues } from '../../type.store';
import { fromProperty } from '../../utilsFunctions/useHook';
import { SelectBoxFilter } from '../filters/select-box/select-box';
import { Button } from '../ui-kit/button/button';
import css from './basketAside.module.css';

interface BasketAsideProps {
    // total?: number;
    // total: StatemanjsAPI<number>;
    total: StatemanjsComputedAPI<number>;
    shops: FilterValues;
    isAuth?: boolean;
    setActiveShopId: (id: number) => void;
    // activeId: StatemanjsAPI<number>;
    activeId: number;
}

export const BasketAside = ({
    total,
    shops,
    isAuth = false,
    setActiveShopId,
    activeId,
}: BasketAsideProps) => {
    const totalVM = total ? fromProperty(total) : 0;
    // const id = fromProperty(activeId);

    return isAuth ? (
        <div className={css.wrap}>
            <SelectBoxFilter
                values={shops}
                id={'0'}
                label={'Способ получения'}
                setState={(s) => {
                    setActiveShopId(s.specs[0]);
                }}
                activeId={activeId}
            />
            <h3 className={css.total}>
                Итого: <span className={css.totalPrice}>{totalVM} ₽</span>
            </h3>
            <Button>Оформить</Button>
        </div>
    ) : null;
};
