import cn from 'classnames';
import { useEffect } from 'react';
import { useToggler } from '../../../utilsFunctions/useHook';
import { newStoreData, StorData } from '../filter-collector/filter-collector';
import css from './toggle-filter.module.css';

interface TogleProps {
    from: string;
    to: string;
    setState: (data: StorData) => void;
    id: string;
}

export const Toggle = (props: TogleProps) => {
    const [stateToggl, setStateToggl, setStateTogglParams] = useToggler();
    useEffect(() => {
        props.setState(newStoreData(props.id, [Number(stateToggl)]));
    }, [stateToggl, props]);
    return (
        <div className={cn(css.wrap)}>
            <span
                className={cn(css.label, {
                    [css.label_disable]: stateToggl,
                })}
                onClick={() => setStateTogglParams(false)}
            >
                {props.from}
            </span>
            <div className={cn(css.toggleBody)} onClick={setStateToggl}>
                <div
                    className={cn(css.toggleBoll, {
                        [css.toggleBoll_state]: stateToggl,
                    })}
                ></div>
            </div>
            <span
                className={cn(css.label, {
                    [css.label_disable]: !stateToggl,
                })}
                onClick={() => setStateTogglParams(true)}
            >
                {props.to}
            </span>
        </div>
    );
};
