import { SyntheticEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import css from './selectboxFilter.module.css';

type RadioBittonProps = {
    label: string,
    name: string,
    onClick: any;
}

const RadioBitton = ({label, onClick, name}: RadioBittonProps) => {
    return (
        <label className={css["rad-label"]}>
            <input 
                type="radio" 
                className={css["rad-input"]} 
                name={name} 
                value={label} 
                onClick={onClick()}
            />
            <div className={css["rad-design"]}></div>
            <div className={css["rad-text"]}>{label}</div>
        </label>
    );
}

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

export const SelectboxFilter = () => {
    const name = uuidv4();

    const handleChange = (event: SyntheticEvent) => {
        // @ts-ignore
        console.log(event.target.value);
    };
    
    return (
        <div className={css.wrap}>
            <span>Срок доставки</span>
           { MOKED_RADIO_BUTTONS.map(el => <RadioBitton label={el.label} onClick={() => handleChange} name={name}/>)}
        </div>
    );
}