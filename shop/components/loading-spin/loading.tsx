import css from './loading.module.css';

export const Lading = () => {
    return (
        <div className={css['lds-roller']}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};
