import { Button } from '../ui-kit/button/button'
import css from './basketAside.module.css'

export const BasketAside = () => {
    const total = 5000
    return (
        <div className={css.wrap}>
            <h3 className={css.total}>
                Итого: <span className={css.totalPrice}>{total} ₽</span>
            </h3>
            <Button>Оформить</Button>
        </div>
    )
}
