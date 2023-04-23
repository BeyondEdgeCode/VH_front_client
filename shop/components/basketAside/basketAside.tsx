import { StatemanjsAPI, StatemanjsComputedAPI } from '@persevie/statemanjs';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import {
    setResponsePromo,
    setTotalAfterPromo,
    totalAfterPromo,
} from '../../pages/profile/basket/basket.view-model';
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
    activePaymentId: number;
    setActivePaymentId: (id: number) => void;
    promoOnChange: (promo: string) => void;
    applyPromo: () => void;
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
    activePaymentId,
    setActivePaymentId,
    promoOnChange,
    applyPromo,
}: BasketAsideProps) => {
    const totalVM = total ? fromProperty(total) : 0;
    const promoTotal = fromProperty(totalAfterPromo);
    const [promo, setPromo] = useState('');
    useEffect(() => {
        setPromo('');
    }, [totalVM]);

    return isAuth ? (
        <div className={css.wrap}>
            <SelectBoxFilter
                values={shops}
                id={'0'}
                label={'Способ получения'}
                setState={(s) => {
                    setActiveShopId(s.specs[0]);
                }}
                effectFunc={() => {
                    setPromo('');
                    setTotalAfterPromo(null);
                    setResponsePromo(null);
                }}
                activeId={activeId}
            />

            <SelectBoxFilter
                values={PATMENT_OPTIONS}
                id={'1'}
                label={'Способ оплаты'}
                setState={(s) => {
                    setActivePaymentId(s.specs[0]);
                }}
                effectFunc={() => {
                    setPromo('');
                    setTotalAfterPromo(null);
                    setResponsePromo(null);
                }}
                activeId={activePaymentId}
            />
            <h3 className={css.total}>
                Итого:{' '}
                <span
                    className={classNames(css.totalPrice, {
                        [css.promoApply]: promoTotal,
                    })}
                >
                    {totalVM} ₽
                </span>
                {promoTotal && (
                    <span className={css.totalPrice}>{promoTotal} ₽</span>
                )}
            </h3>
            <Button>Оформить</Button>

            <div className={css.promo_wrap}>
                <span className={css.promo_label}>Использовать промокод:</span>
                <input
                    type="text"
                    className={css.promo_input}
                    placeholder={'PROMO'}
                    value={promo}
                    onChange={(e) => {
                        setPromo(e.currentTarget.value);
                        promoOnChange(e.currentTarget.value);
                    }}
                />
                <Button
                    onClick={() => {
                        setPromo('');
                        applyPromo();
                    }}
                >
                    Применить
                </Button>
            </div>
        </div>
    ) : null;
};
