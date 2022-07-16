import css from './priceSeparation.module.css';

export const PriceSeparation = () => {
    return (
        <div className={css.wrap}>
            <span className={css.label}>
                Цена:
            </span>
            <div className={css.input__wrap}>
                <input placeholder='От:' className={css.input} type='number'/>         
                <input placeholder='До:' className={css.input} type='number'/>         
            </div>
        </div>
    );
}