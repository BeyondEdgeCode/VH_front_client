import { BaseFilter } from "../filters/baseFilter";
import { Button } from "../ui-kit/button/button";
import css from './basketAside.module.css';


const selectboxFilter = {
    type: 'selectbox',
    label: "Способ получения",
    value: [
      {
        value: 'Пушкинская бла бла',
        state: true,
      },
      {
        value: 'Бабушкина бла бла',
        state: false
      },
      {
        value: 'Доставка',
        state: false
      },
    ]
  } 

  const selectboxFilter1 = {
    type: 'selectbox',
    label: "Способ оплаты",
    value: [
      {
        value: 'Картой онлайн',
        state: true,
      },
      {
        value: 'Картой при получении',
        state: false
      },
      {
        value: 'Наличными',
        state: false
      },
    ]
  } 

const filters= [
    selectboxFilter,
    selectboxFilter1,
];

export const BasketAside = () => {
    const total = 5000;
    return (
        <div className={css.wrap}>
            <BaseFilter filters={filters}/>
            <h3 className={css.total}>Итого: <span className={css.totalPrice}>{total} ₽</span></h3>
            <Button>Оформить</Button>
        </ div>
    );
}