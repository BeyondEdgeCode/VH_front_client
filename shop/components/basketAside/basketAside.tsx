import { FilterValues } from '../../type.store';
import { SelectBoxFilter } from '../filters/select-box/select-box';
import { Button } from '../ui-kit/button/button';
import css from './basketAside.module.css';

interface BasketAsideProps {
    total?: number;
    shops: FilterValues;
}

export const BasketAside = ({ total = 0, shops }: BasketAsideProps) => {
    return (
        <div className={css.wrap}>
            <SelectBoxFilter
                values={shops}
                id={'0'}
                label={'Магазины'}
                setState={() => {}}
            />
            <h3 className={css.total}>
                Итого: <span className={css.totalPrice}>{total} ₽</span>
            </h3>
            <Button>Оформить</Button>
        </div>
    );
};
