import { StatemanjsAPI, StatemanjsComputedAPI } from '@persevie/statemanjs';
import { FilterValues } from '../../type.store';
import { fromProperty } from '../../utilsFunctions/useHook';
import { SelectBoxFilter } from '../filters/select-box/select-box';
import { Button } from '../ui-kit/button/button';
import css from './basketAside.module.css';

interface BasketAsideProps {
    total: StatemanjsComputedAPI<number>;
    shops: FilterValues;
    isAuth?: boolean;
    setActiveShopId: (id: number) => void;
    activeId: number;
}

const PATMENT_OPTIONS: FilterValues = {
    '0': 'Картой онлайн',
    '1': 'Картой при получении',
    '2': 'Наличными',
};

export const BasketAside = ({
    total,
    shops,
    isAuth = false,
    setActiveShopId,
    activeId,
}: BasketAsideProps) => {
    const totalVM = total ? fromProperty(total) : 0;

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

            <SelectBoxFilter
                values={PATMENT_OPTIONS}
                id={'1'}
                label={'Способ оплаты'}
                setState={(s) => {}}
                activeId={0}
            />
            <h3 className={css.total}>
                Итого: <span className={css.totalPrice}>{totalVM} ₽</span>
            </h3>
            <Button>Оформить</Button>
        </div>
    ) : null;
};
